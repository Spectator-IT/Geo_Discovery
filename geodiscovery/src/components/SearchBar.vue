<template>
  <div class="relative">
    <div
      class="search-input-wrap"
      :class="[dark ? 'dark-mode' : '', haFocus ? 'focused' : '', mostraLista ? 'open' : '']"
    >
      <svg class="shrink-0 w-4 h-4" :class="dark ? 'text-parchment-500' : 'text-parchment-600'" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/>
        <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="7" y1="3.5" x2="7" y2="10.5" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>
        <line x1="3.5" y1="7" x2="10.5" y2="7" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>
      </svg>

      <input
        ref="refInput"
        v-model="testo"
        type="text"
        autocomplete="off"
        spellcheck="false"
        :placeholder="placeholder"
        class="flex-1 bg-transparent outline-none min-w-0 font-body"
        :class="dark
          ? 'text-parchment-200 placeholder-parchment-600'
          : 'text-ink-800 placeholder-parchment-500'"
        style="font-size: 1rem;"
        @focus="haFocus = true"
        @blur="suPerdiFocus"
        @keydown="suTastiera"
      />

      <button
        v-if="testo"
        class="w-5 h-5 flex items-center justify-center rounded shrink-0 transition-colors font-display"
        :class="dark
          ? 'bg-parchment-900/30 text-parchment-500 hover:bg-parchment-800/50 hover:text-parchment-300'
          : 'bg-parchment-200 text-parchment-500 hover:bg-parchment-300 hover:text-ink-600'"
        style="font-size: 9px;"
        @mousedown.prevent="cancella"
      >✕</button>

      <span
        v-if="loading"
        class="w-4 h-4 border-2 rounded-full shrink-0 animate-spin"
        :class="dark
          ? 'border-parchment-800 border-t-parchment-400'
          : 'border-parchment-300 border-t-compass-500'"
      ></span>
    </div>

    <ul
      v-if="mostraLista"
      class="absolute left-0 right-0 top-[52px] border-2 border-t-0 rounded-b-lg z-50 max-h-64 overflow-y-auto shadow-parchment-lg"
      :class="dark
        ? 'bg-ink-900/95 backdrop-blur-xl border-parchment-700/40'
        : 'bg-parchment-50 border-parchment-400/50'"
    >
      <li
        v-if="!risultati.length"
        class="px-4 py-3 font-body italic"
        :class="dark ? 'text-parchment-600' : 'text-ink-400'"
        style="font-size:0.9rem;"
      >Nessun paese trovato</li>

      <li
        v-for="(p, i) in risultati"
        :key="p.cca2"
        class="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
        :class="i === indiceAttivo
          ? (dark ? 'bg-parchment-900/30' : 'bg-parchment-100')
          : (dark ? 'hover:bg-parchment-900/20' : 'hover:bg-parchment-100/70')"
        @mousedown.prevent="$emit('select', p)"
        @mousemove="indiceAttivo = i"
      >
        <span class="text-base leading-none shrink-0">{{ bandiera(p.cca2) }}</span>
        <span class="flex-1 font-body" :class="dark ? 'text-parchment-200' : 'text-ink-800'" style="font-size:0.95rem;">
          {{ p.name.common }}
        </span>
        <span class="font-display shrink-0" :class="dark ? 'text-parchment-600' : 'text-parchment-500'" style="font-size:0.62rem; letter-spacing:0.1em;">
          {{ p.region }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  allCountries: {
    type: Array,
    default: function() {
      return []
    }
  },
  loading: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Cerca un paese...'
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const testo        = ref('')
const haFocus      = ref(false)
const indiceAttivo = ref(-1)
const risultati    = ref([])
const refInput     = ref(null)

let timer = null

const mostraLista = computed(function() {
  return haFocus.value && testo.value.trim().length >= 1
})

watch(testo, function(val) {
  indiceAttivo.value = -1
  clearTimeout(timer)

  if (!val.trim()) {
    risultati.value = []
    return
  }

  timer = setTimeout(function() {
    const tMin = val.trim().toLowerCase()

    risultati.value = props.allCountries
      .filter(function(p) {
        return p.name.common.toLowerCase().includes(tMin)
      })
      .sort(function(a, b) {
        const aInizio = a.name.common.toLowerCase().startsWith(tMin)
        const bInizio = b.name.common.toLowerCase().startsWith(tMin)
        if (aInizio === bInizio) {
          return a.name.common.localeCompare(b.name.common)
        }
        return aInizio ? -1 : 1
      })
      .slice(0, 8)
  }, 200)
})

function suPerdiFocus() {
  setTimeout(function() {
    haFocus.value = false
  }, 150)
}

function suTastiera(e) {
  if (!mostraLista.value) {
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    indiceAttivo.value = Math.min(indiceAttivo.value + 1, risultati.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    indiceAttivo.value = Math.max(indiceAttivo.value - 1, -1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const idx = indiceAttivo.value >= 0 ? indiceAttivo.value : 0
    const scelto = risultati.value[idx]
    if (scelto) {
      emit('select', scelto)
    }
  } else if (e.key === 'Escape') {
    haFocus.value = false
  }
}

function cancella() {
  testo.value = ''
  risultati.value = []
  if (refInput.value) {
    refInput.value.focus()
  }
}

function setQuery(v) {
  testo.value = v
}

function bandiera(cca2) {
  return [...(cca2 || '').toUpperCase()].map(function(c) {
    return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
  }).join('')
}

defineExpose({ setQuery, clearQuery: cancella })
</script>
