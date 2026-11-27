# Portfolio — sito statico

Sito personale bilingue (IT/EN), tema scuro, senza build step e senza dipendenze da installare.
È HTML + CSS + JavaScript puro: si apre facendo doppio clic su `index.html`.

```
portfolio/
├─ index.html              struttura della pagina
├─ assets/
│  ├─ css/style.css        tutto lo stile (i colori sono token in cima al file)
│  └─ js/
│     ├─ content.js        ← QUI stanno tutti i testi e i progetti
│     └─ main.js           logica: lingua, filtri, scheda progetto
├─ media/
│  ├─ placeholder/         segnaposto generati, da sostituire
│  └─ projects/<id>/       le tue immagini e i tuoi video, una cartella per progetto
└─ README.md
```

Il riferimento completo — modello dei contenuti, motore, stile, accessibilità —
sta in [DOCUMENTAZIONE.md](DOCUMENTAZIONE.md).

## Modificare i contenuti

Serve un solo file: **`assets/js/content.js`**.
Ogni testo si scrive in due lingue:

```js
summary: { it: "Testo italiano", en: "English text" }
```

Dentro il file trovi, nell'ordine: dati personali e link, testo di "Chi sono", competenze,
progetti, percorso, contatti, etichette dell'interfaccia.

## Aggiungere un progetto

1. Crea la cartella `media/projects/<id>/` e mettici dentro immagini e video.
2. In `content.js`, copia un blocco dentro `projects` e cambia `id`, titolo, testi e percorsi.
3. Ricarica la pagina. La card e i filtri compaiono da soli.

```js
{
  id: "mia-app",
  title: "Nome dell'app",
  year: "2025",
  platform: "Android 13 · Kotlin",
  tags: ["Android", "Kotlin"],            // generano i filtri in cima alla sezione
  summary:     { it: "Una riga.", en: "One line." },
  description: { it: ["Paragrafo."], en: ["Paragraph."] },
  highlights:  { it: ["Punto chiave"], en: ["Key point"] },
  cover: "media/projects/mia-app/cover.png",
  media: [
    { type: "image", src: "media/projects/mia-app/shot-01.png", alt: "Home" },
    { type: "video", src: "media/projects/mia-app/demo.mp4",
                     poster: "media/projects/mia-app/demo-poster.jpg" }
  ],
  links: [ { label: { it: "Play Store", en: "Play Store" }, url: "https://…" } ]
}
```

In `description` e `highlights` puoi usare `<strong>…</strong>` per evidenziare una parola.

## Formati dei media

| Cosa | Formato | Misura consigliata |
|---|---|---|
| Cover della card | PNG o WebP | 1600 × 1000 (16:10) |
| Screenshot | PNG o WebP | lato lungo 1600 px |
| Video | MP4, H.264 + AAC | 1080p, sotto i 20 MB |
| Poster del video | JPG | stesso fotogramma del video |

I video usano `preload="none"`: non vengono scaricati finché qualcuno non apre la scheda e
preme play. Registra le demo direttamente dal dispositivo:

```bash
adb shell screenrecord --bit-rate 6000000 /sdcard/demo.mp4
```

```bash
adb pull /sdcard/demo.mp4
```

Uno screenshot con `adb exec-out screencap -p > shot-01.png`.

## Vedere il sito in locale

Doppio clic su `index.html` basta. Se preferisci un server locale (comodo per provare da telefono
sulla stessa rete):

```bash
python -m http.server 8080
```

## Pubblicare

**GitHub Pages** — crea un repository, carica il contenuto di questa cartella nella radice, poi
_Settings → Pages → Deploy from a branch → main / (root)_. Il file `.nojekyll` è già presente e
serve a non far ignorare le cartelle a GitHub.

```bash
git init
git add .
git commit -m "Primo commit del portfolio"
git branch -M main
git remote add origin https://github.com/<utente>/<repo>.git
git push -u origin main
```

**Netlify** — trascina la cartella su app.netlify.com/drop: pubblica in pochi secondi, e puoi
collegare un dominio tuo.

Se il repository si chiama `<utente>.github.io` il sito sta su `https://<utente>.github.io`,
altrimenti su `https://<utente>.github.io/<repo>/`. I percorsi sono tutti relativi, quindi
funzionano in entrambi i casi.

## Personalizzare la grafica

I colori sono nove variabili in cima a `assets/css/style.css`, nel blocco `:root`. Cambiando
`--accent` cambia l'intero accento del sito. `--rail-w` è la larghezza della colonna di
navigazione, `--maxw` la larghezza massima del contenuto.

Il sito non usa cookie, non carica script di terze parti e non traccia i visitatori. L'unica
risorsa esterna è il foglio di stile dei font su Google Fonts: se vuoi un sito completamente
autonomo, scarica i font e sostituisci il `<link>` in `index.html` con un `@font-face` locale.
