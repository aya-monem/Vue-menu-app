import './assets/main.css'
import Toaster from '@meforma/vue-toaster';

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(Toaster).mount('#app')