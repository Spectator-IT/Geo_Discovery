<template>
  <div v-if="borders && borders.length" class="card">

    <div class="flex items-center gap-3 mb-4">
      <svg viewBox="0 0 14 14" fill="none" class="w-3.5 h-3.5 text-compass-600 shrink-0">
        <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1"/>
        <polygon points="7,2 7.8,7 7,7.5 6.2,7" fill="currentColor"/>
        <polygon points="7,12 7.8,7 7,7.5 6.2,7" fill="currentColor" opacity="0.4"/>
        <circle cx="7" cy="7" r="1" fill="currentColor"/>
      </svg>
      <span class="section-label">Confina con</span>
      <div class="flex-1 h-px" style="background: linear-gradient(90deg, rgba(196,160,96,0.4), transparent)"></div>
      <span class="badge badge-blue">{{ borders.length }}</span>
    </div>

    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="codice in borders" :key="codice"
        class="btn-ghost"
        @click="$emit('select', codice)"
      >{{ borderMap[codice] || codice }}</button>
    </div>

  </div>
</template>

<script setup>
defineProps({
  borders:   { type: Array,  default: function() { return [] } },
  borderMap: { type: Object, default: function() { return {} } }
})

defineEmits(['select'])
</script>
