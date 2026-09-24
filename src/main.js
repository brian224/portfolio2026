import '@css/_library.css'

import mIcon from '@components/modules/mIcon.vue'

import { createApp } from 'vue'
import App from './App.vue'

import pinia from '@stores'
import router from '@router'

const app = createApp(App)

app.component('mIcon', mIcon)

app.use(pinia)
app.use(router)

app.mount('#app')
