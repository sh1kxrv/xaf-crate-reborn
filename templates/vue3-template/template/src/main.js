import { createApp } from 'vue'

import router from './router'
import store from './vuex'

import App from './App.vue'ue'

import InitializeViews from '~/views'
InitializeViews(router, store)

const app = createApp(App)
app.component('icon-wrapper', IconWrapper)
app.use(router).use(store)

router.isReady().then(() => app.mount('#app'))

import IconWrapper from '~/components/icon-wrapper.v