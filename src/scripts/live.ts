// Live-Status aus festen Daten (Einlasszeiten, Fütterungen, Flugvorführungen). Kein Server nötig.
import { seasons, feedings, flights } from '../data/site';

const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

export function currentSeason(d = new Date()) {
  const m = d.getMonth() + 1;
  return m >= 3 && m <= 10 ? seasons[0] : seasons[1];
}

export function status(d = new Date()) {
  const s = currentSeason(d);
  const now = d.getHours() * 60 + d.getMinutes();
  const open = toMin(s.open), last = toMin(s.lastEntry);
  if (now < open) return { state: 'soon', text: `Öffnet heute um ${s.open} Uhr`, short: `ab ${s.open}` };
  if (now < last) return { state: 'open', text: `Heute geöffnet · Einlass bis ${s.lastEntry} Uhr`, short: `bis ${s.lastEntry}` };
  return { state: 'closed', text: `Einlass für heute beendet · morgen ab ${s.open} Uhr`, short: `morgen ${s.open}` };
}

export function schedule(d = new Date()) {
  const now = d.getHours() * 60 + d.getMinutes();
  const iso = d.toISOString().slice(0, 10);
  const m = d.getMonth() + 1, day = d.getDate();
  const flightSeason = (m > 3 || (m === 3 && day >= 15)) && m <= 10;
  const items = [
    ...feedings.map((f) => ({ time: f.time, what: `Fütterung ${f.what}`, kind: 'feed', dur: 20 })),
    ...(flightSeason ? flights.times.map((t) => ({ time: t, what: 'Flugvorführung', kind: 'flight', dur: 30 })) : []),
  ].sort((a, b) => toMin(a.time) - toMin(b.time));
  return items.map((it) => {
    const t = toMin(it.time);
    const state = now >= t && now < t + it.dur ? 'now' : now >= t + it.dur ? 'past' : 'next';
    return { ...it, state };
  });
}

export function hydrate(root: ParentNode = document) {
  const d = new Date();
  const st = status(d);
  root.querySelectorAll<HTMLElement>('[data-live="status"]').forEach((el) => { el.textContent = st.text; el.dataset.state = st.state; });
  root.querySelectorAll<HTMLElement>('[data-live="short"]').forEach((el) => { el.textContent = st.short; el.dataset.state = st.state; });
  const sch = schedule(d);
  let markedNext = false;
  root.querySelectorAll<HTMLElement>('[data-slot]').forEach((el) => {
    const it = sch.find((x) => x.time === el.dataset.slot && el.dataset.kind === x.kind);
    if (!it) return;
    let state = it.state;
    if (state === 'next' && !markedNext && st.state !== 'closed') { state = 'upcoming'; markedNext = true; }
    el.dataset.state = state;
  });
  const next = sch.find((x) => x.state === 'now') || sch.find((x) => x.state === 'next');
  root.querySelectorAll<HTMLElement>('[data-live="next"]').forEach((el) => {
    if (!next || st.state === 'closed') { el.textContent = 'Fütterungen täglich ab 10:30 Uhr'; return; }
    el.textContent = next.state === 'now' ? `Jetzt: ${next.what}` : `Als Nächstes: ${next.time} Uhr ${next.what}`;
    el.dataset.state = next.state;
  });
}
