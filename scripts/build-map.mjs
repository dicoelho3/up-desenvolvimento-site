/**
 * Gera o mapa dos bairros (public/brand/map/bairros.webp) + src/data/map.json.
 *
 *   node scripts/build-map.mjs
 *
 * Correr de novo SÓ quando se acrescenta um bairro fora da zona atual do mapa
 * (os marcadores são posicionados automaticamente a partir das coordenadas em
 * src/data/neighborhoods.json; o mapa só tem de cobrir a zona).
 *
 * Como funciona: o mapa é DESENHADO por nós a partir dos dados abertos do OpenStreetMap
 * (licença ODbL — basta a atribuição, que aparece no mapa), e pintado com as cores da marca:
 *   - estradas, ferrovia e rios: do recorte da região de Lisboa do BBBike (ficheiro único,
 *     ~90 MB, descarregado uma vez — rápido e fiável);
 *   - linha de costa (o Tejo), lagos, jardins e matas: do serviço Overpass (pedidos pequenos).
 * Tudo fica guardado em node_modules/.cache/map-osm. Ficam de fora nomes, ruelas e as rotas
 * dos barcos. Os nomes de referência (Lisboa, Tejo, aeroporto…) são desenhados pelo site por
 * cima (src/data/map-landmarks.json). Os visitantes não fazem pedidos a serviços de mapas.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(SITE, 'node_modules/.cache/map-osm');
const ZOOM = 13; // escala (nível de zoom "web"): 1 píxel ≈ 15 m
const TILE = 256;
const PAD = { lat: 0.025, lng: 0.075 }; // margem à volta dos bairros, em graus (mais larga do que alta: mapa "deitado")
const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

// Cores da marca
const C = {
  land: '#fffaf0', // branco-suave (terra)
  green: '#c4e0a8', // jardins, matas, Monsanto
  water: '#64afe3', // --azul-ceu (rio, mar, lagos)
  road: '#efd9b3', // areia (estradas)
  roadMain: '#e9c98f', // areia mais forte (autoestradas e vias rápidas)
  rail: '#b9b2a6', // ferrovia, discreta
};

// — Zona do mapa —
const hoods = JSON.parse(fs.readFileSync(path.join(SITE, 'src/data/neighborhoods.json'), 'utf8')).items;
const lats = hoods.map((h) => h.coords.lat);
const lngs = hoods.map((h) => h.coords.lng);
const bounds = {
  north: Math.max(...lats) + PAD.lat,
  south: Math.min(...lats) - PAD.lat,
  west: Math.min(...lngs) - PAD.lng,
  east: Math.max(...lngs) + PAD.lng,
};

// Projeção Web Mercator → píxeis da imagem
const n = 2 ** ZOOM * TILE;
const px = (lng) => ((lng + 180) / 360) * n;
const py = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
};
const x0 = Math.floor(px(bounds.west));
const y0 = Math.floor(py(bounds.north));
const W = Math.ceil(px(bounds.east)) - x0;
const H = Math.ceil(py(bounds.south)) - y0;
const pt = (p) => `${(px(p.lon) - x0).toFixed(1)},${(py(p.lat) - y0).toFixed(1)}`;

// — Dados (guardados em cache para não repetir o pedido) —
fs.mkdirSync(CACHE, { recursive: true });
const bbox = [bounds.south - 0.01, bounds.west - 0.01, bounds.north + 0.01, bounds.east + 0.01].map((v) => v.toFixed(4)).join(',');
// Pedidos pequenos e separados (os servidores públicos recusam pedidos grandes);
// cada parte fica em cache assim que chega, por isso basta voltar a correr se alguma falhar.
const parts = {
  coast: `way["natural"="coastline"](${bbox});`,
  water: `way["natural"="water"](${bbox}); relation["natural"="water"](${bbox});`,
  parks: `way["leisure"="park"](${bbox}); relation["leisure"="park"](${bbox});`,
  landuse: `way["landuse"~"^(forest|grass|recreation_ground|meadow|village_green)$"](${bbox}); relation["landuse"="forest"](${bbox}); way["natural"~"^(wood|scrub)$"](${bbox}); relation["natural"="wood"](${bbox});`,
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function overpass(name, body) {
  const file = path.join(CACHE, `${name}-${bbox.replace(/[^\d.-]/g, '_')}.json`);
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')).elements;
  const q = `[out:json][timeout:120];(${body});out geom;`;
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const url of OVERPASS) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'User-Agent': 'static-map-builder/1.0', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(q),
        signal: AbortSignal.timeout(150_000),
      }).catch(() => null);
      if (res?.ok) {
        const json = await res.json();
        fs.writeFileSync(file, JSON.stringify(json));
        console.log(`  ✓ ${name} (${json.elements.length})`);
        return json.elements;
      }
      console.warn(`  ${name}: ${url} → ${res?.status ?? 'sem resposta'}`);
    }
    await sleep(15_000 * (attempt + 1));
  }
  throw new Error(`Não foi possível obter "${name}". Volta a correr o script daqui a uns minutos (o que já veio fica guardado).`);
}
const data = { elements: [] };
for (const [name, body] of Object.entries(parts)) data.elements.push(...(await overpass(name, body)));

// — Estradas, ferrovia e rios: recorte de Lisboa do BBBike, em formato shapefile —
const BBBIKE = 'https://download.bbbike.org/osm/bbbike/Lisbon/Lisbon.osm.shp.zip';
const shpDir = path.join(CACHE, 'bbbike');
const shpFolder = path.join(shpDir, 'Lisbon-shp/shape');
if (!fs.existsSync(path.join(shpFolder, 'roads.shp'))) {
  fs.mkdirSync(shpDir, { recursive: true });
  const zip = path.join(shpDir, 'Lisbon.osm.shp.zip');
  if (!fs.existsSync(zip)) {
    console.log('  a descarregar o recorte de Lisboa (~90 MB)…');
    const res = await fetch(BBBIKE, { headers: { 'User-Agent': 'static-map-builder/1.0' } });
    if (!res.ok) throw new Error(`BBBike: HTTP ${res.status}`);
    fs.writeFileSync(zip, Buffer.from(await res.arrayBuffer()));
  }
  const files = ['roads', 'railways', 'waterways'].flatMap((n) => ['shp', 'dbf'].map((e) => `Lisbon-shp/shape/${n}.${e}`));
  try {
    execFileSync('unzip', ['-o', '-q', zip, ...files], { cwd: shpDir });
  } catch {
    execFileSync('tar', ['-xf', zip, ...files], { cwd: shpDir }); // Windows 10+ traz o tar, que abre .zip
  }
}

/** Lê um shapefile de linhas (.shp + .dbf) e devolve só os elementos dentro da zona do mapa. */
function readLines(name, keep) {
  const shp = fs.readFileSync(path.join(shpFolder, `${name}.shp`));
  const dbf = fs.readFileSync(path.join(shpFolder, `${name}.dbf`));
  // campos da tabela (.dbf)
  const headerLen = dbf.readUInt16LE(8);
  const recLen = dbf.readUInt16LE(10);
  const fields = [];
  for (let o = 32, off = 1; o < headerLen - 1; o += 32) {
    const len = dbf[o + 16];
    fields.push({ name: dbf.toString('latin1', o, o + 11).replace(/\0.*$/, ''), off, len });
    off += len;
  }
  const typeField = fields.find((fl) => fl.name === 'type');
  const [s0, w0, n0, e0] = bbox.split(',').map(Number);
  const out = [];
  let pos = 100;
  let rec = 0;
  while (pos < shp.length) {
    const contentLen = shp.readInt32BE(pos + 4) * 2;
    const start = pos + 8;
    const shapeType = shp.readInt32LE(start);
    const r = headerLen + rec * recLen;
    const type = dbf.toString('utf8', r + typeField.off, r + typeField.off + typeField.len).trim();
    if (shapeType === 3 && keep(type)) {
      const [xmin, ymin, xmax, ymax] = [0, 1, 2, 3].map((k) => shp.readDoubleLE(start + 4 + k * 8));
      if (xmax >= w0 && xmin <= e0 && ymax >= s0 && ymin <= n0) {
        const nParts = shp.readInt32LE(start + 36);
        const nPts = shp.readInt32LE(start + 40);
        const partIdx = [];
        for (let k = 0; k < nParts; k++) partIdx.push(shp.readInt32LE(start + 44 + k * 4));
        const ptsAt = start + 44 + nParts * 4;
        partIdx.push(nPts);
        for (let k = 0; k < nParts; k++) {
          // o recorte tem algumas linhas com pontos seguidos a quilómetros de distância (vias
          // cortadas na fronteira do recorte): parte-se a linha nesses saltos
          let geometry = [];
          for (let j = partIdx[k]; j < partIdx[k + 1]; j++) {
            const p = { lon: shp.readDoubleLE(ptsAt + j * 16), lat: shp.readDoubleLE(ptsAt + j * 16 + 8) };
            const prev = geometry.at(-1);
            if (prev && (Math.abs(prev.lon - p.lon) > 0.03 || Math.abs(prev.lat - p.lat) > 0.03)) {
              if (geometry.length > 1) out.push({ type, geometry });
              geometry = [];
            }
            geometry.push(p);
          }
          if (geometry.length > 1) out.push({ type, geometry });
        }
      }
    }
    pos = start + contentLen;
    rec++;
  }
  return out;
}
const roadTypes = /^(motorway|trunk|primary|secondary)$/;
for (const r of readLines('roads', (t) => roadTypes.test(t))) data.elements.push({ tags: { highway: r.type }, geometry: r.geometry });
for (const r of readLines('railways', (t) => t === 'rail')) data.elements.push({ tags: { railway: 'rail' }, geometry: r.geometry });
for (const r of readLines('waterways', (t) => t === 'river')) data.elements.push({ tags: { waterway: 'river' }, geometry: r.geometry });

