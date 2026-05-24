<template>
  <div class="card-dark flex flex-col gap-0 relative overflow-hidden" style="border-color: rgba(196,160,96,0.3);">

    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 18" :key="i"
           class="absolute rounded-full bg-parchment-300"
           :style="{
             width:  (Math.random() * 1.5 + 0.5) + 'px',
             height: (Math.random() * 1.5 + 0.5) + 'px',
             top:    (Math.random() * 100) + '%',
             left:   (Math.random() * 100) + '%',
             opacity: Math.random() * 0.25 + 0.05
           }">
      </div>
    </div>

    <div class="flex items-center justify-center py-4 border-b relative" style="border-color: rgba(196,160,96,0.18);">
      <svg viewBox="0 0 120 12" class="w-24 text-parchment-500 opacity-50">
        <line x1="0" y1="6" x2="45" y2="6" stroke="currentColor" stroke-width="0.7"/>
        <circle cx="54" cy="6" r="2.5" stroke="currentColor" stroke-width="0.7" fill="none"/>
        <circle cx="60" cy="6" r="4" stroke="currentColor" stroke-width="0.7" fill="none"/>
        <circle cx="66" cy="6" r="2.5" stroke="currentColor" stroke-width="0.7" fill="none"/>
        <line x1="75" y1="6" x2="120" y2="6" stroke="currentColor" stroke-width="0.7"/>
      </svg>
    </div>

    <div class="px-5 pt-5 pb-4 relative z-10">
      <div class="flex items-center gap-2 mb-3">
        <svg viewBox="0 0 10 10" class="w-2.5 h-2.5 text-parchment-400">
          <circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1" fill="none"/>
          <circle cx="5" cy="5" r="1.5" fill="currentColor"/>
        </svg>
        <span class="font-display text-parchment-400 tracking-widest uppercase" style="font-size:0.58rem; letter-spacing:0.22em;">
          Ritratto Culturale
        </span>
      </div>

      <div v-if="loadingRitratto" class="flex flex-col gap-2.5">
        <span class="shimmer-line w-full" style="background: linear-gradient(90deg, #2a1a0a 25%, #3a2a14 50%, #2a1a0a 75%); background-size:200% 100%; animation: shimmer 2s infinite;"></span>
        <span class="shimmer-line w-4/5" style="background: linear-gradient(90deg, #2a1a0a 25%, #3a2a14 50%, #2a1a0a 75%); background-size:200% 100%; animation: shimmer 2s infinite 0.2s;"></span>
        <span class="shimmer-line w-full" style="background: linear-gradient(90deg, #2a1a0a 25%, #3a2a14 50%, #2a1a0a 75%); background-size:200% 100%; animation: shimmer 2s infinite 0.4s;"></span>
      </div>
      <p v-else-if="ritratto" class="font-body text-parchment-300 leading-relaxed italic" style="font-size:0.95rem;">{{ ritratto }}</p>
      <p v-else class="font-body text-parchment-600 italic text-sm">Ritratto non disponibile.</p>
    </div>

    <div class="mx-5 border-t" style="border-color: rgba(196,160,96,0.15);"></div>

    <div class="px-5 py-4 relative z-10">
      <div class="flex items-center gap-2 mb-3">
        <svg viewBox="0 0 10 10" class="w-2.5 h-2.5 text-parchment-400">
          <path d="M5 1L5 9M1 5L9 5M2 2L8 8M8 2L2 8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
        </svg>
        <span class="font-display text-parchment-400 tracking-widest uppercase" style="font-size:0.58rem; letter-spacing:0.22em;">
          Itinerario · 3 Giorni
        </span>
      </div>

      <div v-if="loadingVacanza" class="flex flex-col gap-2.5">
        <span class="shimmer-line w-full" style="background: linear-gradient(90deg, #2a1a0a 25%, #3a2a14 50%, #2a1a0a 75%); background-size:200% 100%; animation: shimmer 2s infinite;"></span>
        <span class="shimmer-line w-3/4" style="background: linear-gradient(90deg, #2a1a0a 25%, #3a2a14 50%, #2a1a0a 75%); background-size:200% 100%; animation: shimmer 2s infinite 0.3s;"></span>
        <span class="shimmer-line w-full" style="background: linear-gradient(90deg, #2a1a0a 25%, #3a2a14 50%, #2a1a0a 75%); background-size:200% 100%; animation: shimmer 2s infinite 0.6s;"></span>
      </div>
      <p v-else-if="vacanza" class="font-body text-parchment-400 leading-relaxed whitespace-pre-line" style="font-size:0.85rem;">{{ vacanza }}</p>
      <p v-else class="font-body text-parchment-600 italic text-sm">Piano non disponibile.</p>
    </div>

    <div class="flex items-center justify-center py-3 border-t relative z-10" style="border-color: rgba(196,160,96,0.15);">
      <span class="font-display text-parchment-700 tracking-widest" style="font-size:0.5rem; letter-spacing:0.3em;">✦ AI CULTURALE ✦</span>
    </div>

  </div>
</template>

<script setup>
defineProps({
  ritratto:        { type: String,  default: '' },
  vacanza:         { type: String,  default: '' },
  loadingRitratto: { type: Boolean, default: false },
  loadingVacanza:  { type: Boolean, default: false }
})
</script>
