<template>
  <div class="min-h-screen flex flex-col app-bg">

    <div class="fixed inset-0 pointer-events-none z-0 map-grid-overlay opacity-40"></div>

    <header
      class="sticky top-0 z-50 transition-all duration-300"
      :class="scorso
        ? 'bg-parchment-100/96 backdrop-blur-md border-b border-parchment-300 shadow-parchment'
        : 'bg-transparent'"
    >
      <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between relative">

        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-8 h-8 relative flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
              <circle cx="16" cy="16" r="14" stroke="#c4a060" stroke-width="1.5"/>
              <circle cx="16" cy="16" r="11" stroke="#c4a060" stroke-width="0.5" stroke-dasharray="2 2"/>
              <line x1="16" y1="3" x2="16" y2="7" stroke="#c4a060" stroke-width="1.5"/>
              <line x1="16" y1="25" x2="16" y2="29" stroke="#c4a060" stroke-width="1.5"/>
              <line x1="3" y1="16" x2="7" y2="16" stroke="#c4a060" stroke-width="1.5"/>
              <line x1="25" y1="16" x2="29" y2="16" stroke="#c4a060" stroke-width="1.5"/>
              <polygon points="16,8 17.2,16 16,17 14.8,16" fill="#8b3a1a"/>
              <polygon points="16,24 17.2,16 16,17 14.8,16" fill="#5a5a5a"/>
              <circle cx="16" cy="16" r="1.5" fill="#c4a060"/>
            </svg>
          </div>
          <div>
            <span
              class="font-decorative text-base tracking-wider leading-none block transition-colors"
              :class="scorso ? 'text-ink-800' : 'text-parchment-100'"
              style="font-size: 0.95rem; letter-spacing: 0.12em;"
            >GeoDiscovery</span>
            <span
              class="text-xs tracking-widest leading-none font-display transition-colors"
              :class="scorso ? 'text-parchment-500' : 'text-parchment-300/60'"
              style="font-size: 0.55rem; letter-spacing: 0.2em;"
            >ATLAS MUNDI</span>
          </div>
        </router-link>

      </div>
    </header>

    <main class="flex-1 relative z-10 -mt-[52px]">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="relative z-10 border-t border-parchment-300/60 py-5 bg-parchment-100/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">

        <div class="flex items-center gap-3">
          <svg viewBox="0 0 20 20" fill="none" class="w-5 h-5 text-parchment-500">
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" stroke-width="1"/>
            <circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1.5 1.5"/>
            <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" stroke-width="0.5"/>
            <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="0.5"/>
          </svg>
          <span class="font-display text-parchment-500" style="font-size:0.65rem; letter-spacing:0.15em;">GEODISCOVERY · ATLAS MUNDI · MMXXVI</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="w-1 h-1 rounded-full bg-parchment-400"></span>
          <p class="font-body text-parchment-400" style="font-size:0.72rem;">Vue 3 · Tailwind · MapLibre · REST Countries · AI</p>
          <span class="w-1 h-1 rounded-full bg-parchment-400"></span>
        </div>

      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scorso = ref(false)

function controllaScroll() {
  scorso.value = window.scrollY > 40
}

onMounted(function() {
  window.addEventListener('scroll', controllaScroll, { passive: true })
})

onBeforeUnmount(function() {
  window.removeEventListener('scroll', controllaScroll)
})
</script>