// — Geometria —
const tagged = (e, k, re) => e.tags && re.test(e.tags[k] ?? '');
const samePt = (a, b) => a && b && Math.abs(a.lat - b.lat) < 1e-7 && Math.abs(a.lon - b.lon) < 1e-7;
/** Junta pedaços de linha cujas pontas coincidem (os polígonos das "relações" vêm aos bocados). */
function joinRings(parts) {
  const rings = [];
  const pool = parts.map((p) => [...p]);
  while (pool.length) {
    let ring = pool.shift();
    let grew = true;
    while (grew && !samePt(ring[0], ring.at(-1))) {
      grew = false;
      for (let i = 0; i < pool.length; i++) {
        const p = pool[i];
        if (samePt(ring.at(-1), p[0])) ring = ring.concat(p.slice(1));
        else if (samePt(ring.at(-1), p.at(-1))) ring = ring.concat(p.slice(0, -1).reverse());
        else if (samePt(ring[0], p.at(-1))) ring = p.concat(ring.slice(1));
        else if (samePt(ring[0], p[0])) ring = p.slice(1).reverse().concat(ring);
        else continue;
        pool.splice(i, 1);
        grew = true;
        break;
      }
    }
    rings.push(ring);
  }
  return rings;
}
const polyPath = (rings) => rings.map((r) => 'M' + r.map(pt).join('L') + 'Z').join('');
const linePath = (g) => 'M' + g.map(pt).join('L');
/** Caminho SVG de uma área (way fechado ou relação multipolígono). */
function areaPath(e) {
  if (e.type === 'way' && e.geometry) return polyPath([e.geometry]);
  if (e.type === 'relation' && e.members) {
    const parts = e.members.filter((m) => m.type === 'way' && m.geometry).map((m) => m.geometry);
    return polyPath(joinRings(parts));
  }
  return '';
}

