# Documentazione tecnica — Sito portfolio

Riferimento completo del sito. Il [README](README.md) è la guida rapida: questo
documento spiega come è costruito, perché, e come modificarlo senza romperlo.

---

## 1. Cosa è, in una riga

Sito personale statico, bilingue italiano/inglese, tema scuro, pensato per
presentare applicativi con testo, screenshot e video. Nessun framework, nessun
build step, nessuna dipendenza da installare: tre file più le immagini.

### Scelte di fondo e loro motivo

| Scelta | Motivo |
|---|---|
| HTML/CSS/JS puri, niente framework | un portfolio deve aprirsi fra cinque anni senza ricostruire nulla; `npm install` invecchia, un file `.html` no |
| Contenuti separati dal codice in `content.js` | aggiornare il sito non deve richiedere di leggere il motore |
| Ogni testo è `{ it, en }` | il bilinguismo è una proprietà del dato, non una copia del sito |
| Rendering in JavaScript invece che HTML statico | una sola struttura serve entrambe le lingue; cambiare lingua non ricarica la pagina |
| Nessun font locale, solo Google Fonts | evita di versionare binari; sostituibile con `@font-face` in cinque minuti |
| Nessun cookie, nessuno script di terzi | niente banner di consenso da gestire |

---

## 2. Struttura dei file

```
portfolio/
├─ index.html              struttura statica della pagina, con i segnaposto
├─ assets/
│  ├─ css/style.css        tutto lo stile
│  └─ js/
│     ├─ content.js        dati: testi, progetti, link          ← si modifica questo
│     └─ main.js           motore: lingua, rendering, filtri, modale
├─ media/
│  ├─ placeholder/         dodici SVG segnaposto generati
│  └─ projects/<id>/       immagini e video dei progetti
├─ .nojekyll               impedisce a GitHub Pages di ignorare le cartelle
├─ README.md               guida rapida
└─ DOCUMENTAZIONE.md       questo file
```

`index.html` contiene le sezioni vuote e gli attributi `data-i18n`; tutto il
contenuto ci finisce dentro a runtime. Aprendo il sorgente non si trovano i
testi: stanno in `content.js`.

---

## 3. Il modello dei contenuti (`content.js`)

Un unico oggetto globale `CONTENT`. Ogni testo visibile è una stringa o una
coppia `{ it, en }`; il motore accetta entrambe le forme, quindi un valore che
non va tradotto (un nome proprio, un anno) si scrive come stringa semplice.

### 3.1 `profile`

| Campo | Tipo | Uso |
|---|---|---|
| `name` | stringa | titolo dell'hero e nome nel rail |
| `shortRole` | `{it,en}` | sottotitolo del rail |
| `eyebrow` | `{it,en}` | riga in maiuscoletto sopra il nome |
| `role` | `{it,en}` | riga sotto il nome |
| `tagline` | `{it,en}` | paragrafo dell'hero |
| `email` | stringa | sezione contatti e pulsante Copia |
| `facts` | array di `{label:{it,en}, value:{it,en}}` | griglia di dati sotto l'hero |
| `links` | array di `{label, url}` | rail laterale **e** sezione contatti |

`facts` si adatta a qualsiasi numero di voci: la griglia è `auto-fit` con
colonne da 190 px minimo.

### 3.2 `about`

```js
about: { it: ["<p>", "<p>"], en: ["<p>", "<p>"] }
```

Array di paragrafi, uno per elemento. **Il contenuto è inserito come HTML**
(`innerHTML`), quindi `<strong>`, `<em>` e `<a>` funzionano. È sicuro perché il
contenuto lo scrivi tu; non prendere mai questi testi da una fonte esterna.

### 3.3 `stack`

```js
stack: [ { group: {it,en}, items: ["Java", "Kotlin"] } ]
```

Un riquadro per gruppo, una pastiglia per elemento. Gli `items` non sono
tradotti: sono nomi di tecnologie.

### 3.4 `projects` — il cuore

```js
{
  id: "mia-app",                       // univoco, usato come chiave
  title: "Nome",                       // non tradotto
  year: "2025",
  platform: "Android 13 · Kotlin",     // riga meta della card
  tags: ["Android", "Kotlin"],         // generano i filtri automaticamente
  summary:     { it: "una riga", en: "one line" },
  description: { it: ["par1", "par2"], en: [...] },   // HTML ammesso
  highlights:  { it: ["punto"], en: [...] },          // HTML ammesso
  cover: "media/projects/mia-app/cover.png",
  media: [
    { type: "image", src: "...", alt: "Home" },
    { type: "video", src: "...mp4", poster: "...jpg" }
  ],
  links: [ { label: {it,en}, url: "https://…" } ]
}
```

