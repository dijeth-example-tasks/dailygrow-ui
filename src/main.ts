import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createProgress } from './plugins/progress'
import { createToaster } from './plugins/toaster'
import { onUnauthenticated } from './api/httpClient/httpClient'
import { setUser } from './store'
import { useRouter } from 'vue-router'

onUnauthenticated(() => {
  setUser(null)
  useRouter().push({ name: 'login', query: { from: document.location.pathname } })
})

createApp(App).use(router).use(createToaster()).use(createProgress()).mount('#app')
