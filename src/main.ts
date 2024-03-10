import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createProgress } from './plugins/progress'

const app = createApp(App)

app.use(router)
app.use(createProgress())

app.mount('#app')