| Campo | Obbligatorio | Note |
|---|---|---|
| `id` | sì | deve essere univoco |
| `title` | sì | |
| `year`, `platform` | no | se assenti la riga meta si accorcia da sola |
| `tags` | no | senza tag il progetto compare solo sotto "Tutti" |
| `summary` | sì | testo della card |
| `description` | no | paragrafi della scheda |
| `highlights` | no | elenco puntato della scheda |
| `cover` | no | senza cover la card mostra un riquadro vuoto |
| `media` | no | con meno di due elementi le miniature spariscono |
| `links` | no | pulsanti in fondo alla scheda |

**Il badge "Video"** sulla card compare da solo se almeno un elemento di `media`
ha `type: "video"`.

**Le miniature** di un video usano il suo `poster`; se manca, ripiegano sulla
`cover` del progetto.

### 3.5 `experience` e `contact`

```js
experience: [ { period, role:{it,en}, org:{it,en}, text:{it,en} } ]
contact:    { text: {it,en} }
```

`period` accetta sia una stringa sia una coppia tradotta (serve per "Prima" /
"Earlier").

### 3.6 `ui`

Tutte le etichette dell'interfaccia: navigazione, pulsanti, messaggi. Le chiavi
sono referenziate da `index.html` con `data-i18n="ui.nav.projects"`, cioè un
percorso puntato dentro `CONTENT`. Aggiungendo una chiave qui e l'attributo
corrispondente nell'HTML, la traduzione funziona senza toccare `main.js`.

`ui.footer` contiene il segnaposto `{year}`, sostituito con l'anno corrente.

---

## 4. Il motore (`main.js`)

Tutto dentro una IIFE: nessuna variabile globale a parte `CONTENT`.

### 4.1 Utilità

| Funzione | Cosa fa |
|---|---|
| `t(value)` | restituisce `value[lang]`, o `value` se è una stringa, o `value.it` come ripiego |
| `path(obj, "a.b.c")` | risolve un percorso puntato, restituisce `null` se manca |
| `el(tag, class, text)` | crea un elemento; usa `textContent`, quindi non interpreta HTML |
| `$(sel)` | `document.querySelector` |

La distinzione fra `el()` (testo) e `innerHTML` (paragrafi di `about`,
`description`, `highlights`) è deliberata: solo i tre campi documentati come
"HTML ammesso" sono interpretati.

### 4.2 Ciclo di rendering

`renderAll()` chiama in ordine: `applyLabels`, `renderFacts`, `renderLinks`,
`renderAbout`, `renderStack`, `renderFilters`, `renderProjects`,
`renderExperience`, `renderContact`.

Viene invocata all'avvio e a ogni cambio lingua. Non c'è rendering
incrementale: ricostruire l'intera pagina costa meno di un millisecondo e
elimina un'intera classe di bug di sincronizzazione.

### 4.3 Lingua

`setLang(next)` aggiorna la variabile, scrive in `localStorage` sotto la chiave
`portfolio-lang`, richiama `renderAll()` e — se una scheda progetto è aperta —
la riapre nella nuova lingua. La preferenza sopravvive alla chiusura del
browser. Ogni accesso a `localStorage` è in `try/catch`: in navigazione privata
può sollevare eccezione, e il sito deve funzionare lo stesso.

`applyLabels()` imposta anche `document.documentElement.lang`, che serve agli
screen reader e alla sillabazione del browser.

### 4.4 Filtri

`allTags()` raccoglie i tag di tutti i progetti in ordine di prima apparizione;
`renderFilters()` genera un pulsante "Tutti" più uno per tag. Lo stato è la
variabile `activeFilter` (`null` = tutti). Ogni click rigenera filtri e griglia.
I filtri non sono nell'HTML: aggiungendo un tag a un progetto, il pulsante
compare da solo.

### 4.5 Scheda progetto

