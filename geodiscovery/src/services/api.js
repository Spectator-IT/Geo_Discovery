const BASE_URL = 'https://restcountries.com/v3.1'
const URL_WORKER = 'https://gemini-proxy.geodiscovery.workers.dev'

export async function PrelevaTutti() {
  const risposta = await fetch(BASE_URL + '/all?fields=name,cca2,cca3,region')

  if (!risposta.ok) {
    throw new Error('Errore lista paesi')
  }

  const data = await risposta.json()

  data.sort(function (a, b) {
    return a.name.common.localeCompare(b.name.common)
  })

  return data
}

export async function CaricaPerNome(nome) {
  const url = BASE_URL + '/name/' + encodeURIComponent(nome) + '?fullText=false'
  const risposta = await fetch(url)

  if (!risposta.ok) {
    throw new Error('Paese non trovato')
  }

  const data = await risposta.json()

  return data[0]
}

export async function CaricaCodice(codice) {
  const url = BASE_URL + '/alpha/' + codice
  const risposta = await fetch(url)

  if (!risposta.ok) {
    throw new Error('Paese non trovato')
  }

  const data = await risposta.json()

  if (Array.isArray(data)) {
    return data[0]
  }

  return data
}

async function chiamaWorker(prompt) {
  const risposta = await fetch(URL_WORKER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  })

  if (!risposta.ok) {
    throw new Error('Errore AI')
  }

  const data = await risposta.json()

  return data.result || ''
}

export async function CaricamentoCult(nome) {
  const prompt = 'Rispondi SOLO in italiano. Scrivi esattamente 3 frasi su "' + nome + '": un tratto culturale distintivo, una tradizione gastronomica tipica, un fatto insolito o curioso. Nessuna introduzione, nessuna conclusione, solo le 3 frasi.'
  return chiamaWorker(prompt)
}

export async function CaricaVacanza(nome) {
  const prompt = 'Rispondi SOLO in italiano. Crea un piano vacanza di 3 giorni a "' + nome + '" in formato sintetico. Usa esattamente questo schema:\nGiorno 1: [attività mattina] - [attività pomeriggio] - [attività sera]\nGiorno 2: [attività mattina] - [attività pomeriggio] - [attività sera]\nGiorno 3: [attività mattina] - [attività pomeriggio] - [attività sera]\nNessuna introduzione, nessuna conclusione, solo i 3 giorni.'
  return chiamaWorker(prompt)
}

export const MAP_STYLES = {
  streets: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: [
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '© OpenStreetMap'
      }
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }
    ]
  },
  satellite: {
    version: 8,
    sources: {
      sat: {
        type: 'raster',
        tiles: [
          'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg'
        ],
        tileSize: 256,
        attribution: '© EOX'
      }
    },
    layers: [
      {
        id: 'sat',
        type: 'raster',
        source: 'sat'
      }
    ]
  }
}

export const MAP_STYLE_LABELS = [
  {
    id: 'streets',
    label: 'Mappa'
  },
  {
    id: 'satellite',
    label: 'Satellite'
  }
]
