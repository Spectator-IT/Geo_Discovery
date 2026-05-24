<template>
  <div class="card flex flex-col relative overflow-hidden">

    <div class="flex items-center justify-between mb-4 relative z-10">
      <div class="flex items-center gap-3">
        <svg viewBox="0 0 14 14" fill="none" class="w-3.5 h-3.5 text-compass-600 shrink-0">
          <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1"/>
          <line x1="7" y1="1.5" x2="7" y2="12.5" stroke="currentColor" stroke-width="0.5"/>
          <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" stroke-width="0.5"/>
          <polygon points="7,2 7.7,7 7,7.5 6.3,7" fill="#8b3a1a"/>
          <polygon points="7,12 7.7,7 7,7.5 6.3,7" fill="#888"/>
          <circle cx="7" cy="7" r="1" fill="#c4a060"/>
        </svg>
        <h2 class="section-label">Carta Geografica</h2>
      </div>

      <div class="style-switcher">
        <button
          v-for="s in MAP_STYLE_LABELS" :key="s.id"
          class="style-btn"
          :class="stileAttivo === s.id ? 'active' : ''"
          @click="cambiaStile(s.id)"
        >{{ s.label }}</button>
      </div>
    </div>

    <div
      ref="refContenitore"
      class="rounded border border-parchment-300 overflow-hidden relative"
      style="height: 420px; box-shadow: inset 0 2px 8px rgba(74,46,14,0.1);"
    ></div>

    <div class="flex items-center justify-between mt-3 relative z-10">
      <p class="font-body text-parchment-400 italic" style="font-size:0.72rem;">
        Trascina · Scorri · Ctrl+drag per ruotare
      </p>
      <span v-if="coordinate" class="coord-badge">{{ coordinate }}</span>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import maplibregl from 'maplibre-gl'
import { MAP_STYLES, MAP_STYLE_LABELS } from '@/services/api.js'

const props = defineProps({
  country: { type: Object, default: null }
})

const stileAttivo    = ref('streets')
const coordinate     = ref('')
const refContenitore = ref(null)

let mappa    = null
let marcatore = null

onMounted(function() {
  if (props.country) {
    nextTick(function() {
      inizializza(props.country)
    })
  }
})

onBeforeUnmount(function() {
  distruggi()
})

watch(function() {
  return props.country
}, async function(p) {
  if (!p) return
  await nextTick()
  distruggi()
  inizializza(p)
})

function distruggi() {
  if (marcatore) {
    marcatore.remove()
    marcatore = null
  }
  if (mappa) {
    mappa.remove()
    mappa = null
  }
}

function inizializza(p) {
  if (!refContenitore.value) return

  const lat = p.latlng ? p.latlng[0] : 20
  const lng = p.latlng ? p.latlng[1] : 0

  mappa = new maplibregl.Map({
    container: refContenitore.value,
    style:     MAP_STYLES[stileAttivo.value],
    center:    [lng, lat],
    zoom:      3.5,
    maxPitch:  85,
    canvasContextAttributes: { antialias: true }
  })

  mappa.addControl(new maplibregl.NavigationControl(), 'top-right')
  mappa.addControl(new maplibregl.ScaleControl(), 'bottom-left')

  mappa.on('style.load', function() {
    mettimarcatore(p)
  })

  mappa.on('click', function(e) {
    coordinate.value = e.lngLat.lat.toFixed(3) + '°, ' + e.lngLat.lng.toFixed(3) + '°'
    new maplibregl.Popup({ closeButton: false, offset: 6 })
      .setLngLat(e.lngLat)
      .setHTML('<b>' + coordinate.value + '</b>')
      .addTo(mappa)
  })
}

function mettimarcatore(p) {
  if (!p.latlng || !p.latlng.length || !mappa) return

  if (marcatore) {
    marcatore.remove()
    marcatore = null
  }

  const el = document.createElement('div')
  el.style.cssText = 'font-size:26px;line-height:1;filter:drop-shadow(0 2px 6px rgba(0,0,0,.3));'
  el.textContent = bandiera(p.cca2)

  const capitale = p.capital && p.capital[0] ? '<br>' + p.capital[0] : ''

  marcatore = new maplibregl.Marker({ element: el, anchor: 'bottom' })
    .setLngLat([p.latlng[1], p.latlng[0]])
    .setPopup(new maplibregl.Popup({ offset: 30 }).setHTML('<b>' + p.name.common + '</b>' + capitale))
    .addTo(mappa)
}

function cambiaStile(id) {
  if (!mappa || stileAttivo.value === id) return
  stileAttivo.value = id
  const centro = mappa.getCenter()
  const zoom   = mappa.getZoom()
  mappa.setStyle(MAP_STYLES[id])
  mappa.once('style.load', function() {
    mappa.jumpTo({ center: centro, zoom: zoom })
    if (props.country) {
      mettimarcatore(props.country)
    }
  })
}

function bandiera(cca2) {
  if (!cca2) return '🏳'
  return [...cca2.toUpperCase()].map(function(c) {
    return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
  }).join('')
}
</script>
