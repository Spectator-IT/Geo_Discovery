# GeoDiscovery

Esploratore interattivo di paesi del mondo. Cerca un paese per nome e ottieni
una scheda completa con dati geografici, statistici, una mappa interattiva e
contenuti generati dall'intelligenza artificiale.


## Come funziona

Digita il nome di un paese nella barra di ricerca — ad esempio "Japan" — e
selezionalo dalla lista. La scheda mostra subito capitale, popolazione, area,
lingue, valuta e altri dettagli. Sul lato compare una mappa navigabile con
vista normale o satellite. Il pannello AI genera un ritratto culturale in tre
frasi (un tratto culturale, una tradizione gastronomica, un fatto insolito) e
un itinerario di viaggio di 3 giorni. I paesi confinanti sono elencati come
pulsanti cliccabili: premendone uno si carica il paese vicino senza tornare
alla ricerca.

Ogni paese ha anche un URL diretto: /#/country/Italy, /#/country/Brazil, ecc.


## Come avviare il progetto

Requisiti: Node.js 18 o superiore, npm.

    # 1. Installa le dipendenze
    npm install

    # 2. Avvia il server di sviluppo (hot reload)
    npm run serve

    # 3. Crea il build di produzione
    npm run build

Il build di produzione viene generato nella cartella dist/.
Per il deploy su hosting statico (es. Altervista), carica il contenuto
della cartella dist/ nella root del sito.


## Struttura del progetto

    GeoDiscovery/
    ├── public/
    │   └── index.html              Template HTML base
    ├── src/
    │   ├── main.js                 Punto di ingresso dell'app Vue
    │   ├── App.vue                 Componente root (header, footer, router-view)
    │   ├── assets/
    │   │   └── style.css           Stili globali Tailwind + componenti custom
    │   ├── router/
    │   │   └── index.js            Definizione delle rotte Vue Router
    │   ├── services/
    │   │   └── api.js              Chiamate API (REST Countries, Cloudflare AI)
    │   ├── views/
    │   │   ├── HomeView.vue        Pagina principale con ricerca e risultato
    │   │   └── CountryView.vue     Pagina di dettaglio paese via URL diretto
    │   ├── components/
    │   │   ├── SearchBar.vue       Barra di ricerca con autocomplete
    │   │   ├── CountryDetail.vue   Scheda dati geografici e statistici
    │   │   ├── MapView.vue         Mappa interattiva MapLibre GL
    │   │   ├── GeminiPanel.vue     Pannello ritratto culturale e itinerario AI
    │   │   └── BordersPanel.vue    Lista paesi confinanti cliccabili
    │   └── AI/
    │       ├── worker.js           Cloudflare Worker per il proxy AI
    │       └── wrangler.toml       Configurazione deploy Cloudflare Workers
    ├── package.json
    ├── tailwind.config.js
    └── vue.config.js


## API utilizzate

    REST Countries — restcountries.com/v3.1
    Fonte di tutti i dati geografici e statistici. Nessuna chiave richiesta.

    OpenStreetMap Tiles — tile.openstreetmap.org
    Mappa stradale di base. Nessuna chiave richiesta.

    EOX Sentinel-2 — tiles.maps.eox.at
    Immagini satellitari ad alta risoluzione. Nessuna chiave richiesta.

    Cloudflare AI (Llama 3.1 8B) — via worker.js
    Generazione del ritratto culturale e dell'itinerario di viaggio.
    Il worker è già deployato su Cloudflare Workers e non richiede
    configurazione aggiuntiva per l'uso. Per rideploy o modifica,
    usare Wrangler: wrangler deploy dalla cartella src/AI/.


## Deploy Cloudflare Worker (solo se necessario)

    cd src/AI
    npm install -g wrangler
    wrangler login
    wrangler deploy
