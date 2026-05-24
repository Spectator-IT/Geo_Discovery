<template>
  <div>

    <section
      class="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
      style="background: linear-gradient(170deg, #0e0c08 0%, #1a1208 40%, #251a0c 70%, #1a1208 100%);"
    >

      <svg
        class="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.07]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <line v-for="y in [80,160,240,320,400,480,560]" :key="'lat'+y" :x1="0" :y1="y" :x2="1200" :y2="y" stroke="#c4a060" stroke-width="0.7"/>
        <line v-for="x in [100,200,300,400,500,600,700,800,900,1000,1100]" :key="'lng'+x" :x1="x" :y1="0" :x2="x" :y2="600" stroke="#c4a060" stroke-width="0.7"/>
        <ellipse cx="600" cy="300" rx="280" ry="280" stroke="#c4a060" stroke-width="0.8" fill="none"/>
        <ellipse cx="600" cy="300" rx="180" ry="280" stroke="#c4a060" stroke-width="0.5" fill="none"/>
        <ellipse cx="600" cy="300" rx="80" ry="280" stroke="#c4a060" stroke-width="0.5" fill="none"/>
        <ellipse cx="600" cy="300" rx="280" ry="90" stroke="#c4a060" stroke-width="0.5" fill="none"/>
        <ellipse cx="600" cy="300" rx="280" ry="185" stroke="#c4a060" stroke-width="0.5" fill="none"/>
      </svg>

      <svg
        class="absolute pointer-events-none select-none"
        style="right:-80px; top:-60px; width:420px; height:420px; opacity:0.055;"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="96" stroke="#c4a060" stroke-width="0.8"/>
        <circle cx="100" cy="100" r="80" stroke="#c4a060" stroke-width="0.5" stroke-dasharray="2 3"/>
        <circle cx="100" cy="100" r="60" stroke="#c4a060" stroke-width="0.5"/>
        <line x1="100" y1="4" x2="100" y2="196" stroke="#c4a060" stroke-width="0.8"/>
        <line x1="4" y1="100" x2="196" y2="100" stroke="#c4a060" stroke-width="0.8"/>
        <line x1="26" y1="26" x2="174" y2="174" stroke="#c4a060" stroke-width="0.5"/>
        <line x1="174" y1="26" x2="26" y2="174" stroke="#c4a060" stroke-width="0.5"/>
        <line x1="63" y1="4" x2="137" y2="196" stroke="#c4a060" stroke-width="0.3"/>
        <line x1="137" y1="4" x2="63" y2="196" stroke="#c4a060" stroke-width="0.3"/>
        <line x1="4" y1="63" x2="196" y2="137" stroke="#c4a060" stroke-width="0.3"/>
        <line x1="4" y1="137" x2="196" y2="63" stroke="#c4a060" stroke-width="0.3"/>
        <polygon points="100,10 104,100 100,94 96,100" fill="#c4a060"/>
        <polygon points="100,190 104,100 100,106 96,100" fill="#8a8a8a"/>
        <circle cx="100" cy="100" r="5" fill="#c4a060"/>
        <circle cx="100" cy="100" r="2.5" fill="#1a1208"/>
        <text x="100" y="8" text-anchor="middle" fill="#c4a060" font-size="7" font-family="Cinzel,serif">N</text>
        <text x="100" y="198" text-anchor="middle" fill="#8a8a8a" font-size="7" font-family="Cinzel,serif">S</text>
        <text x="198" y="103" text-anchor="end" fill="#c4a060" font-size="7" font-family="Cinzel,serif">E</text>
        <text x="2" y="103" text-anchor="start" fill="#c4a060" font-size="7" font-family="Cinzel,serif">W</text>
      </svg>

      <div class="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20 text-center">

        <div class="flex items-center justify-center gap-3 mb-8">
          <span class="h-px w-16" style="background: linear-gradient(90deg, transparent, rgba(196,160,96,0.7))"></span>
          <span class="font-display text-parchment-400 tracking-[0.3em] uppercase" style="font-size:0.6rem;">
            250 paesi · dati live · AI culturale
          </span>
          <span class="h-px w-16" style="background: linear-gradient(90deg, rgba(196,160,96,0.7), transparent)"></span>
        </div>

        <h1
          class="font-decorative text-parchment-200 leading-tight mb-3"
          style="font-size:clamp(2.2rem,6vw,3.8rem); letter-spacing:0.06em; text-shadow: 0 2px 20px rgba(196,160,96,0.2);"
        >
          Esplora il Mondo
        </h1>

        <p class="font-display text-parchment-500/80 mb-2" style="font-size:0.8rem; letter-spacing:0.18em;">
          ATLAS TERRARUM · GEODISCOVERY
        </p>

        <p class="font-body text-parchment-300/60 text-lg leading-relaxed mb-10 max-w-md mx-auto italic">
          Cerca un paese per nome — ottieni dati geografici, statistici e un ritratto culturale generato dall'AI.
        </p>

        <div class="max-w-xl mx-auto mb-7">
          <SearchBar ref="refBarra" :all-countries="elencopaesi" :loading="caricando" dark @select="suSelezione" />
        </div>

        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="nome in suggerimenti"
            :key="nome"
            class="font-display text-parchment-400 transition-all duration-200 border rounded px-3 py-1 hover:text-parchment-200 hover:border-parchment-400/60"
            style="font-size:0.65rem; letter-spacing:0.1em; border-color:rgba(196,160,96,0.18); background:rgba(196,160,96,0.05);"
            @click="caricaVeloce(nome)"
          >{{ nome }}</button>
        </div>

      </div>
    </section>

    <section v-if="paese" :key="paese.cca2" class="max-w-6xl mx-auto px-6 py-8 animate-fade-up">

      <div class="ornament-divider mb-8">
        <svg viewBox="0 0 40 10" class="w-10 text-parchment-400">
          <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="20" cy="5" r="3" fill="currentColor"/>
          <circle cx="35" cy="5" r="2" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>

      <CountryDetail :country="paese" class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-6">
        <div class="lg:col-span-2 flex flex-col gap-5">
          <GeminiPanel
            :ritratto="ritratto"
            :vacanza="vacanza"
            :loading-ritratto="caricandoRitratto"
            :loading-vacanza="caricandoVacanza"
          />
          <BordersPanel :borders="paese.borders" :border-map="mappaConfini" @select="suConfine" />
        </div>
        <div class="lg:col-span-3">
          <MapView :country="paese" />
        </div>
      </div>

    </section>

    <section v-else class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          v-for="f in funzionalita"
          :key="f.label"
          class="card-ornate group hover:shadow-parchment-lg transition-all duration-300"
        >
          <div class="w-10 h-10 rounded border border-parchment-300 bg-parchment-100 flex items-center justify-center mb-4 group-hover:border-compass-500 transition-colors">
            <svg :viewBox="f.vb" class="w-5 h-5 text-compass-600" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
              <path :d="f.path"/>
            </svg>
          </div>
          <p class="font-display text-ink-700 mb-1.5" style="font-size:0.8rem; letter-spacing:0.06em;">{{ f.label }}</p>
          <p class="font-body text-ink-500 leading-relaxed italic" style="font-size:0.9rem;">{{ f.desc }}</p>
          <div class="absolute top-3 right-3 text-parchment-300 opacity-40 font-display" style="font-size:0.55rem; letter-spacing:0.1em;">✦</div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar     from '@/components/SearchBar.vue'
