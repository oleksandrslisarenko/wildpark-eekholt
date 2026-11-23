// Erzeugt die russischen Seiten unter dist/ru/ aus den deutschen Build-Seiten.
// Übersetzt Textknoten und Attribute über das Wörterbuch i18n/ru.json (Schlüssel = deutscher Text).
//   node scripts/translate.mjs           -> dist/ru/** schreiben, fehlende Texte melden
//   node scripts/translate.mjs --extract -> alle deutschen Texte nach i18n/_strings.json
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const extract = process.argv.includes('--extract');
const dict = existsSync('i18n/ru.json') ? JSON.parse(readFileSync('i18n/ru.json', 'utf8')) : {};
const ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'data-ok', 'data-send'];
const SKIP = new Set(['script', 'style', 'noscript', 'svg']);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (!['ru', 'pagefind', '_astro', 'img', 'fonts'].includes(f) || dir !== DIST) walk(p, out); }
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const hasLetters = (s) => /[A-Za-zÄÖÜäöüß]/.test(s);
const found = new Set();
const missing = new Map();

// Regeln für Datums- und Zeitangaben, z. B. "So. 06.12.26, So. 13.12.26 · 15:00 Uhr"
const WD = { 'Mo.': 'пн', 'Di.': 'вт', 'Mi.': 'ср', 'Do.': 'чт', 'Fr.': 'пт', 'Sa.': 'сб', 'So.': 'вс' };
const MON = { Januar: 'января', Februar: 'февраля', März: 'марта', April: 'апреля', Mai: 'мая', Juni: 'июня', Juli: 'июля', August: 'августа', September: 'сентября', Oktober: 'октября', November: 'ноября', Dezember: 'декабря' };
const MON_S = { 'Jan.': 'янв.', 'Feb.': 'февр.', 'März': 'марта', 'Apr.': 'апр.', 'Mai': 'мая', 'Juni': 'июня', 'Juli': 'июля', 'Aug.': 'авг.', 'Sept.': 'сент.', 'Okt.': 'окт.', 'Nov.': 'нояб.', 'Dez.': 'дек.' };
function rule(t) {
  let s = t;
  s = s.replace(/voraussichtl\. /g, 'предположительно ');
  s = s.replace(/\b(Mo|Di|Mi|Do|Fr|Sa|So)\./g, (m) => WD[m]);
  s = s.replace(/(\d{1,2})\. (Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)/g, (_, d, m) => `${d} ${MON[m]}`);
  s = s.replace(/\b(Jan\.|Feb\.|März|Apr\.|Mai|Juni|Juli|Aug\.|Sept\.|Okt\.|Nov\.|Dez\.)(?=[ ,]|$)/g, (m) => MON_S[m]);
  s = s.replace(/Einlass bis (\d{1,2}:\d{2}) Uhr/g, 'вход до $1');
  s = s.replace(/\bab (\d{1,2}:\d{2})/g, 'с $1').replace(/\bab (?=(пн|вт|ср|чт|пт|сб|вс) )/g, 'с ');
  s = s.replace(/ ?Uhr ?/g, ' ').replace(/(\d{2}:\d{2}) (\d{2}:\d{2})/g, '$1, $2');
  s = s.replace(/ bis /g, ' – ').replace(/\s+/g, ' ').replace(/ ([,.])/g, '$1').trim();
  s = s.replace(/^с (\d)/, 'с $1');
  return /[A-Za-zÄÖÜäöüß]/.test(s) ? null : s;
}

function lookup(t) {
  if (t in dict) return dict[t];
  if (/^[A-Z]$/.test(t)) return t;
  if (t.includes(' · ')) {
    const parts = t.split(' · ').map((p) => lookup(p.trim()));
    if (parts.every((p) => p !== null)) return parts.join(' · ');
  }
  return rule(t);
}

function tr(raw, file) {
  const t = norm(raw);
  if (!t || !hasLetters(t)) return raw;
  found.add(t);
  const r = lookup(t);
  if (r !== null) {
    const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    return (lead && r ? ' ' : '') + r + (trail && r ? ' ' : '');
  }
  if (!extract) missing.set(t, file);
  return raw;
}

