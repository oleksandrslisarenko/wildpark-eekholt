// Inhalte 1:1 von wildpark-eekholt.de (Stand 23.11.2026)
import eventsRaw from './events.json';
import animalsRaw from './animals.json';
import sizes from './imgsizes.json';

export const contact = {
  name: 'Wildpark Eekholt',
  legal: 'Wildpark Eekholt Dr. h.c. Hatlapa GmbH & Co. KG',
  street: 'Eekholt 1', zip: '24623', city: 'Großenaspe',
  navi: 'Stellbrooker Weg, 24598 Heidmühlen',
  phone: '04327 9923-0', phoneHref: 'tel:+49432799230',
  fax: '04327 1232',
  mail: 'info@wildpark-eekholt.de',
  office: 'Mo.–Fr. 8:00–16:00 Uhr',
  coords: { lat: 53.9486, lng: 10.03 },
  facebook: 'https://www.facebook.com/WildparkEekholt',
  shop: 'https://www.eekholt-shop.de',
  paten: 'https://www.eekholt-patenschaften.de',
  spende: 'https://www.gooding.de/donation/foerderungsverein-wildpark-eekholt-e-v-22682',
};

export const facts = { hectare: 67, animals: 700, species: 100, years: 50 };

// Einlasszeiten. Park bleibt bis Einbruch der Dunkelheit offen, Ausgang über Drehtor.
export const seasons = [
  { id: 'sommer', label: '1. März bis 31. Oktober', from: [3, 1], to: [10, 31], open: '09:00', lastEntry: '18:00' },
  { id: 'winter', label: '1. November bis 28. Februar', from: [11, 1], to: [2, 28], open: '10:00', lastEntry: '16:00' },
];
export const specialEntry = 'Verlängerter Einlass: Novemberleuchten bis 18:00 Uhr, Weihnachtsmarkt bis 17:00 Uhr, Wolfsnächte bis 18:00 Uhr.';

export const feedings = [
  { time: '10:30', what: 'Fischotter', slug: 'otter' },
  { time: '11:00', what: 'Baummarder', slug: 'baummarder' },
  { time: '13:00', what: 'Füchse, Dachse und Steinmarder', slug: 'rotfuchs' },
  { time: '14:45', what: 'Störche', slug: 'storch' },
  { time: '15:00', what: 'Fischotter', slug: 'otter' },
  { time: '15:30', what: 'Wolf', slug: 'wolf' },
];
export const flights = { times: ['11:30', '14:00', '16:00'], from: '2027-03-14', season: '15. März bis 31. Oktober', note: 'Bei Regen keine Vorführung. Im Eintritt enthalten.' };

export const prices = {
  single: [
    { label: 'Erwachsene', price: 15.0 },
    { label: 'Rentner, Menschen mit Behinderung, Studenten, Schüler ab 16', price: 14.0 },
    { label: 'Kinder von 4 bis 16 Jahren', price: 12.5 },
    { label: 'Kinder unter 4 Jahren', price: 0 },
  ],
  family: { label: 'Familien-Tageskarte', note: 'Eltern mit eigenen Kindern bis 16 Jahre', price: 49.5 },
  annual: [
    { label: 'Kinder', note: '4 bis 16 Jahre', price: 33.5, color: 'orange' },
    { label: 'Erwachsene', note: '', price: 48.5, color: 'blue' },
    { label: 'Familien', note: 'Eltern mit Kindern von 4 bis 16 Jahren', price: 102.5, color: 'red' },
    { label: 'Großeltern', note: 'Großeltern mit Enkeln von 4 bis 16 Jahren', price: 102.5, color: 'purple' },
  ],
  annualNote: 'Jahreskarten 2027 gelten vom 01.12.2026 bis 31.12.2027 (12+1 Aktion). Bestellung im Onlineshop oder im Eingangsbereich. Lieferzeit 5–7 Werktage.',
  groups: [
    { label: 'Erwachsene', price: 14.0 },
    { label: 'Rentner, Menschen mit Behinderung, Studenten, Schüler ab 16', price: 13.0 },
    { label: 'Kinder von 4 bis 16 Jahren', price: 12.0 },
  ],
  groupsNote: 'Ab 20 Personen, mit Voranmeldung und gemeinsamer Bezahlung. Gruppen unter 20 Personen zahlen Einzelpreise.',
  schools: [
    { label: 'Eintritt pro Kind', price: 8.0 },
    { label: 'Pädagogische Betreuung, ca. 1,5 Std., pro Kind', price: 3.75 },
    { label: 'Lehrer und Erzieher', price: 0 },
  ],
  schoolsNote: 'Mit Voranmeldung. Pro Klasse ab 10 Kindern ein Lehrer und eine zweite Begleitperson frei, unter 10 Kindern eine Begleitperson frei.',
  extras: [
    { label: 'Führung oder Kindergeburtstag, ca. 1,5 Std., zzgl. Eintritt', price: 65.0 },
    { label: 'Grillplatz, 3 Std.', price: 14.0, extra: '+ 4,00 € je weitere Std.' },
    { label: 'Grillhütte, 3 Std.', price: 27.0, extra: '+ 5,00 € je weitere Std.' },
    { label: 'Grillplatz II, 3 Std.', price: 42.0, extra: '+ 6,00 € je weitere Std.' },
    { label: 'Doppelte Grillkate, 3 Std.', price: 55.0, extra: '+ 7,00 € je weitere Std.' },
    { label: 'Zusatzpavillon 3 × 3 m mit Sitzgarnitur', price: 40.0 },
    { label: 'Zusatzpavillon 3 × 6 m mit Sitzgarnitur', price: 60.0 },
    { label: 'Feuerkorb mit Holz', price: 15.0 },
    { label: 'Schwedenfackel', price: 20.0 },
  ],
  rules: [
    'Hunde sind an der Leine willkommen.',
    'Hundegruppen, Hundeschulen und Mantrailing bitte vorher telefonisch anmelden. Am Wochenende nur eingeschränkt.',
    'Rollschuhe erlaubt, Fahrräder und Roller nicht.',
    'Bollerwagen ohne Reservierung ausleihbar, bei Veranstaltungen Reservierung empfohlen.',
  ],
};

