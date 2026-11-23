// Volltextsuche mit Pagefind (Index wird beim Build erzeugt, läuft rein statisch).
export function wireSearch(variant: string) {
  const dlg = document.querySelector<HTMLDialogElement>('[data-searchdlg]');
  const input = dlg?.querySelector<HTMLInputElement>('input[type=search]');
  const list = dlg?.querySelector<HTMLElement>('[data-results]');
  if (!dlg || !input || !list) return;
  document.querySelectorAll('[data-search]').forEach((b) => b.addEventListener('click', () => { dlg.showModal(); input.focus(); }));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  let pf: any; let t: number | undefined;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = window.setTimeout(async () => {
      const q = input.value.trim();
      if (q.length < 2) { list.innerHTML = ''; return; }
      try {
        pf ??= await import(/* @vite-ignore */ '/pagefind/pagefind.js');
        const r = await pf.search(q, { filters: { variant } });
        const items = await Promise.all(r.results.slice(0, 8).map((x: any) => x.data()));
        list.innerHTML = items.length
          ? items.map((d: any) => `<li><a href="${d.url}"><strong>${d.meta.title || ''}</strong><span>${d.excerpt}</span></a></li>`).join('')
          : `<li class="empty">Keine Treffer für „${q.replace(/</g, '')}“. Versuchen Sie ein anderes Wort, zum Beispiel Wolf oder Preise.</li>`;
      } catch {
        list.innerHTML = '<li class="empty">Die Suche ist in der lokalen Vorschau nicht verfügbar.</li>';
      }
    }, 180);
  });
}
