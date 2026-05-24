import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const rotte = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/country/:name',
    name: 'country',
    component: function() {
      return import('@/views/CountryView.vue')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotte,
  scrollBehavior: function() {
    return { top: 0 }
  }
})

export default router