const els = data.elements;
const greens = els.filter(
  (e) =>
    tagged(e, 'leisure', /^park$/) ||
    tagged(e, 'landuse', /^(forest|grass|recreation_ground|meadow|village_green)$/) ||
    tagged(e, 'natural', /^(wood|scrub)$/),
);
const lakes = els.filter((e) => tagged(e, 'natural', /^water$/));
const coast = els.filter((e) => tagged(e, 'natural', /^coastline$/) && e.geometry);
const rivers = els.filter((e) => tagged(e, 'waterway', /^river$/) && e.geometry);
const rails = els.filter((e) => tagged(e, 'railway', /^rail$/) && e.geometry);
const roads = els.filter((e) => tagged(e, 'highway', /./) && e.geometry);
const roadWidth = { motorway: 3.2, trunk: 3, primary: 2.2, secondary: 1.4 };

const svg = (body) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`);

// 1) Mar e rio: a linha de costa separa terra e água; pinta-se a água por "balde de tinta"
//    a partir de pontos que sabemos estar no Tejo.
const coastRaw = await sharp(
  svg(`<rect width="100%" height="100%" fill="#fff"/><path d="${coast.map((e) => linePath(e.geometry)).join('')}" fill="none" stroke="#000" stroke-width="2.5"/>`),
)
  .greyscale()
  .raw()
  .toBuffer();
const sea = new Uint8Array(W * H);
const seeds = [
  [38.705, -9.1],
  [38.69, -9.2],
  [38.75, -9.07],
].map(([lat, lon]) => [Math.round(px(lon) - x0), Math.round(py(lat) - y0)]);
for (const [sx, sy] of seeds) {
  if (sx < 0 || sy < 0 || sx >= W || sy >= H || coastRaw[sy * W + sx] < 128 || sea[sy * W + sx]) continue;
  const stack = [sy * W + sx];
  while (stack.length) {
    const i = stack.pop();
    if (sea[i] || coastRaw[i] < 128) continue;
    sea[i] = 1;
    const x = i % W;
    if (x > 0) stack.push(i - 1);
    if (x < W - 1) stack.push(i + 1);
    if (i >= W) stack.push(i - W);
    if (i < W * (H - 1)) stack.push(i + W);
  }
}
// a própria linha de costa passa a água quando encosta a água (sem contorno escuro)
for (let i = W; i < W * (H - 1); i++) {
  if (coastRaw[i] < 128 && (sea[i - 1] === 1 || sea[i + 1] === 1 || sea[i - W] === 1 || sea[i + W] === 1)) sea[i] = 2;
}
const seaRGBA = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) if (sea[i]) seaRGBA.set([0x64, 0xaf, 0xe3, 255], i * 4);
const seaPng = await sharp(seaRGBA, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();

// 2) Terra, verdes, lagos e rios (por baixo do mar)
const base = svg(`
  <rect width="100%" height="100%" fill="${C.land}"/>
  <path d="${greens.map(areaPath).join('')}" fill="${C.green}" fill-rule="evenodd"/>
  <path d="${lakes.map(areaPath).join('')}" fill="${C.water}" fill-rule="evenodd"/>
  <path d="${rivers.map((e) => linePath(e.geometry)).join('')}" fill="none" stroke="${C.water}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`);

