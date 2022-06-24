import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import IconWrapper from '~/components/icon-wrapper.vue'
import App from './App.vue'

import InitializeViews from '~/views'
InitializeViews(router, store)

const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia)

app.component('icon-wrapper', IconWrapper)

router.isReady().then(() => app.mount('#app'))