function translateNode(node, file) {
  if (node.nodeType === 3) { node.rawText = escapeText(tr(decode(node.rawText), file)); return; }
  if (node.nodeType !== 1) return;
  const tag = (node.rawTagName || '').toLowerCase();
  if (SKIP.has(tag)) return;
  if (node.getAttribute && node.getAttribute('lang') === 'de' && tag === 'span') return; // Sprachumschalter
  for (const a of ATTRS) {
    const v = node.getAttribute?.(a);
    if (v && hasLetters(v)) node.setAttribute(a, tr(v, file).trim());
  }
  node.childNodes.forEach((c) => translateNode(c, file));
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const isPageLink = (h) => h && h.startsWith('/') && !h.startsWith('//') && !/^\/(img|_astro|pagefind|fonts|ru)(\/|$)/.test(h) && !/\.(webp|jpg|png|svg|pdf|js|css)$/.test(h);

for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  const root = parse(html, { comment: false, blockTextElements: { script: true, style: true, noscript: true } });
  const doc = root.querySelector('html');
  const title = root.querySelector('title');
  if (title) title.set_content(escapeText(tr(decode(title.text), file)));
  const md = root.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', tr(md.getAttribute('content'), file).trim());
  const body = root.querySelector('body');
  translateNode(body, file);
  if (extract) continue;

  doc.setAttribute('lang', 'ru');
  root.querySelectorAll('a[href]').forEach((a) => { const h = a.getAttribute('href'); if (isPageLink(h)) a.setAttribute('href', '/ru' + h); });
  // Sprachumschalter: RU aktiv, DE verlinkt
  root.querySelectorAll('[data-langswitch]').forEach((ul) => {
    const path = ul.getAttribute('data-path');
    ul.set_content(`<li><a href="${path}" hreflang="de" lang="de" title="Deutsch">DE</a></li><li><span aria-current="true" title="Русский" lang="ru">RU</span></li><li><span class="off" aria-disabled="true" title="English – скоро">EN</span></li><li><span class="off" aria-disabled="true" title="Dansk – скоро">DA</span></li>`);
    ul.setAttribute('aria-label', 'Язык');
  });
  // Tag + Monat im Genitiv ("28 ноября")
  root.querySelectorAll('[data-i18n-daymonth]').forEach((el) => {
    const [d, m] = el.getAttribute('data-i18n-daymonth').split('|');
    el.set_content(`${d}<small>${MON[m] || m}</small>`);
  });
  // Monatsinitialen im Jahreszyklus
  const INI = ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'];
  root.querySelectorAll('.cycle').forEach((c) => c.querySelectorAll('span').forEach((sp, i) => sp.set_content(INI[i] || sp.text)));
  // Tierlisten nach russischem Alphabet sortieren
  root.querySelectorAll('ul.index-az, ul.az, ul.alpha').forEach((ul) => {
    const lis = ul.querySelectorAll(':scope > li');
    lis.sort((a, b) => a.text.trim().localeCompare(b.text.trim(), 'ru'));
    ul.set_content(lis.map((li) => li.toString()).join(''));
  });
  const out = join(DIST, 'ru', relative(DIST, file));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, '<!DOCTYPE html>' + root.toString().replace(/^<!DOCTYPE html>/i, ''));
}

if (extract) {
  mkdirSync('i18n', { recursive: true });
  const list = [...found].sort();
  writeFileSync('i18n/_strings.json', JSON.stringify(list, null, 1));
  const miss = list.filter((s) => lookup(s) === null);
  writeFileSync('i18n/_missing.json', JSON.stringify(miss, null, 1));
  console.log(`${list.length} Texte, davon ohne Übersetzung: ${miss.length}`);
} else if (missing.size) {
  console.warn(`RU: ${missing.size} Texte ohne Übersetzung (bleiben deutsch):`);
  for (const [t, f] of [...missing].slice(0, 40)) console.warn(`  [${f}] ${t.slice(0, 90)}`);
  if (process.env.STRICT_I18N) process.exit(1);
} else console.log('RU: alle Texte übersetzt.');