| Funzione | Ruolo |
|---|---|
| `openProject(project)` | riempie meta, titolo, paragrafi, punti, tag, link e miniature; mostra il primo media; blocca lo scroll del body; sposta il fuoco sul pulsante di chiusura |
| `showMedia(project, i)` | sostituisce il contenuto del palco con `<img>` o `<video>` e aggiorna lo stato `aria-pressed` delle miniature |
| `closeModal()` | mette in pausa un eventuale video, sblocca lo scroll, restituisce il fuoco all'elemento che aveva aperto la scheda |
| `stepMedia(delta)` | navigazione circolare con le frecce |

I video hanno `preload="none"`: il file non viene scaricato finché non si preme
play. Su una pagina con quattro demo da 15 MB la differenza è tutta qui.

### 4.6 Scrollspy

`setupScrollSpy()` usa un `IntersectionObserver` con
`rootMargin: "-45% 0px -50% 0px"`: la sezione è considerata attiva quando
attraversa una fascia sottile al centro dello schermo, invece che quando entra
nel viewport. Senza quel margine, con sezioni alte, due voci risulterebbero
attive insieme.

### 4.7 Copia e-mail

Prova `navigator.clipboard.writeText`. Se fallisce — o se l'API non esiste,
come su `file://` in alcuni browser — seleziona il testo dell'indirizzo, così
l'utente può copiarlo con la tastiera. Il pulsante mostra "Copiata" per 1,8
secondi e torna indietro.

---

## 5. Lo stile (`style.css`)

### 5.1 Token

Tutti i colori e le misure strutturali sono variabili CSS in `:root`:

| Token | Valore | Uso |
|---|---|---|
| `--bg` | `#0b0f14` | fondo pagina, nero con bias blu |
| `--bg-deep` | `#070a0e` | rail e superfici incassate |
| `--surface` / `--surface-2` | `#131a22` / `#18212b` | schede, pulsanti |
| `--line` / `--line-soft` | `#202b36` / `#18222c` | bordi e separatori |
| `--text` / `--muted` / `--dim` | `#dce4ee` / `#8494a6` / `#5d6b7c` | tre livelli di testo |
| `--accent` | `#e8a33d` | ambra, unico accento |
| `--rail-w` | `244px` | larghezza colonna di navigazione |
| `--gutter` | `clamp(20px, 5vw, 64px)` | margine laterale |
| `--maxw` | `1080px` | larghezza massima del contenuto |

Cambiando `--accent` cambia l'intero accento del sito: pulsanti, numeri di
sezione, evidenziazione della navigazione, bordo delle card al passaggio.

### 5.2 Convenzioni

Nomi in stile BEM ridotto: `.card`, `.card__media`, `.card__title`. I
modificatori sono `--`: `.btn--primary`, `.section--hero`. Nessun `!important`,
nessun selettore più profondo di due livelli.

### 5.3 Punto di rottura

Uno solo: **900 px**. Sotto, il rail diventa una barra orizzontale con
navigazione a pastiglie scorrevoli, `main` perde il margine sinistro, la
timeline passa a una colonna, la scheda progetto va a tutto schermo.

### 5.4 Il reticolo di fondo

`body::before` sovrappone tre livelli: un alone radiale ambra in alto a destra e
due gradienti lineari che formano una griglia da 88 px. È `position: fixed` e
`pointer-events: none`, quindi non intercetta i click e non scorre. Opacità 0,5:
deve leggersi come texture, non come contenuto.

---

## 6. Accessibilità

- **Link di salto** al contenuto, visibile solo quando riceve il fuoco.
- **Fuoco visibile** ovunque: `:focus-visible` con contorno ambra e offset.
- **La scheda progetto** è `role="dialog"` con `aria-modal`, sposta il fuoco
  all'apertura e lo restituisce alla chiusura, si chiude con Esc.
- **Le card dei progetti sono `<button>`**, non `<div>` con `onclick`: sono
  raggiungibili con Tab e si attivano con Invio o Spazio.
- **Le miniature** portano `aria-pressed` e un `aria-label` descrittivo.
- **Il grafico non esiste**, ma le immagini decorative hanno `alt=""` e quelle
  informative l'alt reale preso da `media[].alt`.
- **I filtri** sono pulsanti con `aria-pressed`, non link.
- Lo switch di lingua è un `role="group"` con due pulsanti `aria-pressed`.

