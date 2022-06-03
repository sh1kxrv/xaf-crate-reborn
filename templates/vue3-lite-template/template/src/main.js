import { createApp } from 'vue'

import store from './vuex'

import App from './App.vue'
import IconWrapper from '~/components/icon-wrapper.vue'

const app = createApp(App)
app.component('icon-wrapper', IconWrapper)
app.use(store)

app.mount('#app')
