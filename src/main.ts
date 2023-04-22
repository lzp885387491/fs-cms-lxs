import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@/assets/lib/lib-flexiable.js"
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import './assets/main.css'
import 'video.js/dist/video-js.css'
import Video from 'video.js'
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
import video_en from 'video.js/dist/lang/en.json'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

Video.addLanguage('zh-CN', video_zhCN);
Video.addLanguage('en', video_en);

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
