/**
 * Prepara os elementos gráficos da marca para o site.
 *
 * Lê a pasta "ficheiros/Elementos Gráficos" (fora do repositório, ao lado da pasta website)
 * e escreve versões otimizadas para a web em public/ e src/assets/.
 *
 * Correr de novo sempre que o designer enviar elementos novos:
 *   node scripts/brand-assets.mjs
 *   node scripts/brand-assets.mjs "C:/outro/caminho/Elementos Gráficos"
 *
 * O que faz:
 *  - SVGs (traços, setas, doodles, highlights) → cópia com o preenchimento a preto,
 *    para serem usados como máscara CSS e pintados com qualquer cor da paleta.
 *  - Folhas de ícones e personagens → cortadas em ficheiros individuais.
 *  - Fundos de papel → WebP leves para repetir como textura.
 *  - Fotos com efeito e stickers → src/assets (o Astro otimiza-os no build).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(process.argv[2] ?? path.join(SITE, '../ficheiros/Elementos Gráficos'));
const PUBLIC = path.join(SITE, 'public');
const ASSETS = path.join(SITE, 'src/assets');

const src = (...p) => path.join(SRC, ...p);
const ensure = (file) => fs.mkdirSync(path.dirname(file), { recursive: true });

/* ---------- 1. SVGs como máscara (cor aplicada por CSS) ---------- */

/** Pinta tudo de preto e (opcionalmente) deixa o SVG esticar para caber em qualquer palavra. */
function toMaskSvg(svg, { stretch = false } = {}) {
  let out = svg
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/mix-blend-mode:\s*[a-z-]+;?/g, '')
    .replace(/(fill|stroke)\s*:\s*#[0-9a-f]{3,8}/gi, '$1: #000')
    .replace(/(fill|stroke)="#[0-9a-f]{3,8}"/gi, '$1="#000"')
    .replace(/opacity\s*:\s*\.?\d+(\.\d+)?;?/g, '')
    .replace(/opacity="[^"]*"/g, '');
  if (stretch) out = out.replace(/<svg\b/, '<svg preserveAspectRatio="none"');
  return out.trim();
}

const svgJobs = [
  // [pasta de origem, ficheiro, nome de saída, esticar?]
  ...[1, 2, 3, 4, 5, 6].map((n) => ['SVG/Doodles', `traço_${n}.svg`, `strokes/traco-${n}.svg`, false]),
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ['SVG/Setas', `Seta_${n}.svg`, `arrows/seta-${n}.svg`, false]),
  ['SVG/Highlights', 'Highlights_1.svg', 'highlights/marker-lines.svg', true],
  ['SVG/Highlights', 'Highlight_2.svg', 'highlights/swoosh-thin.svg', true],
  ['SVG/Highlights', 'Highlight_3.svg', 'highlights/marker-double.svg', true],
  ['SVG/Highlights', 'Highlights_5.svg', 'highlights/line.svg', true],
  ['SVG/Highlights', 'Highlights_6.svg', 'highlights/brush-triple.svg', true],
  ['SVG/Highlights', 'Highlights_7.svg', 'highlights/brush.svg', true],
  ['SVG/Highlights', 'Highlights_8.svg', 'highlights/swoosh-double.svg', true],
  ['SVG/Highlights', 'box.svg', 'highlights/box-fill.svg', true],
  ['SVG/Highlights', 'box_4.svg', 'highlights/box-outline.svg', true],
  ['SVG/Highlights', 'Circle_2.svg', 'highlights/circle-thick.svg', true],
  ['SVG/Highlights', 'Circle_5.svg', 'highlights/circle.svg', true],
  ['SVG/Highlights', 'Circle_7.svg', 'highlights/circle-thin.svg', true],
  ['SVG/Highlights', 'Cirlce_2.svg', 'highlights/ellipse.svg', true],
  ['SVG/Highlights', 'text_bubble.svg', 'highlights/bubble.svg', false],
  ...[
    ['Atomo', 'atom'], ['Avião_Papel', 'paper-plane'], ['BRUSH', 'brush'], ['camera', 'camera'],
    ['camera_2', 'polaroid'], ['camera_3', 'polaroids'], ['canva', 'easel'], ['exclamation_1', 'sparks-rough'],
    ['exclamation_2', 'sparks'], ['Folha', 'leaf'], ['Headset', 'headset'], ['Heart', 'heart'],
    ['keyboard', 'keyboard'], ['lupa', 'magnifier-chart-bold'], ['Lupa_Gráfico', 'magnifier-chart'],
    ['Lápis', 'pencil'], ['Map_Lines_Portugal', 'portugal'], ['megaphone', 'megaphone'], ['Open_Book', 'open-book'],
    ['pen', 'pen'], ['Régua_1', 'ruler'], ['Régua_2', 'protractor'], ['speaker', 'speaker'], ['Óculos', 'glasses'],
  ].map(([from, to]) => ['SVG/Doodles', `${from}.svg`, `doodles/${to}.svg`, false]),
  ...[
    ['Check', 'check'], ['Exclamação', 'exclamation'], ['Interrogação', 'question'], ['Lupa_Simples', 'magnifier'],
    ['Nota_Muscial_1', 'music-1'], ['Nota_Musical_2', 'music-2'], ['Save', 'bookmark'], ['warning', 'warning'],
  ].map(([from, to]) => ['SVG/Icons', `${from}.svg`, `doodles/${to}.svg`, false]),
];