import CountryDetail from '@/components/CountryDetail.vue'
import GeminiPanel   from '@/components/GeminiPanel.vue'
import MapView       from '@/components/MapView.vue'
import BordersPanel  from '@/components/BordersPanel.vue'
import { PrelevaTutti, CaricaPerNome, CaricaCodice, CaricamentoCult, CaricaVacanza } from '@/services/api.js'

const funzionalita = [
  {
    label: '250 Paesi',
    desc: 'Dati da REST Countries API per ogni stato del mondo.',
    vb: '0 0 16 16',
    path: 'M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM2 8h12M8 2c-2 3-2 8 0 12M8 2c2 3 2 8 0 12'
  },
  {
    label: 'AI Culturale',
    desc: 'Ritratto culturale e piano vacanza generati da AI.',
    vb: '0 0 16 16',
    path: 'M8 2v2m0 8v2M2 8h2m8 0h2M4.93 4.93l1.41 1.41m3.32 3.32 1.41 1.41M4.93 11.07l1.41-1.41m3.32-3.32 1.41-1.41'
  },
  {
    label: 'Mappa',
    desc: 'Mappa interattiva con zoom, rotazione e coordinate.',
    vb: '0 0 16 16',
    path: 'M1 3l4-1 6 2 4-1v11l-4 1-6-2-4 1V3zm4-1v11m6-9v11'
  }
]

const paese             = ref(null)
const ritratto          = ref('')
const vacanza           = ref('')
const caricandoRitratto = ref(false)
const caricandoVacanza  = ref(false)
const caricando         = ref(false)
const elencopaesi       = ref([])
const mappaConfini      = ref({})
const refBarra          = ref(null)

const suggerimenti = ['Italy', 'Japan', 'Brasil', 'Egypt', 'Norway', 'India']

const cacheRitratti = {}
const cacheVacanze  = {}

onMounted(async function() {
  try {
    const data = await PrelevaTutti()
    elencopaesi.value = data
    data.forEach(function(p) {
      mappaConfini.value[p.cca3] = p.name.common
    })
  } catch (e) {
    console.error(e)
  }
})

async function suSelezione(p) {
  refBarra.value?.setQuery(p.name.common)
  await caricaPaese(p.name.common)
}

function caricaVeloce(nome) {
  refBarra.value?.setQuery(nome)
  caricaPaese(nome)
}

async function caricaPaese(nome) {
  caricando.value = true
  ritratto.value  = ''
  vacanza.value   = ''

  try {
    paese.value = await CaricaPerNome(nome)
    avviaRitratto(paese.value.name.common)
    avviaVacanza(paese.value.name.common)
    setTimeout(function() {
      const el = document.querySelector('.animate-fade-up')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 120)
  } catch (e) {
    console.error(e)
  } finally {
    caricando.value = false
  }
}

async function suConfine(codice) {
  caricando.value = true
  ritratto.value  = ''
  vacanza.value   = ''

  try {
    const p = await CaricaCodice(codice)
    paese.value = p
    refBarra.value?.setQuery(p.name.common)
    avviaRitratto(p.name.common)
    avviaVacanza(p.name.common)
  } catch (e) {
    console.error(e)
  } finally {
    caricando.value = false
  }
}

async function avviaRitratto(nome) {
  if (cacheRitratti[nome]) {
    ritratto.value = cacheRitratti[nome]
    return
  }

  caricandoRitratto.value = true

  try {
    const testo = await CaricamentoCult(nome)
    ritratto.value = testo
    cacheRitratti[nome] = testo
  } catch (e) {
    console.error(e)
  } finally {
    caricandoRitratto.value = false
  }
}

async function avviaVacanza(nome) {
  if (cacheVacanze[nome]) {
    vacanza.value = cacheVacanze[nome]
    return
  }

  caricandoVacanza.value = true

  try {
    const testo = await CaricaVacanza(nome)
    vacanza.value = testo
    cacheVacanze[nome] = testo
  } catch (e) {
    console.error(e)
  } finally {
    caricandoVacanza.value = false
  }
}
</script>