export type Ev = { month: string; m: number; date: string; time: string; title: string; text: string; img: string | null; start: string | null; dates: string[]; links: { href: string; v: string }[] };
export const events = eventsRaw as Ev[];
export type Animal = { slug: string; url: string; name: string; latin: string; intro: string; facts: { k: string; v: string }[]; img: string | null; pdf: string | null };
export const animals = animalsRaw as Animal[];

// Fotos pro Tier (nur vorhandene Fotos der Website / Facebook-Seite)
export const animalPhotos: Record<string, string> = {
  wolf: 'woelfe', otter: 'fischotter', storch: 'stoerche', wildkatze: 'wildkatzen', weisses_rotwild: 'weisses-rotwild',
  seeadler: 'seeadler', uhu: 'uhu-untersuchung', kampflaeufer: 'kampflaeufer',
};

export const nav = [
  { label: 'Besuch planen', href: 'besuch' },
  { label: 'Unsere Tiere', href: 'tier' },
  { label: 'Veranstaltungen', href: 'veranstaltungen' },
  { label: 'Wolfsmeile', href: null },
  { label: 'Vogelpflegestation', href: null },
  { label: 'Bildung', href: null },
  { label: 'Unterstützen', href: null },
];

export const intro = 'Am Nordrand des Segeberger Forstes zwischen Bad Bramstedt und Bad Segeberg liegt, eingebettet in die Landschaft der Osterau, die Naturerlebnisstätte Wildpark Eekholt. Seit über 50 Jahren zeigen wir heimische Tiere in ihrer natürlichen Umgebung und begeistern Menschen nachhaltig für die Natur.';

export const highlights = {
  wolfsmeile: 'Die Eekholter Wolfsmeile ist das Wolfsinformationszentrum des Landes Schleswig-Holstein: ein Rundweg mit Stationen zu Lebensweise, Rückkehr und Schutz des Wolfes, direkt am Wolfsgehege.',
  pflegestation: 'Seit fast 50 Jahren betreibt der Wildpark ehrenamtlich eine Vogelpflegestation, spezialisiert auf Greifvögel, Eulen, Störche und Kraniche. Gesund gepflegte Vögel werden auf der Flugwiese auf die Auswilderung vorbereitet.',
  pflegeTel: 'Wildvogel gefunden? Mo–So 7:30–16:00 Uhr (Okt.–Feb. ab 8:00) unter 04327 9923-0. Bitte vor dem Einfangen anrufen.',
  bildung: 'Als außerschulischer Lernort ist der Wildpark für Bildung für nachhaltige Entwicklung zertifiziert. Schwerpunkte: Biodiversität, Lebensräume und das Lebenselement Wasser, mit direkten Tierbegegnungen.',
  paten: 'Haben Sie ein Lieblingstier? Mit einer Tierpatenschaft übernehmen Sie für ein Jahr oder länger einen Anteil an seinen Pflegekosten.',
};

export const fmt = (n: number) => n === 0 ? 'frei' : n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

export function img(key: string, w: 640 | 1200 | 2000 = 1200) {
  const s: number[] = (sizes as Record<string, number[]>)[key] || [640];
  const best = s.filter((x) => x <= w).pop() ?? s[0];
  return `/img/${key}-${best}.webp`;
}
export function srcset(key: string) {
  const s: number[] = (sizes as Record<string, number[]>)[key] || [640];
  return s.map((x) => `/img/${key}-${x}.webp ${x}w`).join(', ');
}
