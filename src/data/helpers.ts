import { events, feedings, flights, type Ev } from './site';

export const TODAY = new Date('2026-11-23T11:00:00');
const MONTHS = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
export const MONTHS_LONG = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const WD = ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'];

export function lastDate(e: Ev) { return e.dates.length ? e.dates[e.dates.length - 1] : e.start; }
export function nextDate(e: Ev, from = TODAY) {
  const iso = from.toISOString().slice(0, 10);
  return e.dates.find((d) => d >= iso) || null;
}
export function upcoming(n = 4, from = TODAY) {
  const iso = from.toISOString().slice(0, 10);
  return events
    .filter((e) => (lastDate(e) || '') >= iso && !e.title.startsWith('Beginn der Flug'))
    .map((e) => ({ ...e, next: nextDate(e, from) || e.start! }))
    .sort((a, b) => a.next.localeCompare(b.next))
    .slice(0, n);
}
export function dayLabel(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return { day: d.getDate(), mon: MONTHS[d.getMonth()], wd: WD[d.getDay()], monLong: MONTHS_LONG[d.getMonth()] };
}
export function cleanTime(t: string) { return t.replace(/\s+Uhr/g, ' Uhr').replace(/(\d{2}:\d{2}) Uhr (\d{2}:\d{2})/g, '$1, $2'); }
export function flightSeason(d = TODAY) { const m = d.getMonth() + 1, day = d.getDate(); return (m > 3 || (m === 3 && day >= 15)) && m <= 10; }
export function slotsToday(d = TODAY) {
  return [
    ...feedings.map((f) => ({ time: f.time, what: f.what, kind: 'feed' })),
    ...(flightSeason(d) ? flights.times.map((t) => ({ time: t, what: 'Flugvorführung', kind: 'flight' })) : []),
  ].sort((a, b) => a.time.localeCompare(b.time));
}
// Eventfotos: wo größere Fotos vorhanden sind (Facebook-Seite des Parks)
export const eventPhoto: Record<string, string> = {
  'Eekholter Weihnachtsmarkt': 'weihnachtsmarkt',
  'Adventliche Fackelwanderung': 'fackelwanderung',
  'Novemberleuchten mit Laternenpfad': 'laternenpfad',
  'Dunkel-Munkel-Nächte': 'dunkel-munkel',
};
