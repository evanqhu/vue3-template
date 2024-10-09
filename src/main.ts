// import '@/styles/main.css'
import "@/styles/main.scss"

import { createApp } from "vue"

import App from "@/App.vue"
import Carousel3DPlugin from "@/components/Carousel3D" // 引入插件

const app = createApp(App)

// 注册插件
app.use(Carousel3DPlugin)

app.mount("#app")
