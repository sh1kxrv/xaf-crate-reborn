import { createWebHistory } from 'vue-router'
import { createRouter } from './core/middleware'
import { HomeView } from '~/views'

export default createRouter({
  history: createWebHistory(),
  routes: [...HomeView],
  middleware: true,
  global: []
})
