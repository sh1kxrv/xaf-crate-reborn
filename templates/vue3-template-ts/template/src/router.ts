import { createWebHistory } from 'vue-router'
import { createRouter } from '~/core'
import HomeView from './views/home'
export default createRouter({
  history: createWebHistory(),
  routes: [...HomeView],
  global: [],
  middleware: true
})
