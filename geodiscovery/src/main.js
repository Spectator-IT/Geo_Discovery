import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'

const handlerOriginale = window.onerror

window.onerror = function (messaggio, sorgente, riga, colonna, errore) {
  if (messaggio && messaggio.toString().includes('ResizeObserver')) {
    return true
  }
  if (handlerOriginale) {
    return handlerOriginale(messaggio, sorgente, riga, colonna, errore)
  }
  return false
}

createApp(App).use(router).mount('#app')