Non verificato: contrasto misurato con uno strumento, e prova con screen reader
reale. La tavolozza è costruita per stare sopra 4.5:1 sul testo corrente, ma è
una stima, non una misura.

---

## 7. Media

| Cosa | Formato | Misura |
|---|---|---|
| Cover card | PNG o WebP | 1600 × 1000 (16:10) |
| Screenshot | PNG o WebP | lato lungo 1600 px |
| Video | MP4 H.264 + AAC | 1080p, sotto i 20 MB |
| Poster video | JPG | stesso fotogramma del video |

Tutte le immagini nella griglia hanno `loading="lazy"`. I dodici SVG in
`media/placeholder/` sono generati a mano e servono a non lasciare mai il sito
con riquadri rotti: vanno sostituiti, non cancellati, finché ci sono progetti
che li referenziano.

Cattura da dispositivo Android:

```bash
adb exec-out screencap -p > shot-01.png
```

```bash
adb shell screenrecord --bit-rate 6000000 --time-limit 30 /sdcard/demo.mp4
```

---

## 8. Ricette

### Aggiungere un progetto

1. `media/projects/<id>/` con le immagini e il video.
2. Copia un blocco dentro `projects` in `content.js`, cambia `id`, testi e percorsi.
3. Ricarica. Card e filtri compaiono da soli.

### Aggiungere una sezione

1. In `index.html`, una `<section class="section" id="nuova">` con titolo
   `<h2 class="section__title">` e numero progressivo.
2. Una voce `<a href="#nuova" data-nav data-i18n="ui.nav.nuova">` nel rail.
3. `ui.nav.nuova` in `content.js`.
4. Se la sezione ha contenuto dinamico, una `renderNuova()` in `main.js` e la
   sua chiamata dentro `renderAll()`.

### Aggiungere una terza lingua

1. Aggiungi la chiave (es. `fr`) a ogni oggetto tradotto in `content.js`.
2. Aggiungi un pulsante `data-lang="fr"` nello switch in `index.html`.
3. In `main.js`, estendi il controllo `saved === "it" || saved === "en"`.

Il resto funziona già: `t()` non conosce l'elenco delle lingue.

### Cambiare la tavolozza

Solo il blocco `:root`. Per passare a un tema chiaro servono anche i valori di
`--text`/`--muted` invertiti e una revisione del reticolo di fondo, che su
sfondo chiaro va alleggerito.

---

## 9. Pubblicazione

**GitHub Pages** — carica il contenuto della cartella nella radice del
repository, poi _Settings → Pages → Deploy from a branch → main / (root)_. Il
file `.nojekyll` è già presente.

```bash
git init
git add .
git commit -m "Primo commit del portfolio"
git branch -M main
git remote add origin https://github.com/<utente>/<repo>.git
git push -u origin main
```

**Netlify** — trascina la cartella su `app.netlify.com/drop`.

Tutti i percorsi sono relativi, quindi il sito funziona sia in radice
(`utente.github.io`) sia in sottocartella (`utente.github.io/repo/`).

---

## 10. Prestazioni e privacy

Il peso della pagina, esclusi i media, è sotto i 60 KB non compressi. L'unica
richiesta esterna è il foglio di stile dei font su `fonts.googleapis.com`: per
un sito completamente autonomo, scarica i file `.woff2`, mettili in
`assets/fonts/` e sostituisci il `<link>` con delle regole `@font-face`.

Nessun cookie, nessun `localStorage` oltre alla preferenza di lingua, nessuna
analitica, nessun tracciamento. Non serve un banner di consenso.

---

## 11. Limiti noti

- **Anteprima e indicizzazione sono in italiano.** I tag Open Graph in
  `<head>` e l'immagine `media/og-image.jpg` (1200×630) sono fissi: chi
  condivide il link vede sempre la versione italiana. `sitemap.xml` elenca la
  sola pagina principale: va aggiornata (`lastmod`) quando i contenuti cambiano
  molto, e va estesa se in futuro si creano pagine separate.
- **Il titolo della pagina non cambia con la lingua.** È statico
  nell'`<head>`.
- **Nessun fallback senza JavaScript.** A JS disattivato la pagina resta vuota.
  È una conseguenza accettata della scelta di generare i contenuti a runtime.
- **La griglia dei progetti non ha impaginazione.** Oltre una ventina di
  progetti conviene introdurla.
- **Contrasto e screen reader non misurati** (vedi sezione 6).
