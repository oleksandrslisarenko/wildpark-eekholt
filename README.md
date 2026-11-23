# Wildpark Eekholt – Redesign

Statische Website mit [Astro](https://astro.build). Läuft auf Vercel und auf jedem klassischen Webhosting (z. B. One.com): `npm run build` erzeugt den Ordner `dist/`, der per FTP hochgeladen werden kann.

- `/` – Übersicht der drei Designrichtungen
- `/v1/`, `/v2/`, `/v3/` – je Startseite, Tierseite, Preise, Veranstaltungen
- Inhalte: `src/data/` (1:1 von wildpark-eekholt.de übernommen)
- Suche: Pagefind (Index wird beim Build erzeugt)
- Formulare: FormSubmit (`src/scripts/forms.ts`)

```
npm install
npm run dev     # lokale Vorschau
npm run build   # Build + Suchindex
```
