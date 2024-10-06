// import '@/styles/main.css'
import "@/styles/main.scss"
import "@/router/permission" // 路由守卫（在 app.use(router) 之前执行）

import { createApp } from "vue"

import App from "@/App.vue"
import { loadSvg } from "@/icons"
import router from "@/router"
import store from "@/store"

const app = createApp(App)

// 全局注册组件 SvgIcon
loadSvg(app)

app.use(store)
app.use(router)

/** 等待路由器准备完毕，挂载应用 */
router.isReady().then(() => {
  app.mount("#app")
})