// 3) Ferrovia e estradas por cima de tudo (as pontes atravessam o rio)
const roadLayer = (types, color) =>
  types
    .map(
      (t) =>
        `<path d="${roads
          .filter((e) => e.tags.highway === t)
          .map((e) => linePath(e.geometry))
          .join('')}" fill="none" stroke="${color}" stroke-width="${roadWidth[t]}" stroke-linecap="round" stroke-linejoin="round"/>`,
    )
    .join('');
const top = svg(`
  <path d="${rails.map((e) => linePath(e.geometry)).join('')}" fill="none" stroke="${C.rail}" stroke-width="1" stroke-dasharray="4 3"/>
  ${roadLayer(['secondary', 'primary'], C.road)}
  ${roadLayer(['trunk', 'motorway'], C.roadMain)}
`);

const outDir = path.join(SITE, 'public/brand/map');
fs.mkdirSync(outDir, { recursive: true });
await sharp(await sharp(base).png().toBuffer())
  .composite([{ input: seaPng }, { input: await sharp(top).png().toBuffer() }])
  .webp({ quality: 82 })
  .toFile(path.join(outDir, 'bairros.webp'));

fs.writeFileSync(
  path.join(SITE, 'src/data/map.json'),
  JSON.stringify({ image: '/brand/map/bairros.webp', zoom: ZOOM, width: W, height: H, x0, y0 }, null, 2) + '\n',
);
console.log(`Mapa ${W}×${H}px · ${coast.length} troços de costa, ${greens.length} verdes, ${roads.length} estradas`);
