// Farbcodes der Jahreskarten als Kategorien für Veranstaltungen (Entwurf 3)
export const cats = {
  abend: { label: 'Abends und im Licht', color: 'purple' },
  natur: { label: 'Tiere und Natur', color: 'blue' },
  mitmachen: { label: 'Mitmachen', color: 'orange' },
  fest: { label: 'Feste und Advent', color: 'red' },
} as const;
export type CatKey = keyof typeof cats;
export function catOf(title: string): CatKey {
  const t = title.toLowerCase();
  if (/dunkel|leuchten|fackel|gaukler|wolfsnächte/.test(t)) return 'abend';
  if (/weihnacht|winterwanderung/.test(t)) return 'fest';
  if (/oster|indianer|wikinger|steinzeit|schafe|bienen|süß|holzrücken/.test(t)) return 'mitmachen';
  return 'natur';
}
