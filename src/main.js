import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Quasar, Loading } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
  .use(store)
  .use(router)
  .use(Quasar, {
    plugins: { Loading },
    config: {
      loading: {}
    }
  })
app.config.globalProperties.$axios = axios
app.mount('#app')
