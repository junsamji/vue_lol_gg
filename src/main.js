import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Quasar, Loading, Notify } from 'quasar'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
  .use(store)
  .use(router)
  .use(Quasar, {
    plugins: { Loading, Notify },
    config: {
      loading: {},
      Notify: {}
    }
  })
  .use(AOS.init())
app.config.globalProperties.$axios = axios
app.mount('#app')
