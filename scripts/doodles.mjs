// Erzeugt handgezeichnete ("Kinderzeichnung") Icons aus Tabler-Outline-Icons mit rough.js.
// node scripts/doodles.mjs -> src/icons/d/*.svg
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import rough from 'roughjs';
import { parse } from 'node-html-parser';

const gen = rough.generator();
const SRC = 'node_modules/@tabler/icons/icons/outline/';
const OUT = 'src/icons/d/';
mkdirSync(OUT, { recursive: true });

const C = { ink: '#1C1C1A', blue: '#334A9A', red: '#BE2A0C', purple: '#A169A8', orange: '#F07F1F', lime: '#A9AA00' };

// Name -> [Tabler-Icon, Hauptfarbe, Akzentfarbe]
const ICONS = {
  uhr: ['clock', 'ink', 'orange'], ticket: ['ticket', 'ink', 'red'], sonne: ['sun', 'orange', 'orange'], schnee: ['snowflake', 'blue', 'blue'],
  euro: ['coin-euro', 'ink', 'lime'], schule: ['school', 'ink', 'blue'], grill: ['grill', 'ink', 'red'], feder: ['feather', 'ink', 'purple'],
  fisch: ['fish', 'ink', 'blue'], hund: ['dog', 'ink', 'orange'], pfote: ['paw', 'ink', 'purple'], rad: ['bike-off', 'ink', 'red'],
  lineal: ['ruler-measure', 'ink', 'orange'], gewicht: ['weight', 'ink', 'blue'], sanduhr: ['hourglass', 'ink', 'purple'], fleisch: ['meat', 'ink', 'red'],
  kalender: ['calendar', 'ink', 'blue'], herz: ['heart', 'red', 'red'], gruppe: ['users', 'ink', 'blue'], familie: ['friends', 'ink', 'orange'],
  zelt: ['tent', 'ink', 'lime'], feuer: ['flame', 'orange', 'red'], baeume: ['trees', 'ink', 'lime'], knochen: ['bone', 'ink', 'orange'],
  kinderwagen: ['baby-carriage', 'ink', 'purple'], pin: ['map-pin', 'ink', 'red'], kamera: ['camera', 'ink', 'blue'], baum: ['tree', 'ink', 'lime'],
};

let seed = 7;
function shapes(el) {
  const tag = el.rawTagName;
  const a = (k) => parseFloat(el.getAttribute(k) || '0');
  if (el.getAttribute('stroke') === 'none') return null;
  if (tag === 'path') return { t: 'path', d: el.getAttribute('d') };
  if (tag === 'circle') return { t: 'circle', x: a('cx'), y: a('cy'), d: a('r') * 2 };
  if (tag === 'line') return { t: 'line', x1: a('x1'), y1: a('y1'), x2: a('x2'), y2: a('y2') };
  if (tag === 'rect') return { t: 'rect', x: a('x'), y: a('y'), w: a('width'), h: a('height') };
  if (tag === 'polyline' || tag === 'polygon') return { t: 'poly', pts: el.getAttribute('points').trim().split(/[\s,]+/).map(Number) };
  if (tag === 'ellipse') return { t: 'ellipse', x: a('cx'), y: a('cy'), w: a('rx') * 2, h: a('ry') * 2 };
  return null;
}
function draw(s, opt) {
  switch (s.t) {
    case 'path': return gen.path(s.d, opt);
    case 'circle': return gen.circle(s.x, s.y, s.d, opt);
    case 'ellipse': return gen.ellipse(s.x, s.y, s.w, s.h, opt);
    case 'line': return gen.line(s.x1, s.y1, s.x2, s.y2, opt);
    case 'rect': return gen.rectangle(s.x, s.y, s.w, s.h, opt);
    case 'poly': { const p = []; for (let i = 0; i < s.pts.length; i += 2) p.push([s.pts[i], s.pts[i + 1]]); return gen.linearPath(p, opt); }
  }
}
function toSvgPaths(drawable, color, width, extra = '') {
  return gen.toPaths(drawable).map((p) => `<path d="${p.d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round" stroke-linejoin="round"${extra}/>`).join('');
}

