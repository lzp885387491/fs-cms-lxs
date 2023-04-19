import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@/assets/lib/lib-flexiable.js"
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
