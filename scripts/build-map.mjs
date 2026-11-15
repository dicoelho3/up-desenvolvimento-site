/**
 * Gera o mapa dos bairros (public/brand/map/bairros.webp) + src/data/map.json.
 *
 *   node scripts/build-map.mjs
 *
 * Correr de novo SÓ quando se acrescenta um bairro fora da zona atual do mapa
 * (os marcadores são posicionados automaticamente a partir das coordenadas em
 * src/data/neighborhoods.json; o mapa só tem de cobrir a zona).
 *
 * Como funciona: descarrega uma vez os "azulejos" de um mapa base SEM nomes (Esri Light Gray
 * Base, feito a partir de dados OpenStreetMap) que cobrem os bairros (com margem), junta-os
 * numa só imagem e pinta-a com as cores da marca: terra cor de papel, estradas claras,
 * rio Tejo azul-céu. Os nomes de referência (Lisboa, Tejo, aeroporto…) são desenhados pelo
 * site por cima, maiores e legíveis (src/data/map-landmarks.json).
 * O site serve a imagem final — os visitantes não fazem pedidos a serviços de mapas.
 * Atribuição (aparece no mapa): Esri · © contribuidores do OpenStreetMap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(SITE, 'node_modules/.cache/map-tiles-esri');
const TILE_URL = (z, x, y) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/${z}/${y}/${x}`;
const ZOOM = 13;
const TILE = 256;
const PAD = { lat: 0.035, lng: 0.05 }; // margem à volta dos bairros, em graus

// Cores da marca para o mapa
const LAND = [236, 229, 216]; // papel, um pouco mais escuro que o fundo do site
const ROAD = [255, 251, 243]; // --branco-suave
const PARK = [226, 221, 200]; // papel esverdeado (jardins, Monsanto)
const LINE = [29, 52, 103]; // --azul-primario (linhas escuras: ferrovia, limites)
const SKY = [176, 212, 238]; // --azul-ceu clareado (rio e mar)
const WATER = [208, 207, 212]; // cor da água no mapa base

const hoods = JSON.parse(fs.readFileSync(path.join(SITE, 'src/data/neighborhoods.json'), 'utf8')).items;
const lats = hoods.map((h) => h.coords.lat);
const lngs = hoods.map((h) => h.coords.lng);
const bounds = {
  north: Math.max(...lats) + PAD.lat,
  south: Math.min(...lats) - PAD.lat,
  west: Math.min(...lngs) - PAD.lng,
  east: Math.max(...lngs) + PAD.lng,
};

// Projeção Web Mercator → píxeis absolutos no nível de zoom
const n = 2 ** ZOOM;
const px = (lng) => ((lng + 180) / 360) * n * TILE;
const py = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n * TILE;
};
const x0 = Math.floor(px(bounds.west));
const x1 = Math.ceil(px(bounds.east));
const y0 = Math.floor(py(bounds.north));
const y1 = Math.ceil(py(bounds.south));
const W = x1 - x0;
const H = y1 - y0;

fs.mkdirSync(CACHE, { recursive: true });
const tiles = [];
for (let tx = Math.floor(x0 / TILE); tx <= Math.floor((x1 - 1) / TILE); tx++) {
  for (let ty = Math.floor(y0 / TILE); ty <= Math.floor((y1 - 1) / TILE); ty++) {
    const file = path.join(CACHE, `${ZOOM}-${tx}-${ty}.img`);
    if (!fs.existsSync(file)) {
      const res = await fetch(TILE_URL(ZOOM, tx, ty), {
        headers: { 'User-Agent': 'static-map-builder/1.0' },
      });
      if (!res.ok) throw new Error(`Azulejo ${tx},${ty}: HTTP ${res.status}`);
      fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      await new Promise((r) => setTimeout(r, 150)); // não sobrecarregar o servidor
    }
    tiles.push({ input: file, left: tx * TILE - x0, top: ty * TILE - y0 });
  }
}

// Juntar (os azulejos das bordas saem parcialmente fora: o sharp recorta)
const canvasW = Math.ceil(W / TILE + 2) * TILE;
const canvasH = Math.ceil(H / TILE + 2) * TILE;
const offset = TILE; // margem para os azulejos com left/top negativos
// (o sharp recorta antes de juntar, por isso junta-se primeiro e recorta-se depois)
const canvas = await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background: '#fff' } })
  .composite(tiles.map((t) => ({ ...t, left: t.left + offset, top: t.top + offset })))
  .png()
  .toBuffer();
const rgb = await sharp(canvas).extract({ left: offset, top: offset, width: W, height: H }).removeAlpha().raw().toBuffer();

// Recolorir: cada píxel do mapa base passa para a cor da marca equivalente
const mix = (a, b, t) => a.map((v, c) => Math.round(v + (b[c] - v) * t));
const out = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H; i++) {
  const [r, g, b] = [rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2]];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const water = Math.abs(r - WATER[0]) + Math.abs(g - WATER[1]) + Math.abs(b - WATER[2]);
  let px;
  if (water < 12) px = SKY;
  else if (g - r >= 4 && g - b >= 3) px = PARK;
  else if (lum >= 233) px = mix(LAND, ROAD, Math.min(1, (lum - 233) / 18));
  else if (lum >= 214) px = LAND;
  else px = mix(LAND, LINE, Math.min(0.55, (214 - lum) / 120));
  out.set(px, i * 3);
}
const outDir = path.join(SITE, 'public/brand/map');
fs.mkdirSync(outDir, { recursive: true });
await sharp(out, { raw: { width: W, height: H, channels: 3 } }).webp({ quality: 78 }).toFile(path.join(outDir, 'bairros.webp'));

fs.writeFileSync(
  path.join(SITE, 'src/data/map.json'),
  JSON.stringify({ image: '/brand/map/bairros.webp', zoom: ZOOM, width: W, height: H, x0, y0 }, null, 2) + '\n',
);
console.log(`Mapa ${W}×${H}px, ${tiles.length} azulejos, zona`, bounds);
