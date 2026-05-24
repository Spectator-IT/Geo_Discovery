<template>
  <div class="max-w-6xl mx-auto px-6 py-10">

    <router-link
      to="/"
      class="inline-flex items-center gap-2 font-display text-ink-400 hover:text-compass-600 mb-8 transition-colors"
      style="font-size:0.7rem; letter-spacing:0.1em;"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M8 2L4 6L8 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      TORNA ALLA RICERCA
    </router-link>

    <div v-if="caricando" class="card-ornate h-32 animate-pulse opacity-60"></div>

    <template v-else-if="paese">

      <CountryDetail :country="paese" class="mb-6" />

      <div class="ornament-divider mb-6">
        <svg viewBox="0 0 40 10" class="w-10 text-parchment-400">
          <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="20" cy="5" r="3" fill="currentColor"/>
          <circle cx="35" cy="5" r="2" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
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

    </template>

    <div v-else class="text-center py-20">
      <svg viewBox="0 0 40 40" fill="none" class="w-10 h-10 mx-auto mb-4 text-parchment-400">
        <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.2"/>
        <path d="M13 13L27 27M27 13L13 27" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      <p class="font-display text-parchment-500" style="font-size:0.8rem; letter-spacing:0.1em;">PAESE NON TROVATO</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CountryDetail from '@/components/CountryDetail.vue'
import GeminiPanel   from '@/components/GeminiPanel.vue'
import MapView       from '@/components/MapView.vue'
import BordersPanel  from '@/components/BordersPanel.vue'
import { PrelevaTutti, CaricaPerNome, CaricaCodice, CaricamentoCult, CaricaVacanza } from '@/services/api.js'

const route  = useRoute()
const router = useRouter()

const paese             = ref(null)
const ritratto          = ref('')
const vacanza           = ref('')
const caricandoRitratto = ref(false)
const caricandoVacanza  = ref(false)
const caricando         = ref(true)
const mappaConfini      = ref({})

const cacheRitratti = {}
const cacheVacanze  = {}

onMounted(async function() {
  try {
    const data = await PrelevaTutti()
    data.forEach(function(p) {
      mappaConfini.value[p.cca3] = p.name.common
    })
  } catch (e) {
    console.error(e)
  }
  await leggiNome(route.params.name)
})

watch(
  function() {
    return route.params.name
  },
  function(nome) {
    if (nome) {
      leggiNome(nome)
    }
  }
)

async function leggiNome(nome) {
  caricando.value = true
  ritratto.value  = ''
  vacanza.value   = ''

  try {
    paese.value = await CaricaPerNome(nome)
    avviaRitratto(paese.value.name.common)
    avviaVacanza(paese.value.name.common)
  } catch (e) {
    console.error(e)
    paese.value = null
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
    router.replace({ params: { name: p.name.common } })
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
    ritratto.value = ''
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
    vacanza.value = ''
  } finally {
    caricandoVacanza.value = false
  }
}
</script>
