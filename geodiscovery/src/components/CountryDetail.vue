<template>
  <div class="flex flex-col gap-4">

    <div class="card-ornate relative overflow-hidden">

      <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
           style="background-image: radial-gradient(circle at 70% 50%, #c4a060 0%, transparent 60%)"></div>

      <div class="flex flex-col sm:flex-row gap-6 items-start relative z-10">

        <div class="flex gap-5 items-center flex-1 min-w-0">

          <div class="relative shrink-0">
            <div class="w-28 h-20 rounded border-2 border-parchment-300 overflow-hidden shadow-parchment"
                 style="box-shadow: 0 2px 8px rgba(74,46,14,0.2), 0 0 0 4px rgba(196,160,96,0.12);">
              <img
                v-if="country.flags && (country.flags.svg || country.flags.png)"
                :src="country.flags.svg || country.flags.png"
                :alt="'Bandiera di ' + country.name.common"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl select-none bg-parchment-100">
                {{ bandiera(country.cca2) }}
              </div>
            </div>
            <span class="absolute -top-1 -left-1 text-parchment-400 font-display opacity-70" style="font-size:8px;">✦</span>
            <span class="absolute -top-1 -right-1 text-parchment-400 font-display opacity-70" style="font-size:8px;">✦</span>
          </div>

          <div class="min-w-0">
            <h1 class="font-display text-ink-900 tracking-tight leading-tight mb-0.5" style="font-size:clamp(1.4rem,3vw,2rem); letter-spacing:0.02em;">
              {{ country.name.common }}
            </h1>
            <p class="font-body text-ink-400 italic mb-3 text-sm">
              {{ country.name.official }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span class="badge badge-blue">{{ capitale }}</span>
              <span class="badge badge-green">{{ country.region }}</span>
              <span v-if="country.subregion" class="badge badge-amber">{{ country.subregion }}</span>
              <span v-if="country.independent" class="badge badge-green">Indipendente</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 shrink-0 w-full sm:w-auto">
          <div class="hero-stat-card">
            <span class="block font-display text-ink-800 leading-tight mb-0.5" style="font-size:0.95rem; letter-spacing:0.02em;">{{ formatta(country.population) }}</span>
            <span class="block font-display text-parchment-500" style="font-size:0.6rem; letter-spacing:0.12em;">POPOLAZIONE</span>
          </div>
          <div class="hero-stat-card">
            <span class="block font-display text-ink-800 leading-tight mb-0.5" style="font-size:0.95rem; letter-spacing:0.02em;">{{ country.area ? formatta(Math.round(country.area)) : '—' }}</span>
            <span class="block font-display text-parchment-500" style="font-size:0.6rem; letter-spacing:0.12em;">AREA KM²</span>
          </div>
          <div class="hero-stat-card">
            <span class="block font-display text-ink-800 leading-tight mb-0.5" style="font-size:0.95rem; letter-spacing:0.02em;">{{ valutaFormattata }}</span>
            <span class="block font-display text-parchment-500" style="font-size:0.6rem; letter-spacing:0.12em;">VALUTA</span>
          </div>
          <div class="hero-stat-card">
            <span class="block font-display text-ink-800 leading-tight mb-0.5 truncate" style="font-size:0.95rem; letter-spacing:0.02em;">{{ linguePrincipali }}</span>
            <span class="block font-display text-parchment-500" style="font-size:0.6rem; letter-spacing:0.12em;">LINGUE</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card relative overflow-hidden">

      <div class="flex items-center gap-3 mb-5">
        <span class="section-label">Dettagli</span>
        <div class="flex-1 h-px" style="background: linear-gradient(90deg, rgba(196,160,96,0.4), transparent)"></div>
        <span class="font-display text-parchment-400 opacity-40" style="font-size:0.6rem; letter-spacing:0.15em;">✦ ✦ ✦</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-0">

        <div>
          <p class="font-display text-compass-600 uppercase tracking-widest mb-3" style="font-size:0.6rem; letter-spacing:0.18em;">Geografico</p>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Capitale</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ country.capital && country.capital[0] ? country.capital[0] : '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Regione</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ country.region || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Sottoregione</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ country.subregion || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Fuso orario</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ country.timezones && country.timezones[0] ? country.timezones[0] : '—' }}</span>
          </div>
        </div>

        <div>
          <p class="font-display text-compass-600 uppercase tracking-widest mb-3" style="font-size:0.6rem; letter-spacing:0.18em;">Pratico</p>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Prefisso tel.</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ prefissoTel }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Guida a</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ country.car && country.car.side === 'left' ? 'Sinistra' : 'Destra' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Continente</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ country.continents && country.continents[0] ? country.continents[0] : '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Settimana inizia</span>
            <span class="font-display text-ink-700" style="font-size:0.82rem;">{{ inizioSettimana }}</span>
          </div>
        </div>

        <div>
          <p class="font-display text-compass-600 uppercase tracking-widest mb-3" style="font-size:0.6rem; letter-spacing:0.18em;">Codici</p>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">ISO 2</span>
            <span class="font-mono text-ink-700 bg-parchment-100 border border-parchment-200 px-1.5 py-0.5 rounded text-xs">{{ country.cca2 || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">ISO 3</span>
            <span class="font-mono text-ink-700 bg-parchment-100 border border-parchment-200 px-1.5 py-0.5 rounded text-xs">{{ country.cca3 || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">IOC</span>
            <span class="font-mono text-ink-700 bg-parchment-100 border border-parchment-200 px-1.5 py-0.5 rounded text-xs">{{ country.cioc || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="font-body text-ink-400 text-sm">Dominio TLD</span>
            <span class="font-mono text-ink-700 bg-parchment-100 border border-parchment-200 px-1.5 py-0.5 rounded text-xs">{{ country.tld && country.tld[0] ? country.tld[0] : '—' }}</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  country: { type: Object, required: true }
})

const capitale = computed(function() {
  if (props.country.capital && props.country.capital[0]) {
    return props.country.capital[0]
  }
  return '—'
})

const valutaFormattata = computed(function() {
  if (!props.country.currencies) {
    return '—'
  }
  const valuta = Object.values(props.country.currencies)[0]
  if (!valuta) {
    return '—'
  }
  if (valuta.symbol) {
    return valuta.symbol + ' ' + (valuta.name ? valuta.name.split(' ')[0] : '')
  }
  return valuta.name || '—'
})

const linguePrincipali = computed(function() {
  if (!props.country.languages) {
    return '—'
  }
  const lista = Object.values(props.country.languages)
  if (lista.length > 2) {
    return lista.slice(0, 2).join(', ') + '…'
  }
  return lista.join(', ') || '—'
})

const prefissoTel = computed(function() {
  const idd = props.country.idd
  if (!idd || !idd.root) {
    return '—'
  }
  return idd.root + (idd.suffixes && idd.suffixes[0] ? idd.suffixes[0] : '')
})

const inizioSettimana = computed(function() {
  const mappa = {
    monday:   'Lunedì',
    sunday:   'Domenica',
    saturday: 'Sabato'
  }
  return mappa[props.country.startOfWeek] || props.country.startOfWeek || '—'
})

function formatta(n) {
  if (!n && n !== 0) {
    return '—'
  }
  if (n >= 1e9) {
    return (n / 1e9).toFixed(1) + ' Mrd'
  }
  if (n >= 1e6) {
    return (n / 1e6).toFixed(1) + ' M'
  }
  if (n >= 1e3) {
    return (n / 1e3).toFixed(0) + ' K'
  }
  return n.toString()
}

function bandiera(cca2) {
  if (!cca2) {
    return '—'
  }
  return [...cca2.toUpperCase()].map(function(c) {
    return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
  }).join('')
}
</script>