for (const [dir, file, out, stretch] of svgJobs) {
  const from = src(dir, file);
  if (!fs.existsSync(from)) {
    console.warn('  ! em falta:', path.join(dir, file));
    continue;
  }
  const dest = path.join(PUBLIC, 'brand', out);
  ensure(dest);
  fs.writeFileSync(dest, toMaskSvg(fs.readFileSync(from, 'utf8'), { stretch }));
}
console.log(`✓ ${svgJobs.length} SVGs → public/brand/`);

/* ---------- 2. Folhas de ícones e personagens → ficheiros individuais ---------- */

/** Encontra "ilhas" de conteúdo numa imagem com transparência, separadas por espaço vazio. */
function runs(profile, minGap, minSize) {
  const out = [];
  let start = -1;
  let gap = 0;
  profile.forEach((filled, i) => {
    if (filled) {
      if (start < 0) start = i;
      gap = 0;
    } else if (start >= 0 && ++gap >= minGap) {
      out.push([start, i - gap + 1]);
      start = -1;
      gap = 0;
    }
  });
  if (start >= 0) out.push([start, profile.length]);
  return out.filter(([a, b]) => b - a >= minSize);
}

async function sliceSheet(file, { scale, minGap, minSize, size, names, outDir, format }) {
  const { data, info } = await sharp(file, { density: 72 * scale, limitInputPixels: false })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const alpha = (x, y) => data[(y * W + x) * 4 + 3] > 24;
  const colFilled = Array.from({ length: W }, (_, x) => {
    for (let y = 0; y < H; y += 2) if (alpha(x, y)) return true;
    return false;
  });
  const pieces = [];
  for (const [x0, x1] of runs(colFilled, minGap, minSize)) {
    const rowFilled = Array.from({ length: H }, (_, y) => {
      for (let x = x0; x < x1; x += 2) if (alpha(x, y)) return true;
      return false;
    });
    for (const [y0, y1] of runs(rowFilled, minGap, minSize)) pieces.push({ x0, x1, y0, y1 });
  }
  // ordem de leitura: linhas de cima para baixo, depois da esquerda para a direita
  pieces.sort((a, b) => (Math.abs(a.y0 - b.y0) > minSize / 2 ? a.y0 - b.y0 : a.x0 - b.x0));
  fs.mkdirSync(outDir, { recursive: true });
  for (const [i, p] of pieces.entries()) {
    const name = names?.[i] ?? String(i + 1).padStart(2, '0');
    const img = sharp(data, { raw: info })
      .extract({ left: p.x0, top: p.y0, width: p.x1 - p.x0, height: p.y1 - p.y0 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
    const dest = path.join(outDir, `${name}.${format}`);
    await (format === 'webp' ? img.webp({ quality: 88, alphaQuality: 100 }) : img.png({ compressionLevel: 9 })).toFile(dest);
  }
  return pieces.length;
}

// Ordem em que o corte encontra os ícones na folha Icons.svg.
// Flat: tools, shop, flag, handshake, audiobook, camera · Hand drawn: chat, heart, book, map, headset, idea
const iconNames = [
  'tools', 'shop', 'chat', 'heart',
  'flag', 'book', 'map', 'handshake',
  'headset', 'idea', 'audiobook', 'camera',
];
const iconCount = await sliceSheet(src('SVG/Icons/Icons.svg'), {
  scale: 1, minGap: 30, minSize: 60, size: 192, names: iconNames, outDir: path.join(PUBLIC, 'brand/icons'), format: 'png',
});
console.log(`✓ ${iconCount} ícones → public/brand/icons/ (esperados ${iconNames.length})`);

const faceCount = await sliceSheet(src('SVG/Doodles/Personagens.svg'), {
  scale: 2, minGap: 6, minSize: 60, size: 200, outDir: path.join(PUBLIC, 'brand/characters'), format: 'webp',
});
console.log(`✓ ${faceCount} personagens → public/brand/characters/`);

/* ---------- 3. Fundos de papel ---------- */

for (const [file, out] of [
  ['Bg_Amarelo.png', 'paper-mustard'],
  ['Bg_Azul.png', 'paper-navy'],
  ['Bg_BrancoSuave.png', 'paper-cream'],
]) {
  const dest = path.join(PUBLIC, 'textures', `${out}.webp`);
  ensure(dest);
  await sharp(src('Backgrounds', file)).removeAlpha().resize({ width: 1400 }).webp({ quality: 60 }).toFile(dest);
}
console.log('✓ 3 texturas → public/textures/');

/* ---------- 4. Fotos com efeito e stickers (otimizadas pelo Astro) ---------- */

for (const [from, to, width] of [
  ['Fotos com Efeito/Foto_Quemsomosnos.png', 'photos/team-circle.png', 1400],
  ['Fotos com Efeito/ComoNosComunicamos_image.png', 'photos/hands-balloon.png', 1400],
  ['Stickers/Stickers_Camadas_Baloes.png', 'brand/sticker-balloon.png', 600],
  ['Stickers/Stickers_Camadas_UPLogo.png', 'brand/sticker-up.png', 600],
]) {
  const dest = path.join(ASSETS, to);
  ensure(dest);
  await sharp(src(from)).trim({ threshold: 1 }).resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(dest);
}
console.log('✓ fotos com efeito e stickers → src/assets/');

/* ---------- 5. Highlights já coloridos (para usar como fundo atrás do texto) ---------- */
// As máscaras não acompanham texto que quebra de linha; um background-image sim.
const highlightColors = { sun: '#ffbe5e', sky: '#64afe3', orange: '#f39200' };
for (const name of ['brush', 'brush-triple', 'marker-double', 'marker-lines', 'swoosh-thin', 'swoosh-double', 'line']) {
  const mask = fs.readFileSync(path.join(PUBLIC, 'brand/highlights', `${name}.svg`), 'utf8');
  for (const [colorName, hex] of Object.entries(highlightColors)) {
    fs.writeFileSync(path.join(PUBLIC, 'brand/highlights', `${name}-${colorName}.svg`), mask.replace(/#000/g, hex));
  }
}
console.log('✓ highlights coloridos → public/brand/highlights/*-{sun,sky,orange}.svg');
