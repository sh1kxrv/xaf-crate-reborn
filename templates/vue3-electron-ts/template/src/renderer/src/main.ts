import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IconWrapper } from '~/components'
import router from './router'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.component('icon-wrapper', IconWrapper)
app.use(router).use(pinia)

router.isReady().then(() => app.mount('#app'))
