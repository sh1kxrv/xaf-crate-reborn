import { createApp } from 'vue'

import router from './router'
import store from './vuex'

import App from './App.vue'
import { createMiddleware } from './router.middleware'

import InitializeViews from '~/views'
InitializeViews(router, store)

// Инициализация middleware
createMiddleware(router, store)

const app = createApp(App)
app.use(router).use(store)

router.isReady().then(() => app.mount('#app'))
