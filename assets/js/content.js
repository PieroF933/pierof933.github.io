/* ─────────────────────────────────────────────────────────────
   CONTENUTI DEL SITO — è l'unico file che devi modificare.

   Ogni testo si scrive come  { it: "italiano", en: "english" }.
   I percorsi dei file (immagini, video) sono relativi a index.html.

   Per aggiungere un progetto: copia un blocco dentro `projects`
   e cambia id, testi e percorsi dei media.
   ───────────────────────────────────────────────────────────── */

const CONTENT = {

  /* ── Dati personali ─────────────────────────────────────── */
  profile: {
    name: "Piero Ferrulli",
    shortRole: { it: "Sviluppatore Android", en: "Android Developer" },
    eyebrow: { it: "Android · Kotlin · Java · C# / .NET · Full stack", en: "Android · Kotlin · Java · C# / .NET · Full stack" },
    role: {
      it: "Sviluppatore Android con competenze full stack e C#/.NET",
      en: "Android developer with full-stack and C#/.NET skills"
    },
    tagline: {
      it: "Sviluppo applicazioni Android in Kotlin e Java, dall'interfaccia al livello di comunicazione. Alle spalle ho una formazione full stack, con C#/.NET e PHP/Laravel, che mi permette di seguire un progetto anche fuori dall'app: il backend, i servizi, gli strumenti che servono per costruirla e collaudarla.",
      en: "I build Android apps in Kotlin and Java, from the interface down to the communication layer. I also have a full-stack background, with C#/.NET and PHP/Laravel, which lets me follow a project beyond the app itself: the backend, the services, the tools needed to build and test it."
    },
    email: "pieroferrulli933@gmail.com",
    facts: [
      { label: { it: "Ruolo", en: "Role" },       value: { it: "Sviluppatore Android", en: "Android Developer" } },
      { label: { it: "Sede", en: "Based in" },    value: { it: "Puglia, Italia", en: "Apulia, Italy" } },
      { label: { it: "Ambito", en: "Focus" },     value: { it: "Android, full stack, C#/.NET", en: "Android, full stack, C#/.NET" } },
      { label: { it: "Disponibilità", en: "Availability" }, value: { it: "Aperto a nuove opportunità", en: "Open to new opportunities" } }
    ],
    // Link mostrati nel rail laterale e nella sezione contatti.
    links: [
      { label: "GitHub",   url: "https://github.com/PieroF933" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/piero-ferrulli-web-developer" }
    ]
  },

  /* ── Chi sono ───────────────────────────────────────────── */
  about: {
    it: [
      "Sono uno <strong>sviluppatore Android</strong>: scrivo app in Kotlin e Java, con Jetpack Compose o con le View classiche, e mi occupo di tutto il percorso, dalla comunicazione con il resto del sistema fino all'ultima schermata.",
      "Vengo da una formazione <strong>full stack</strong>: un bootcamp di sviluppo web con PHP e Laravel e un percorso su <strong>C# e .NET</strong>. Mi serve ogni giorno anche su Android, perché un'app quasi mai lavora da sola: c'è un server, un protocollo, uno strumento da costruire per provarla.",
      "Accanto al lavoro porto avanti progetti personali in Kotlin, Flutter e Python, che trovi qui sotto. Prima ancora ho lavorato nell'assistenza informatica, hardware e software.",
      "Mi interessa il software che dura: codice leggibile, dipendenze poche e motivate, comportamento prevedibile anche quando le condizioni intorno cambiano."
    ],
    en: [
      "I'm an <strong>Android developer</strong>: I write apps in Kotlin and Java, with Jetpack Compose or classic Views, and I cover the whole path, from talking to the rest of the system up to the last screen.",
      "My background is <strong>full stack</strong>: a web development bootcamp with PHP and Laravel and a course on <strong>C# and .NET</strong>. It helps me every day on Android too, because an app is rarely alone: there is a server, a protocol, a tool to build in order to test it.",
      "Alongside work I build personal projects in Kotlin, Flutter and Python, which you'll find below. Before that I worked in IT support, both hardware and software.",
      "I care about software that lasts: readable code, few and justified dependencies, predictable behaviour even when the conditions around it change."
    ]
  },

  /* ── Competenze ─────────────────────────────────────────── */
  stack: [
    {
      group: { it: "Linguaggi", en: "Languages" },
      items: ["Java", "Kotlin", "C#", "Python", "Dart", "Swift", "PHP", "JavaScript", "SQL", "XML"]
    },
    {
      group: { it: "Android e multipiattaforma", en: "Android and cross-platform" },
      items: ["Android SDK", "Activity & Fragment", "Jetpack Compose", "Flutter",
              "RecyclerView / Adapter", "Service & foreground service",
              "Media3 / ExoPlayer", "SQLite", "Material Components", "Risorse responsive", "MultiDex"]
    },
    {
      group: { it: "Comunicazione & hardware", en: "Communication & hardware" },
      items: ["Socket TCP/IP", "Protocolli binari", "ONVIF", "RTSP / MJPEG", "USB & RS485", "Kiosk / launcher", "Linphone"]
    },
    {
      group: { it: "Strumenti", en: "Tools" },
      items: ["Android Studio", "Gradle", "Git", "GitHub", "ADB", "Wireshark", "Figma"]
    },
    {
      group: { it: "Altre competenze", en: "Other skills" },
      items: [".NET", "Laravel", "BPM / Jamio (no-code)", "Scrum", "Assistenza hardware e software"]
    }
  ],

  /* ── Progetti ───────────────────────────────────────────── */
  /* cover  → immagine della card (16:10 consigliato)
     media  → galleria della scheda: { type: "image" | "video", src, poster?, alt? } */
  projects: [
    {
      id: "domus",
      title: "Domus",
      year: "2026",
      platform: "Android 8+ · Kotlin · Jetpack Compose",
      tags: ["Android", "Kotlin", "UI", "Domotica"],
      summary: {
        it: "App per controllare una casa intelligente, scritta interamente in Jetpack Compose: ambienti, luci, tapparelle, scenari e termostato, con un'interfaccia che si adatta da sola al telefono e al tablet.",
        en: "An app for controlling a smart home, written entirely in Jetpack Compose: rooms, lights, blinds, scenes and thermostat, with an interface that adapts on its own to phones and tablets."
      },
      description: {
        it: [
          "È il progetto con cui mostro come imposto un'app Android moderna. L'interfaccia è tutta in <strong>Compose</strong>, senza un solo layout XML, e i dati seguono un percorso unico e prevedibile: lo stato è immutabile e scende verso le schermate, mentre le azioni dell'utente risalgono come eventi.",
          "I dati dell'impianto oggi sono simulati in memoria e cambiano ogni pochi secondi, ma l'unica classe che sa da dove arrivano è il <strong>repository</strong>. Collegare un impianto vero — un socket verso una centrale, MQTT o un'API REST — vuol dire riscrivere quella classe, senza toccare nient'altro."
        ],
        en: [
          "This is the project I use to show how I set up a modern Android app. The interface is all <strong>Compose</strong>, without a single XML layout, and data follows one predictable path: state is immutable and flows down to the screens, while user actions travel back up as events.",
          "The home's data is simulated in memory for now and changes every few seconds, but the only class that knows where it comes from is the <strong>repository</strong>. Connecting a real system — a socket to a control unit, MQTT or a REST API — means rewriting that class and touching nothing else."
        ]
      },
      highlights: {
        it: [
          "Compose e Material 3, con i colori presi dallo sfondo del dispositivo da Android 12 in poi",
          "Stato gestito con StateFlow e flusso dei dati unidirezionale",
          "Layout adattivo con WindowSizeClass: barra in basso sul telefono, colonna laterale sul tablet",
          "Quadrante del termostato e grafico dei consumi disegnati a mano su Canvas",
          "Tema chiaro e scuro, e nessuna dipendenza oltre ad AndroidX"
        ],
        en: [
          "Compose and Material 3, with colours taken from the device wallpaper on Android 12 and later",
          "State handled with StateFlow and a one-way data flow",
          "Adaptive layout with WindowSizeClass: bottom bar on phones, side rail on tablets",
          "Thermostat dial and consumption chart hand-drawn on Canvas",
          "Light and dark theme, and no dependencies beyond AndroidX"
        ]
      },
      cover: "media/projects/domus/cover.jpg",
      media: [
        { type: "video", src: "media/projects/domus/demo.mp4", poster: "media/projects/domus/demo-poster.jpg" },
        { type: "image", src: "media/projects/domus/shot-casa.jpg", alt: "Casa: riepilogo, consumi, scenari e ambienti" },
        { type: "image", src: "media/projects/domus/shot-stanza.jpg", alt: "Soggiorno: luci, tapparella e termostato" },
        { type: "image", src: "media/projects/domus/shot-scenari.jpg", alt: "Scenari" },
        { type: "image", src: "media/projects/domus/shot-scuro.jpg", alt: "Casa in tema scuro" }
      ],
      links: []
    },

    {
      id: "bottega",
      title: "Bottega",
      year: "2026",
      platform: "Android 8+ · Kotlin · Jetpack Compose",
      tags: ["Android", "Kotlin", "UI", "Grafica"],
      summary: {
        it: "Vetrina di oggetti per la casa in Jetpack Compose, dove i prodotti non sono fotografie ma disegni vettoriali e la griglia ricalcola le colonne in base allo spazio davvero disponibile.",
        en: "A home-goods showcase in Jetpack Compose, where products are vector drawings rather than photos and the grid works out its columns from the space actually available."
      },
      description: {
        it: [
          "Un progetto pensato per due cose: <strong>un layout che si adatta a qualsiasi schermo</strong> e <strong>una grafica curata</strong>. Ci sono dodici oggetti, quattro categorie, ricerca, preferiti e carrello, ma niente server, account o pagamenti: il catalogo sta nel codice e l'app non chiede nessun permesso.",
          "Ogni prodotto è una funzione che disegna su una <strong>Canvas</strong>. Lo stesso disegno funziona come miniatura in una griglia a sei colonne e come illustrazione a tutto schermo, sempre nitido; e siccome il colore è solo un parametro, cambiare tinta diventa una transizione animata invece di uno scatto fra due immagini.",
          "Le regole di layout — quante colonne, dove va la navigazione, quanto è largo il pannello di dettaglio — stanno in un <strong>modulo Kotlin puro</strong>, separato da Android. Così si collaudano con una tabella di larghezze invece che ruotando un telefono, ed è proprio un test a aver trovato un difetto reale: passando da 599 a 600 dp la griglia perdeva una colonna."
        ],
        en: [
          "A project built around two things: <strong>a layout that adapts to any screen</strong> and <strong>careful graphics</strong>. There are twelve items, four categories, search, favourites and a cart, but no server, accounts or payments: the catalogue lives in the code and the app asks for no permissions.",
          "Each product is a function that draws on a <strong>Canvas</strong>. The same drawing works as a thumbnail in a six-column grid and as a full-screen illustration, always sharp; and since colour is just a parameter, switching tint becomes an animated transition instead of a jump between two images.",
          "The layout rules — how many columns, where navigation goes, how wide the detail pane is — live in a <strong>pure Kotlin module</strong>, separate from Android. That way they are tested against a table of widths instead of by rotating a phone, and it was a test that found a real bug: going from 599 to 600 dp the grid lost a column."
        ]
      },
      highlights: {
        it: [
          "Prodotti disegnati su Canvas: nessuna immagine, e l'intero catalogo pesa meno di una foto",
          "Colonne calcolate sulla larghezza reale, non su tre fasce fisse",
          "Navigazione che cambia con lo schermo: barra in basso, binario laterale o cassetto, con il dettaglio affiancato oltre 1200 dp",
          "Prezzi in centesimi interi e con formato fisso, uguale qualunque sia la lingua del telefono",
          "40 test sul modulo del catalogo, di cui due test di proprietà"
        ],
        en: [
          "Products drawn on Canvas: no images, and the whole catalogue weighs less than one photo",
          "Columns computed from the real width, not from three fixed size classes",
          "Navigation that changes with the screen: bottom bar, side rail or drawer, with the detail pane alongside above 1200 dp",
          "Prices as integer cents with a fixed format, the same whatever the phone's language",
          "40 tests on the catalogue module, two of them property-based"
        ]
      },
      cover: "media/projects/bottega/cover.jpg",
      media: [
        { type: "video", src: "media/projects/bottega/demo.webm", poster: "media/projects/bottega/demo-poster.jpg" },
        { type: "image", src: "media/projects/bottega/shot-griglia.jpg", alt: "Vetrina a griglia" },
        { type: "image", src: "media/projects/bottega/shot-dettaglio.jpg", alt: "Dettaglio prodotto con scelta del colore" },
        { type: "image", src: "media/projects/bottega/shot-carrello.jpg", alt: "Carrello" }
      ],
      links: []
    },

    {
      id: "vedetta",
      title: "Vedetta",
      year: "2026",
      platform: "Android 8+ · Kotlin · Jetpack Compose",
      tags: ["Android", "Kotlin", "Video", "Protocolli"],
      summary: {
        it: "App Android per gestire telecamere IP tramite ONVIF, con il protocollo scritto da zero: autenticazione, profili video, diretta e comandi PTZ, più una telecamera simulata per provarla senza hardware.",
        en: "An Android app for managing IP cameras over ONVIF, with the protocol written from scratch: authentication, video profiles, live view and PTZ control, plus a simulated camera to try it without hardware."
      },
      description: {
        it: [
          "Vedetta si collega a una telecamera, si autentica, legge i profili video disponibili, mostra la diretta e permette di muovere l'inquadratura. Il protocollo ONVIF è implementato <strong>senza librerie SOAP né ONVIF</strong>: i messaggi SOAP 1.2 vengono costruiti e letti a mano, l'autenticazione usa WS-Security con password in digest e la ricerca in rete WS-Discovery. È un'implementazione clean-room, scritta solo a partire dalle specifiche pubbliche di onvif.org.",
          "Il cuore del protocollo <strong>non dipende da Android</strong>: vive in un modulo Kotlin puro, che si compila e si collauda su una normale JVM. Nell'app c'è anche un dispositivo ONVIF simulato, che controlla davvero le credenziali e genera ogni fotogramma al momento: per questo il pad PTZ sposta l'immagine sul serio, come si vede nella demo, registrata senza nessuna telecamera collegata."
        ],
        en: [
          "Vedetta connects to a camera, authenticates, reads the available video profiles, shows the live view and lets you move the shot. The ONVIF protocol is implemented <strong>without any SOAP or ONVIF library</strong>: SOAP 1.2 messages are built and parsed by hand, authentication uses WS-Security with digest passwords, and network discovery uses WS-Discovery. It is a clean-room implementation, written only from the public onvif.org specifications.",
          "The protocol core <strong>does not depend on Android</strong>: it lives in a pure Kotlin module that builds and is tested on a plain JVM. The app also includes a simulated ONVIF device that really checks credentials and generates each frame on the fly: that is why the PTZ pad genuinely moves the picture, as the demo shows, recorded with no camera attached."
        ]
      },
      highlights: {
        it: [
          "SOAP, WS-Security e WS-Discovery scritti dalle specifiche, senza librerie esterne",
          "Diretta MJPEG su HTTP, con pad PTZ, zoom e posizioni memorizzate",
          "Se la connessione fallisce spiega il motivo: credenziali rifiutate, nome non risolto, connessione rifiutata",
          "Password cifrate con AES-256, con la chiave custodita nell'Android Keystore",
          "166 test, di cui diciannove end-to-end fra client e simulatore su socket reali"
        ],
        en: [
          "SOAP, WS-Security and WS-Discovery written from the specs, with no external libraries",
          "MJPEG live view over HTTP, with PTZ pad, zoom and stored presets",
          "If a connection fails it explains why: credentials rejected, name not resolved, connection refused",
          "Passwords encrypted with AES-256, the key kept in the Android Keystore",
          "166 tests, nineteen of them end to end between client and simulator over real sockets"
        ]
      },
      cover: "media/projects/vedetta/cover.jpg",
      media: [
        { type: "video", src: "media/projects/vedetta/demo.mp4", poster: "media/projects/vedetta/demo-poster.jpg" },
        { type: "image", src: "media/projects/vedetta/shot-diretta.jpg", alt: "Diretta con pad PTZ e posizioni memorizzate" },
        { type: "image", src: "media/projects/vedetta/shot-scheda.jpg", alt: "Scheda del dispositivo con i profili" },
        { type: "image", src: "media/projects/vedetta/shot-diagnostica.jpg", alt: "Diagnostica: dialogo ONVIF completo passo per passo" }
      ],
      links: []
    },

    {
      id: "cielo",
      title: "Cielo",
      year: "2026",
      platform: "Flutter 3 · Dart",
      tags: ["Flutter", "UI", "Grafica"],
      summary: {
        it: "App meteo in Flutter in cui il cielo non è un'immagine ma un disegno animato: cambia con l'ora e con il tempo, dalle nuvole a strati alla pioggia mossa dal vento, fino alle stelle dopo il tramonto.",
        en: "A Flutter weather app where the sky is not an image but an animated drawing: it changes with the time and the weather, from layered clouds to wind-blown rain and stars after sunset."
      },
      description: {
        it: [
          "Nel progetto non c'è nessun file grafico. Lo sfondo è disegnato da tre <strong>CustomPainter</strong> — cielo, nuvole e precipitazioni — che si muovono allo stesso ritmo e dipendono da due sole informazioni: la condizione meteo e la posizione del sole.",
          "Combinando nove condizioni e quattro momenti della giornata si ottengono trentasei cieli diversi, più tutte le sfumature intermedie: troppi per controllarli uno per uno a occhio. Per questo il colore del testo e il velo che ne garantisce la leggibilità sono <strong>calcolati misurando il contrasto</strong>, e un test verifica tutte le combinazioni a ogni modifica."
        ],
        en: [
          "There is no image file in the project. The background is drawn by three <strong>CustomPainter</strong>s — sky, clouds and precipitation — that move in step and depend on just two pieces of information: the weather condition and the position of the sun.",
          "Combining nine conditions with four times of day gives thirty-six different skies, plus everything in between: too many to check one by one by eye. That is why the text colour and the scrim that keeps it readable are <strong>computed by measuring contrast</strong>, and a test checks every combination on each change."
        ]
      },
      highlights: {
        it: [
          "Tre CustomPainter animati da un unico ticker condiviso",
          "Contrasto WCAG verificato dai test su tutte e 36 le combinazioni di cielo e ora",
          "Grafico della temperatura con curva di Catmull-Rom che si traccia all'apertura",
          "Transizioni Hero: il cielo della scheda si espande in quello del dettaglio",
          "Funziona offline e dice quanto sono vecchi i dati, invece di spacciarli per freschi",
          "101 test, dati Open-Meteo senza chiave API, solo due dipendenze"
        ],
        en: [
          "Three CustomPainters driven by a single shared ticker",
          "WCAG contrast verified by tests across all 36 sky and time combinations",
          "Temperature chart with a Catmull-Rom curve that draws itself on opening",
          "Hero transitions: the card's sky expands into the detail view's",
          "Works offline and says how old the data is, instead of passing it off as fresh",
          "101 tests, Open-Meteo data with no API key, only two dependencies"
        ]
      },
      cover: "media/projects/cielo/cover.jpg",
      media: [
        { type: "image", src: "media/projects/cielo/shot-elenco.jpg", alt: "Elenco delle città" },
        { type: "image", src: "media/projects/cielo/shot-dettaglio.jpg", alt: "Dettaglio: prossime ore, grafico e sette giorni" },
        { type: "image", src: "media/projects/cielo/shot-sereno.jpg", alt: "Dettaglio con cielo sereno" }
      ],
      links: []
    },

    {
      id: "sonda",
      title: "Sonda",
      year: "2026",
      platform: "Python 3.10 · Tkinter",
      tags: ["Python", "Desktop", "Protocolli"],
      summary: {
        it: "Applicativo desktop che intercetta il traffico binario fra un'app e una centrale e lo rende leggibile in tempo reale: ogni messaggio viene decodificato e quelli corrotti vengono evidenziati.",
        en: "A desktop tool that captures the binary traffic between an app and a control unit and makes it readable in real time: every message is decoded and corrupted ones are highlighted."
      },
      description: {
        it: [
          "È uno strumento da banco per un formato di messaggio tipico delle centrali, <strong>[LEN][CMD][PAYLOAD][XOR]</strong>: lunghezza, comando, dati e un checksum finale. Mostra i messaggi catturati in una tabella, ne traduce i campi in valori leggibili, offre dump esadecimale, filtri e un grafico del traffico, e permette di comporre comandi vedendo in anteprima il checksum calcolato.",
          "La parte più delicata è il <strong>riassemblaggio</strong>: una connessione di rete consegna byte, non messaggi completi. Un messaggio può arrivare spezzato in più letture, attaccato a quello successivo o preceduto da byte spuri dopo un disturbo, e Sonda li ricompone correttamente in tutti e tre i casi, ognuno coperto da test."
        ],
        en: [
          "It is a bench tool for a message format typical of control units, <strong>[LEN][CMD][PAYLOAD][XOR]</strong>: length, command, data and a closing checksum. It lists captured messages in a table, turns their fields into readable values, offers a hex dump, filters and a traffic chart, and lets you compose commands with a preview of the computed checksum.",
          "The trickiest part is <strong>reassembly</strong>: a network connection delivers bytes, not complete messages. A message can arrive split across several reads, stuck to the next one, or preceded by stray bytes after a disturbance, and Sonda puts it back together correctly in all three cases, each covered by tests."
        ]
      },
      highlights: {
        it: [
          "Riassemblaggio del flusso con risincronizzazione dopo byte spuri",
          "Tredici comandi decodificati; i messaggi con checksum errato vengono mostrati, non scartati",
          "Centrale simulata integrata, per provare tutto senza hardware collegato",
          "Esportazione della cattura in CSV e JSONL, tema chiaro e scuro",
          "37 test sulla logica di protocollo, solo libreria standard di Python"
        ],
        en: [
          "Stream reassembly with resynchronisation after stray bytes",
          "Thirteen decoded commands; messages with a bad checksum are shown, not discarded",
          "Built-in simulated control unit, to try everything with no hardware attached",
          "Capture export to CSV and JSONL, light and dark theme",
          "37 tests on the protocol logic, Python standard library only"
        ]
      },
      cover: "media/projects/sonda/cover.jpg",
      media: [
        { type: "video", src: "media/projects/sonda/demo.webm", poster: "media/projects/sonda/demo-poster.jpg" },
        { type: "image", src: "media/projects/sonda/shot-cattura.jpg", alt: "Cattura in diretta con frame decodificato" },
        { type: "image", src: "media/projects/sonda/shot-errori.jpg", alt: "Filtro sui soli frame con checksum errato" },
        { type: "image", src: "media/projects/sonda/shot-invio.jpg", alt: "Composizione e invio di un comando" },
        { type: "image", src: "media/projects/sonda/shot-chiaro.jpg", alt: "Tema chiaro" }
      ],
      links: []
    },

    {
      id: "deriva",
      title: "Deriva",
      year: "2026",
      platform: "Python 3.10 · OpenCV · Tkinter",
      tags: ["Python", "Visione artificiale", "Desktop"],
      summary: {
        it: "Esperimento di robotica: un controller da gioco che si muove sul tavolo solo grazie ai propri motori di vibrazione, guidato da una telecamera fino a raggiungere un bersaglio.",
        en: "A robotics experiment: a game controller that moves across a table using only its own vibration motors, guided by a camera until it reaches a target."
      },
      description: {
        it: [
          "Il controller non ha ruote: si sposta sfruttando due attuatori aptici e l'attrito con il piano. Una telecamera dall'alto ne misura la posizione e l'orientamento grazie a dei marker <strong>ArUco</strong>, e un controllo ad anello chiuso decide a ogni passo quale impulso di vibrazione inviare per avvicinarlo al bersaglio.",
          "L'aspetto più interessante è che <strong>non dà nulla per scontato</strong>. Prima di muoversi esegue una calibrazione che misura quanto spostamento produce davvero ogni schema di vibrazione e lo confronta con il rumore del tracciamento: se nessuno schema supera quella soglia, l'applicativo dichiara che il controller non si muove, invece di continuare a provare a vuoto."
        ],
        en: [
          "The controller has no wheels: it moves using two haptic actuators and friction with the surface. An overhead camera measures its position and orientation through <strong>ArUco</strong> markers, and a closed control loop decides at each step which vibration pulse to send to bring it closer to the target.",
          "The most interesting part is that it <strong>takes nothing for granted</strong>. Before moving, it runs a calibration that measures how much each vibration pattern really moves the controller and compares it with the tracking noise: if no pattern beats that threshold, the app states that the controller does not move, instead of trying in vain."
        ]
      },
      highlights: {
        it: [
          "Tracciamento ArUco convertito in millimetri, con un errore inferiore al mezzo millimetro",
          "Calibrazione con soglia di significatività statistica e correzione per confronti multipli",
          "Anello chiuso basato sulla visione: anche un attuatore impreciso diventa utilizzabile",
          "Simulatore che riproduce anche il caso peggiore, quello in cui il controller non si muove",
          "73 test, con l'arrivo al bersaglio verificato end-to-end in simulazione"
        ],
        en: [
          "ArUco tracking converted to millimetres, with an error below half a millimetre",
          "Calibration with a statistical significance threshold and a multiple-comparisons correction",
          "Vision-based closed loop: even an imprecise actuator becomes usable",
          "Simulator that also reproduces the worst case, where the controller does not move",
          "73 tests, with reaching the target verified end to end in simulation"
        ]
      },
      cover: "media/projects/deriva/cover.jpg",
      media: [
        { type: "video", src: "media/projects/deriva/demo.webm", poster: "media/projects/deriva/demo-poster.jpg" },
        { type: "image", src: "media/projects/deriva/shot-calibrazione.jpg", alt: "Calibrazione degli schemi di vibrazione" },
        { type: "image", src: "media/projects/deriva/shot-navigazione.jpg", alt: "Navigazione verso il bersaglio" },
        { type: "image", src: "media/projects/deriva/shot-arrivo.jpg", alt: "Bersaglio raggiunto" }
      ],
      links: []
    },

    {
      id: "homelab",
      title: "Homelab",
      year: "2026",
      platform: "Debian · Docker · Home Assistant · Shelly",
      tags: ["Domotica", "Home Assistant", "Linux", "Elettronica"],
      summary: {
        it: "Un mini PC con Debian e Docker che gestisce la rete e la domotica di casa: DNS e DHCP con AdGuard Home e un'istanza di Home Assistant con tre progetti su hardware reale: la gestione dei carichi elettrici, già attiva, e due in fase di montaggio — le sonde di temperatura in garage e la centrale d'allarme resa smart.",
        en: "A mini PC running Debian and Docker that handles the home network and automation: DNS and DHCP with AdGuard Home, and a Home Assistant instance with three projects on real hardware: electrical load management, already running, and two being installed — temperature probes in the garage and a smart-enabled alarm panel."
      },
      description: {
        it: [
          "La base è un <strong>Fujitsu Futro S740</strong>, un thin client con Celeron J4105 e 4 GB di RAM, a cui ho affiancato un SSD esterno da 256 GB. Ci gira <strong>Debian server</strong>, e ogni servizio è un container <strong>Docker</strong>: così ognuno resta isolato e si aggiorna o si sposta senza toccare gli altri. Alcuni script automatici tengono aggiornati sistema e container. <strong>AdGuard Home</strong> fa da DNS per tutta la rete, con blocco della pubblicità e dei tracker e i propri server upstream, e gestisce anche il DHCP.",
          "Su <strong>Home Assistant</strong> ho costruito tre progetti. Il primo evita che salti il contatore: cinque prese <strong>Shelly 1PM Gen3</strong> misurano i consumi e, quando il totale si avvicina alla potenza massima, staccano i dispositivi uno alla volta secondo un ordine di priorità. Il secondo, in fase di installazione, controllerà il garage con cinque sonde di temperatura <strong>DS18B20</strong> da tre metri, distribuite in punti diversi, per accorgersi in tempo di un surriscaldamento.",
          "Il terzo è il più impegnativo: rendere smart una centrale d'allarme <strong>Lince Euro 5K</strong> senza sostituirla. Lo schema è completo e il montaggio è in corso. Due <strong>Shelly Plus Uni</strong> leggono lo stato della centrale attraverso due fotoaccoppiatori PC817 e il contatto del relè d'allarme, inviano gli impulsi di inserimento ed escludono gruppi di zone; un relè aggiuntivo, con una resistenza di bilanciamento da 10 kΩ, esclude una singola zona. Home Assistant offre così quattro modalità — totale, notturno, garage e disinserito — e prima di ogni comando controlla lo stato reale della centrale, poi verifica che sia cambiato e avvisa se qualcosa non torna. La chiave continua a funzionare come prima.",
          "Nello stesso Home Assistant sono collegati anche il rilevatore di fumo di casa, il purificatore d'aria e un Echo Dot di seconda generazione, per comandare tutto anche con Alexa."
        ],
        en: [
          "The base is a <strong>Fujitsu Futro S740</strong>, a thin client with a Celeron J4105 and 4 GB of RAM, to which I added an external 256 GB SSD. It runs <strong>Debian server</strong>, and every service is a <strong>Docker</strong> container: each one stays isolated and can be updated or moved without touching the others. Automated scripts keep the system and the containers up to date. <strong>AdGuard Home</strong> is the DNS server for the whole network, blocking ads and trackers through its own upstream servers, and it also handles DHCP.",
          "On <strong>Home Assistant</strong> I built three projects. The first keeps the meter from tripping: five <strong>Shelly 1PM Gen3</strong> plugs measure consumption and, when the total gets close to the maximum power, switch devices off one at a time in order of priority. The second, currently being installed, will watch the garage with five three-metre <strong>DS18B20</strong> temperature probes placed at different points, to catch overheating early.",
          "The third is the most demanding: making a <strong>Lince Euro 5K</strong> alarm panel smart without replacing it. The design is complete and assembly is under way. Two <strong>Shelly Plus Uni</strong> read the panel's state through two PC817 optocouplers and the alarm relay contact, send the arming pulses and exclude groups of zones; an extra relay, with a 10 kΩ balancing resistor, bypasses a single zone. Home Assistant thus offers four modes — full, night, garage and disarmed — and before every command it checks the panel's real state, then verifies that it changed and sends a notification if something doesn't add up. The key keeps working as before.",
          "The same Home Assistant also connects the home's smoke detector, the air purifier and a second-generation Echo Dot, so everything can be controlled with Alexa too."
        ]
      },
      highlights: {
        it: [
          "Thin client Fujitsu Futro S740 con Debian server e tutti i servizi in Docker, aggiornati da script automatici",
          "AdGuard Home come DNS e DHCP della rete, con blocco di pubblicità e tracker",
          "Gestione dei carichi con cinque Shelly 1PM Gen3: si stacca il dispositivo meno importante prima che salti il contatore",
          "Cinque sonde DS18B20 per tenere sotto controllo la temperatura del garage (in installazione)",
          "Centrale Lince Euro 5K comandata da Home Assistant con due Shelly Plus Uni, fotoaccoppiatori e un relè di bypass: schema completo, montaggio in corso",
          "Rilevatore di fumo, purificatore ed Echo Dot con Alexa integrati nello stesso sistema"
        ],
        en: [
          "Fujitsu Futro S740 thin client with Debian server and every service in Docker, kept up to date by automated scripts",
          "AdGuard Home as the network's DNS and DHCP, blocking ads and trackers",
          "Load management with five Shelly 1PM Gen3: the least important device is switched off before the meter trips",
          "Five DS18B20 probes to keep an eye on the garage temperature (being installed)",
          "Lince Euro 5K panel controlled by Home Assistant through two Shelly Plus Uni, optocouplers and a bypass relay: design complete, assembly under way",
          "Smoke detector, air purifier and Echo Dot with Alexa integrated into the same system"
        ]
      },
      cover: "media/projects/homelab/cover.jpg",
      media: [
        { type: "image", src: "media/projects/homelab/schema-allarme.png", alt: "Schema di collegamento: centrale Lince Euro 5K e due Shelly Plus Uni" }
      ],
      links: []
    }
  ],

  /* ── Percorso ───────────────────────────────────────────── */
  experience: [
    {
      period: "2023 — 2026",
      role: { it: "Sviluppatore Android", en: "Android Developer" },
      org: { it: "Combivox — Sistemi di sicurezza", en: "Combivox — Security systems" },
      text: {
        it: "Sviluppo e manutenzione degli applicativi Android per i pannelli touch di centrali di allarme e domotica: software che gira su hardware reale — pannelli a muro, tablet in kiosk mode, dispositivi che restano accesi per anni e parlano con la centrale via protocollo binario su TCP. Seguo l'intero percorso, dal livello di protocollo all'interfaccia, passando per i servizi in background e la portabilità su nuovo hardware, da schermi 1024×600 a tablet moderni, in orizzontale e in verticale.",
        en: "Development and maintenance of the Android apps for touch panels of alarm and home-automation units: software running on real hardware — wall-mounted panels, kiosk tablets, devices that stay on for years and talk to the control unit over a binary protocol on TCP. I cover the whole path, from the protocol layer to the interface, through background services and porting to new hardware, from 1024×600 screens to modern tablets, in landscape and portrait."
      }
    },
    {
      period: "2023",
      role: { it: "Full Stack Developer Junior", en: "Junior Full Stack Developer" },
      org: { it: "Aulab — Coding bootcamp", en: "Aulab — Coding bootcamp" },
      text: {
        it: "Bootcamp di sviluppo web full stack basato su programmazione orientata agli oggetti e metodologie agili.",
        en: "Full-stack web development bootcamp built on object-oriented programming and agile methodologies."
      }
    },
    {
      period: "2023",
      role: { it: "Academy BPM Specialist", en: "BPM Specialist Academy" },
      org: { it: "Umana Forma", en: "Umana Forma" },
      text: {
        it: "Corso in cui ho sviluppato in autonomia un progetto di business su tematiche reali: sviluppo applicativo su base .NET (C#) e configurazione consulenziale della piattaforma Jamio in logica no-code.",
        en: "Course in which I independently built a business project on real-world topics: application development on .NET (C#) and consulting-style configuration of the Jamio platform using no-code logic."
      }
    },
    {
      period: "2022",
      role: { it: "Tecnico informatico (stage)", en: "IT Technician (internship)" },
      org: { it: "Natuzzi Spa", en: "Natuzzi Spa" },
      text: {
        it: "Stage di sei mesi tra assistenza ai dipendenti e manutenzione hardware e software. Ho realizzato un impianto domotico per l'accensione e lo spegnimento delle luci e per il riscaldamento automatizzato, gestibile via software.",
        en: "Six-month internship covering staff support and hardware and software maintenance. I built a home-automation system for switching lights on and off and for automated heating, managed through software."
      }
    },
    {
      period: "2019 — 2022",
      role: { it: "Formazione tecnica e primi tirocini", en: "Technical education and early internships" },
      org: { it: "IIS Galilei · ITS Cuccovillo", en: "IIS Galilei · ITS Cuccovillo" },
      text: {
        it: "Diploma di Perito Informatico (2020) e corso ITS in manutenzione predittiva (2022), con un tirocinio in assistenza e manutenzione di dispositivi informatici.",
        en: "Diploma in IT (2020) and an ITS course in predictive maintenance (2022), with an internship in support and maintenance of IT devices."
      }
    }
  ],

  /* ── Contatti ───────────────────────────────────────────── */
  contact: {
    text: {
      it: "Per proposte di collaborazione, consulenze o semplicemente per parlare di Android su hardware strano, scrivimi.",
      en: "For collaborations, consulting, or just to talk about Android on unusual hardware, drop me a line."
    }
  },

  /* ── Etichette dell'interfaccia ─────────────────────────── */
  ui: {
    skip: { it: "Vai al contenuto", en: "Skip to content" },
    nav: {
      home:       { it: "Home", en: "Home" },
      about:      { it: "Chi sono", en: "About" },
      stack:      { it: "Competenze", en: "Skills" },
      projects:   { it: "Progetti", en: "Projects" },
      experience: { it: "Percorso", en: "Experience" },
      contact:    { it: "Contatti", en: "Contact" }
    },
    cta: {
      projects: { it: "Guarda i progetti", en: "See the projects" },
      contact:  { it: "Contattami", en: "Get in touch" }
    },
    projectsLead: {
      it: "Applicativi Android, Flutter e Python: lavoro e progetti personali. Apri una scheda per i dettagli.",
      en: "Android, Flutter and Python apps: work and personal projects. Open a card for details."
    },
    all:        { it: "Tutti", en: "All" },
    noResults:  { it: "Nessun progetto con questo filtro.", en: "No project matches this filter." },
    videoBadge: { it: "Video", en: "Video" },
    emailLabel: { it: "E-mail", en: "E-mail" },
    copy:       { it: "Copia", en: "Copy" },
    copied:     { it: "Copiata", en: "Copied" },
    close:      { it: "Chiudi", en: "Close" },
    footer: {
      it: "© {year} Piero Ferrulli — sito statico, nessun cookie, nessun tracciamento.",
      en: "© {year} Piero Ferrulli — static site, no cookies, no tracking."
    }
  }
};
