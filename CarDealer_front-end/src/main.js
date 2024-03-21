/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import Router from './routers/router'
import Store from './store/store'

// Composables
import { createApp } from 'vue'
import { createStore } from 'vuex'

const app = createApp(App)
const store = createStore(Store)

registerPlugins(app)
app.use(Router)
app.use(store)
app.mount('#app')

