// Entwurf 2 (Revier) nutzt dieselben Seitenvorlagen wie Entwurf 1.
// Nach dem Build zeigen alle internen Links in dist/v3/** auf /v3/ statt /v12/.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = 'dist/v3';
let n = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) {
      const s = readFileSync(p, 'utf8');
      const t = s.replace(/(["'(=])\/v12\//g, '$1/v3/');
      if (t !== s) { writeFileSync(p, t); n++; }
    }
  }
})(root);
console.log(`v3links: ${n} Seiten angepasst`);
