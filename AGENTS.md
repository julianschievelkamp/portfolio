# AGENTS.md

## Projekt-Kontext

- **Beschreibung:** Eine Portfolio-Website zur Präsentation von künstlerischen Bildern und Videos.
- **Typ:** Reines Frontend-Projekt mit statischem HTML-Pre-rendering (kein Live-Backend, keine Datenbank, keine Benutzereingaben).
- **Tech-Stack:** React, TypeScript (ES6), Vike (für SSR/Pre-rendering), Styled Components (für das Styling).
- **Paketmanager:** yarn

## Projektstruktur & Dateipfade

- `./public` – Konfigurationsdateien für das Deployment (z. B. `CNAME`) und globale Browser-Ressourcen (z. B. `favicon.ico`).
- `./src` – Das Hauptverzeichnis, das alle Komponenten, Layouts, Funktionen und Inhalte der Website enthält.
- `./src/assets` – **WICHTIG:** Dieser Ordner ist für den Agenten tabu (weder lesen noch editieren/verändern). Er enthält die produktiven Medien, Icons und Fonts des Projekts.
- `./src/data` – Enthält statische Inhalte, Texte und Datenobjekte der Website (z. B. Bild-Metadaten).
- `./src/elements` – Enthält alle wiederverwendbaren Komponenten, Layout-Bausteine und UI-Elemente der Website. Zugehörige Test-Dateien werden direkt im jeweiligen Komponenten-Ordner abgelegt.
- `./src/hooks` – Wiederverwendbare, benutzerdefinierte React-Hooks (Custom Hooks) zur Kapselung von Zustand und Logik abseits der UI-Komponenten.
- `./src/pages` – Enthält die Routing-Einstiegspunkte für Vike.
- `./src/styles` – Enthält globale Styling-Definitionen und Variablen.

## Umgebung & Befehle

- **Abhängigkeiten installieren:** `yarn install`
- **Entwicklungsserver starten:** `yarn start`
- **Projekt bauen (Pre-rendering):** `yarn build`
- **Code-Prüfung & Formatierung:** `yarn lint`
- **Tests ausführen:** `yarn test`

## Kern-Anweisungen für den KI-Agenten

### 1. Barrierefreiheit (A11Y / WCAG 2.1 AA)

- **Bilder:** Jedes `<img>`-Element und jede visuelle Komponente muss ein beschreibendes `alt`-Attribut besitzen. Verwende niemals generische Alt-Texte wie „Bild“ oder „Foto“.
- **Semantisches HTML:** Vermeide unnötige `<div>`-Verschachtelungen („Div-Suppe“). Nutze stattdessen `<main>`, `<section>`, `<article>`, `<header>` und `<footer>`, wo es semantisch sinnvoll ist. Dies gilt auch bei der Definition von Styled Components (z. B. `styled.main` statt `styled.div`).
- **Interaktive Elemente:** Stelle sicher, dass alle benutzerdefinierten interaktiven Komponenten vollständig per Tastatur bedienbar sind und die korrekten `aria-*`-Attribute besitzen.
- **Kontrast & Text:** Achte auf ein hohes Kontrastverhältnis bei Textelementen, die über Bildern liegen. Der Text darf bei einer Browser-Skalierung (Zoom) nicht abgeschnitten werden.

### 2. Suchmaschinenoptimierung (SEO)

- **Vike Prerendering:** Da Vike für das HTML-Pre-rendering genutzt wird, muss jeglicher Seitencode so geschrieben sein, dass er fehlerfrei zu statischem HTML gerendert werden kann. Vermeide ungeprüfte Zugriffe auf Browser-APIs (wie `window` oder `document`) im globalen Scope von Komponenten.
- **Metadaten:** Nutze die Vike-Konfiguration oder seitenspezifische Export-Mechanismen (z. B. `export const metadata`), um Titel und Beschreibungen pro Seite sauber für den Build-Prozess bereitzustellen.
- **Überschriften:** Halte eine strikte, logische Hierarchie der Überschriften ein (`<h1>` bis `<h6>`). Es darf nur genau eine `<h1>` pro Ansicht/Seite existieren.
- **Performance:** Halte die Dateigrößen von Assets so gering wie möglich. Nutze Lazy Loading (verzögertes Laden) für Bilder, die sich außerhalb des ersten sichtbaren Bereichs (below the fold) befinden.
- **Bild-Kontext:** Biete Suchmaschinen-Crawlern Kontext für hochauflösende Kunstwerke, indem du Bilder semantisch einbettest (z. B. mittels `<figure>` und `<figcaption>`).

### 3. Clean Code & Architektur

- **Sprachregelungen (Code & Oberfläche):** Der gesamte Quellcode (Variablen, Funktionen, Komponenten- und Dateinamen) sowie alle für den Endnutzer sichtbaren Texte auf der Website müssen in **englischer Sprache** verfasst sein.
- **Code-Kommentare:** Alle im Code hinterlassenen Kommentare, Erklärungen oder Dokumentationen müssen in **deutscher Sprache** verfasst werden.
- **TypeScript:** Erzwinge eine strikte Typisierung. Vermeide den Typ `any` unter allen Umständen. Nutze klare Interfaces oder Typen für Komponenten-Props und transiente Props in Styled Components (z. B. `$isActive`).
- **Styling (Styled Components):** Nutze Styled Components für das gesamte Komponenten-Styling. Halte Stile wartbar, indem du globale Themes oder Variablen für Farben und Abstände verwendest. Benenne Styled Components sprechend, um die Lesbarkeit des JSX-Baums zu wahren.
- **Komponenten-Design:** Halte React-Komponenten klein, funktional, wiederverwendbar und fokussiert auf eine einzige Aufgabe (Single-Purpose). Bevorzuge Custom Hooks zur Trennung von Logik und UI.
- **Code-Stil:** Halte dich strikt an die bestehenden ESLint- und Prettier-Konfigurationen. Führe vor dem Abschluss einer Aufgabe immer `yarn lint` aus.
- **Unit-Tests (Co-location):** Jede neue Kernkomponente muss durch einen Unit-Test abgesichert werden. Die Test-Datei muss zwingend im selben Ordner wie die Komponente selbst liegen (Co-location). Führe vor dem Abschluss einer Aufgabe immer `yarn test` aus.

### 4. Leitplanken & Einschränkungen (Guardrails)

- **WICHTIG:** Der Ordner `./src/assets` ist für den Agenten tabu (weder lesen noch editieren/verändern).
- Erst verstehen, dann planen, dann ändern. Lege bei Aufgaben, die mehrere Dateien betreffen, zuerst einen Plan vor.
- Neue Abhängigkeiten (yarn-Pakete) dürfen nicht ohne Rückfrage installiert werden.
- Dateien dürfen nicht ohne Rückfrage gelöscht werden.
- Die Git-Historie darf nicht ohne Rückfrage verändert werden.
- Implementiere oder installiere niemals Backend-Logik oder Datenbank-Anbindungen.
- Füge keine komplexen Formulare oder Eingabefelder hinzu, es sei denn, dies wird explizit verlangt.
- Die visuelle und künstlerische Integrität des Portfolios muss bei jeder Änderung der Struktur oder des Layouts gewahrt bleiben.
