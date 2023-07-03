import IconWrapper from '~/components/icon-wrapper.vue'
import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia)

app.component('icon-wrapper', IconWrapper)

await router.isReady()

app.mount('#app')
