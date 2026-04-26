import '@css/_library.css'

import SvgIcon from '@components/SvgIcon.vue'

import { createApp } from 'vue'
import App from './App.vue'

import pinia from '@stores'
import router from '@router'

const app = createApp(App)

app.component('SvgIcon', SvgIcon)

app.use(pinia)
app.use(router)

app.mount('#app')
