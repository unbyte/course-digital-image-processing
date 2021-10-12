import { createApp } from 'vue'
import { App } from './App'
import './global.less'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/tailwind-light/theme.css'
import Tooltip from 'primevue/tooltip'

createApp(App).use(PrimeVue).directive('tooltip', Tooltip).mount('#app')
