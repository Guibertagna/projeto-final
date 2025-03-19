import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'; // Importa o router corretamente
const app = createApp(App)

app.use(createPinia())
app.use(router); // Usa o router no app
app.mount('#app')
