/**
 * Gera public/brand/highlights/scribble-<cor>-draw.svg: o rabisco de destaque (scribble-<cor>.webp)
 * revelado por um "pincel" que percorre os três traços (→ ← →), como alguém a riscar.
 * O site usa estes SVG em src/layouts/BaseLayout.astro quando a palavra destacada entra no ecrã.
 *
 *   node scripts/scribble-draw.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/brand/highlights');
// Linha central dos três traços, no espaço da imagem (700 × 174)
const D =
  'M6,86 C140,48 380,16 672,22 C702,32 694,60 650,66 L520,74 C380,82 230,90 168,100 C148,118 172,148 200,150 C330,138 560,124 694,120';

for (const color of ['sun', 'sky', 'orange']) {
  const webp = fs.readFileSync(path.join(DIR, `scribble-${color}.webp`)).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 174" preserveAspectRatio="none">
<style>
path{fill:none;stroke:#fff;stroke-width:64;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:1.05;animation:d .8s cubic-bezier(.4,.1,.6,.95) .15s forwards}
@keyframes d{to{stroke-dashoffset:0}}
</style>
<mask id="m" maskUnits="userSpaceOnUse" x="-40" y="-40" width="780" height="254"><path pathLength="1" d="${D}"/></mask>
<image width="700" height="174" preserveAspectRatio="none" mask="url(#m)" href="data:image/webp;base64,${webp}"/>
</svg>`;
  fs.writeFileSync(path.join(DIR, `scribble-${color}-draw.svg`), svg);
  console.log(`scribble-${color}-draw.svg`, Math.round(svg.length / 1024), 'KB');
}
