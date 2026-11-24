// Seitenstruktur von Entwurf 1 (Schild): Abschnitte, Unterseiten, kurze Menütitel
export type NavItem = { label: string; href: string; children?: NavItem[] };
export type Section = { id: string; label: string; href: string; scene: string; teaser: string; groups: { label: string; items: NavItem[] }[] };

export const sections: Section[] = [
  { id: 'besuch', label: 'Besuch planen', href: '/v12/besuch/', scene: 'szene-besuch', teaser: 'Preise, Anfahrt, Essen und alles für Ihren Tag im Park.', groups: [
    { label: 'Eintritt', items: [
      { label: 'Preise und Öffnungszeiten', href: '/v12/besuch/' },
      { label: 'Jahreskarten', href: '/v12/besuch/jahreskarten/' },
      { label: 'Preise für Gruppen', href: '/v12/besuch/gruppenpreise/' },
    ] },
    { label: 'Anreise', items: [
      { label: 'Anfahrt', href: '/v12/besuch/anfahrt/' },
      { label: 'Mobil ohne Auto', href: '/v12/besuch/ohne-auto/' },
      { label: 'Lageplan und Rundwege', href: '/v12/besuch/lageplan/' },
      { label: 'Barrierefrei besuchen', href: '/v12/besuch/barrierefrei/' },
    ] },
    { label: 'Im Park', items: [
      { label: 'Öffentliche Fütterungen', href: '/v12/besuch/fuetterungen/' },
      { label: 'Flugvorführungen', href: '/v12/besuch/flugvorfuehrungen/' },
      { label: 'Essen und Grillen', href: '/v12/besuch/essen-und-grillen/' },
      { label: 'Spielen im Wildpark', href: '/v12/besuch/spielen/' },
      { label: 'Führungen', href: '/v12/besuch/fuehrungen/' },
      { label: 'Falkner für einen Tag', href: '/v12/besuch/falkner-fuer-einen-tag/' },
      { label: 'Lebenselement Wasser', href: '/v12/besuch/lebenselement-wasser/' },
      { label: 'Informationspavillons', href: '/v12/besuch/pavillon/' },
      { label: 'Rallyes', href: '/v12/besuch/rallyes/' },
      { label: 'Service im Wildpark', href: '/v12/besuch/service/' },
    ] },
    { label: 'Für Sie', items: [
      { label: 'Familien mit Kindern', href: '/v12/besuch/familien/' },
      { label: 'Kindergeburtstag', href: '/v12/besuch/kindergeburtstag/' },
      { label: 'Best Ager', href: '/v12/besuch/best-ager/' },
      { label: 'Familien- und Betriebsfeiern', href: '/v12/besuch/feiern/' },
      { label: 'Hochzeiten', href: '/v12/besuch/hochzeit/' },
      { label: 'Reiseveranstalter', href: '/v12/besuch/reiseveranstalter/' },
      { label: 'Häufige Fragen', href: '/v12/besuch/faq/' },
      { label: 'Downloads', href: '/v12/besuch/downloads/' },
      { label: 'Alle Besucherinfos', href: '/v12/besuch/informationen/' },
    ] },
  ] },
  { id: 'tiere', label: 'Unsere Tiere', href: '/v12/tiere/', scene: 'szene-tiere', teaser: 'Über 100 Arten, fast alle aus Schleswig-Holstein.', groups: [
    { label: 'Tiere', items: [
      { label: 'Alle Tiere von A bis Z', href: '/v12/tiere/' },
      { label: 'Wolf', href: '/v12/tiere/wolf/' },
      { label: 'Fischotter', href: '/v12/tiere/otter/' },
      { label: 'Wildkatze', href: '/v12/tiere/wildkatze/' },
      { label: 'Seeadler', href: '/v12/tiere/seeadler/' },
      { label: 'Weißes Rotwild', href: '/v12/tiere/weisses-rotwild/' },
    ] },
    { label: 'Tier- und Artenschutz', items: [
      { label: 'Überblick', href: '/v12/tiere/artenschutz/' },
      { label: 'Erhaltungszucht (EEP)', href: '/v12/tiere/artenschutz/eep/' },
      { label: 'Eulenschutz', href: '/v12/tiere/artenschutz/eulen/' },
      { label: 'Fischotterschutz', href: '/v12/tiere/artenschutz/fischotter/' },
      { label: 'Seeadlerschutz', href: '/v12/tiere/artenschutz/seeadler/' },
      { label: 'Amphibienschutz', href: '/v12/tiere/artenschutz/amphibien/' },
    ] },
  ] },
  { id: 'veranstaltungen', label: 'Veranstaltungen', href: '/v12/veranstaltungen/', scene: 'szene-events', teaser: '28 Termine übers Jahr.', groups: [] },
  { id: 'wolfsmeile', label: 'Wolfsmeile', href: '/v12/wolfsmeile/', scene: 'szene-wolfsmeile', teaser: 'Das Wolfsinformationszentrum des Landes.', groups: [
    { label: 'Wolfsmeile', items: [
      { label: 'Die Eekholter Wolfsmeile', href: '/v12/wolfsmeile/' },
      { label: 'Wolfsinformationszentrum', href: '/v12/wolfsmeile/wolfsinformation/' },
      { label: 'Förderer der Wolfsmeile', href: '/v12/wolfsmeile/sponsoren/' },
      { label: 'Wolfsmalwettbewerb', href: '/v12/wolfsmeile/malwettbewerb/' },
      { label: 'Steckbrief Wolf', href: '/v12/tiere/wolf/' },
    ] },
  ] },
  { id: 'vogelpflegestation', label: 'Vogelpflegestation', href: '/v12/vogelpflegestation/', scene: 'szene-vogelpflegestation', teaser: 'Ehrenamtliche Hilfe für verletzte Wildvögel.', groups: [
    { label: 'Vogelpflegestation', items: [
      { label: 'Wildvogel gefunden?', href: '/v12/vogelpflegestation/' },
      { label: 'Unsere Arbeit', href: '/v12/vogelpflegestation/arbeit/' },
      { label: 'Pflegestation unterstützen', href: '/v12/unterstuetzen/pflegestation/' },
    ] },
  ] },
  { id: 'bildung', label: 'Bildung', href: '/v12/bildung/', scene: 'szene-bildung', teaser: 'Außerschulischer Lernort, BNE-zertifiziert.', groups: [
    { label: 'Für Schulen und Gruppen', items: [
      { label: 'Bildung im Wildpark', href: '/v12/bildung/' },
      { label: 'Inhalte der Betreuung', href: '/v12/bildung/betreuung/' },
      { label: 'Ein Tag im Wildpark', href: '/v12/bildung/tagesgruppen/' },
      { label: 'Mehrere Tage im Wildpark', href: '/v12/bildung/projekttage/' },
      { label: 'Die Eekholter Bienenwelt', href: '/v12/bildung/bienenwelt/' },
      { label: 'Rallyes', href: '/v12/bildung/rallyes/' },
    ] },
    { label: 'Mehr', items: [
      { label: 'Fortbildungen', href: '/v12/bildung/fortbildungen/' },
      { label: 'Kindergeburtstage', href: '/v12/bildung/kindergeburtstage/' },
      { label: 'Sparkassenstiftung', href: '/v12/bildung/sparkassenstiftung/' },
    ] },
  ] },
  { id: 'unterstuetzen', label: 'Unterstützen', href: '/v12/unterstuetzen/', scene: 'szene-unterstuetzen', teaser: 'Patenschaften, Förderverein, Spenden.', groups: [
    { label: 'So helfen Sie', items: [
      { label: 'Überblick', href: '/v12/unterstuetzen/' },
      { label: 'Tierpatenschaften', href: '/v12/unterstuetzen/tierpatenschaften/' },
      { label: 'Fragen zu Patenschaften', href: '/v12/unterstuetzen/tierpatenschaften/faq/' },
      { label: 'Förderverein', href: '/v12/unterstuetzen/foerderverein/' },
      { label: 'GeschenkeWald', href: '/v12/unterstuetzen/geschenkewald/' },
      { label: 'Vogelpflegestation', href: '/v12/unterstuetzen/pflegestation/' },
    ] },
  ] },
  { id: 'ueber-uns', label: 'Über uns', href: '/v12/ueber-uns/', scene: 'szene-ueber-uns', teaser: 'Geschichte, Leitbild, Team und Partner.', groups: [
    { label: 'Der Wildpark', items: [
      { label: 'Geschichte', href: '/v12/ueber-uns/' },
      { label: 'Lebensräume', href: '/v12/ueber-uns/lebensraeume/' },
      { label: 'Leitbild', href: '/v12/ueber-uns/leitbild/' },
      { label: 'Klimaschutz', href: '/v12/ueber-uns/klimaschutz/' },
      { label: 'Team', href: '/v12/ueber-uns/team/' },
      { label: 'Freiwilliges Ökologisches Jahr', href: '/v12/ueber-uns/freiwilliges-jahr/' },
      { label: 'Partner', href: '/v12/ueber-uns/partner/' },
      { label: 'Links', href: '/v12/ueber-uns/links/' },
    ] },
  ] },
  { id: 'aktuelles', label: 'Aktuelles', href: '/v12/aktuelles/', scene: 'szene-aktuelles', teaser: 'Neues aus dem Park und offene Stellen.', groups: [
    { label: 'Neuigkeiten', items: [
      { label: 'Was ist los im Wildpark', href: '/v12/aktuelles/' },
      { label: 'Monatsinformation', href: '/v12/aktuelles/monatsinfo/' },
      { label: 'Fütterungen', href: '/v12/aktuelles/fuetterungen/' },
      { label: 'Nachwuchs auf der Flugwiese', href: '/v12/aktuelles/nachwuchs-flugwiese/' },
      { label: 'Lebensraumkorridore', href: '/v12/aktuelles/lebensraumkorridore/' },
      { label: 'Sparkassenstiftung', href: '/v12/aktuelles/sparkassenstiftung/' },
    ] },
    { label: 'Jobs', items: [
      { label: 'Technik', href: '/v12/aktuelles/jobs/' },
      { label: 'Tierpflege', href: '/v12/aktuelles/jobs/tierpflege/' },
      { label: 'Ausbildung Tierpfleger', href: '/v12/aktuelles/jobs/ausbildung/' },
      { label: 'Eingangsbereich', href: '/v12/aktuelles/jobs/kasse/' },
      { label: 'Aushilfen', href: '/v12/aktuelles/jobs/aushilfen/' },
    ] },
  ] },
  { id: 'aktive-ecke', label: 'Aktive Ecke', href: '/v12/aktive-ecke/', scene: 'szene-aktive-ecke', teaser: 'Für Kinder, Presse und Ihre Meinung.', groups: [
    { label: 'Mitmachen', items: [
      { label: 'Aktive Ecke', href: '/v12/aktive-ecke/' },
      { label: 'Kinderseite', href: '/v12/aktive-ecke/kinder/' },
      { label: 'Malvorlagen', href: '/v12/aktive-ecke/kinder/malvorlagen/' },
      { label: 'Spiele', href: '/v12/aktive-ecke/kinder/spiele/' },
      { label: 'Kindergeburtstag', href: '/v12/aktive-ecke/kinder/kindergeburtstage/' },
      { label: 'Ihre Meinung', href: '/v12/aktive-ecke/abstimmung/' },
      { label: 'Pressebereich', href: '/v12/aktive-ecke/presse/' },
    ] },
  ] },
  { id: 'service', label: 'Service', href: '/v12/kontakt/', scene: 'szene-service', teaser: '', groups: [
    { label: 'Service', items: [
      { label: 'Kontakt', href: '/v12/kontakt/' },
      { label: 'Gästebuch', href: '/v12/gaestebuch/' },
      { label: 'Newsletter', href: '/v12/newsletter/' },
      { label: 'Impressum', href: '/v12/impressum/' },
      { label: 'Datenschutz', href: '/v12/datenschutz/' },
      { label: 'Barrierefreiheit', href: '/v12/barrierefreiheit/' },
      { label: 'Inhaltsverzeichnis', href: '/v12/inhaltsverzeichnis/' },
    ] },
  ] },
];

export const sectionOf = (id: string) => sections.find((s) => s.id === id)!;
export const allItems = (s: Section) => s.groups.flatMap((g) => g.items);
export const labelFor = (href: string) => {
  for (const s of sections) for (const i of allItems(s)) if (i.href === href) return i.label;
  return null;
};