for (const [name, [src, main, acc]] of Object.entries(ICONS)) {
  const svg = parse(readFileSync(SRC + src + '.svg', 'utf8')).querySelector('svg');
  const els = svg.querySelectorAll('path,circle,line,rect,polyline,polygon,ellipse').map(shapes).filter(Boolean);
  let out = '';
  // 1) Akzent: Farbschicht, leicht versetzt, wie ein zweiter Buntstift
  els.forEach((s, i) => {
    if (i % 2 === 0 || els.length === 1) out += `<g transform="translate(0.9 0.7)" opacity=".85">${toSvgPaths(draw(s, { roughness: 1.4, bowing: 1.6, seed: seed++, disableMultiStroke: true }), C[acc], 1.5)}</g>`;
  });
  // 2) Kontur
  els.forEach((s) => { out += toSvgPaths(draw(s, { roughness: 0.9, bowing: 1, seed: seed++, disableMultiStroke: true }), C[main], 1.15); });
  writeFileSync(OUT + name + '.svg', `<svg viewBox="-1 -1 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${out}</svg>`);
}
console.log('doodles:', Object.keys(ICONS).length);

// Bollerwagen (kein Tabler-Icon): eigene Formen
{
  let out = '';
  const acc = [gen.rectangle(3.5, 8.5, 15, 7, { roughness: 1.4, seed: 91, disableMultiStroke: true, fill: C.orange, fillStyle: 'hachure', hachureGap: 2.2 })];
  acc.forEach((d) => { gen.toPaths(d).forEach((p) => { out += `<path d="${p.d}" stroke="${p.stroke === 'none' ? C.orange : C.orange}" stroke-width="1" fill="none" opacity=".7"/>`; }); });
  const parts = [gen.rectangle(3, 8, 16, 7, { roughness: 0.9, seed: 92, disableMultiStroke: true }), gen.circle(7, 18.5, 5, { roughness: 0.9, seed: 93, disableMultiStroke: true }), gen.circle(16, 18.5, 5, { roughness: 0.9, seed: 94, disableMultiStroke: true }), gen.line(19, 9, 23, 4, { roughness: 0.9, seed: 95, disableMultiStroke: true })];
  parts.forEach((d) => { out += toSvgPaths(d, C.ink, 1.15); });
  writeFileSync(OUT + 'wagen.svg', `<svg viewBox="-1 -1 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${out}</svg>`);
}

// Szene für den Kopf der Preisseite
{
  const inner = (n) => readFileSync(OUT + n + '.svg', 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const place = (n, x, y, s, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot} ${12 * s} ${12 * s}) scale(${s})">${inner(n).replace(/stroke-width="([\d.]+)"/g, (_, w) => `stroke-width="${(w * 2.4 / s).toFixed(2)}"`)}</g>`;
  let extra = '';
  const star = (cx, cy, r, color, seedN) => {
    const pts = []; for (let i = 0; i < 10; i++) { const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
    pts.push(pts[0]);
    return toSvgPaths(gen.linearPath(pts, { roughness: 1.2, seed: seedN, disableMultiStroke: true }), C[color], 2.4);
  };
  extra += star(345, 40, 14, 'orange', 201) + star(300, 255, 10, 'purple', 202) + star(20, 150, 9, 'blue', 203);
  extra += toSvgPaths(gen.curve([[10, 285], [80, 265], [150, 288], [230, 268], [300, 290], [390, 270]], { roughness: 1.3, seed: 204, disableMultiStroke: true }), C.blue, 3);
  extra += toSvgPaths(gen.curve([[250, 120], [262, 108], [276, 122], [290, 110]], { roughness: 1, seed: 205, disableMultiStroke: true }), C.blue, 2.4);
  const scene = place('uhr', 20, 10, 6.4) + place('ticket', 190, 20, 5.2, -9) + place('sonne', 290, 110, 3.6) + place('schnee', 205, 160, 3.4, 10)
    + place('euro', 95, 175, 3.2, -6) + place('euro', 145, 200, 2.5, 12) + place('baeume', 10, 185, 3.4) + extra;
  writeFileSync(OUT + 'szene-besuch.svg', `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${scene}</svg>`);
}
console.log('extra ok');
