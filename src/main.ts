// 通用代码，在服务器和客户端之间共享
import { createHead } from "@unhead/vue"
import { createSSRApp } from "vue"
import VueLazyLoad from "vue3-lazyload"

import App from "@/App.vue"
import AdsbyGoogle from "@/components/AdsbyGoogle/index.vue"
import { loadSvg } from "@/icons"
import { createRouter } from "@/router"
import { createStore } from "@/stores"

// SSR 每个请求都需要一个新的应用实例，因此我们导出一个函数来创建一个新的应用实例
// 如果使用状态管理器，我们也会在这里创建一个新的存储（store）
// 每次请求时调用
export async function createApp(type: "client" | "server") {
  const app = createSSRApp(App)

  // 集成 Pinia 状态管理器
  const store = createStore()
  app.use(store)

  // 集成 Vue Router
  const router = createRouter(type)
  app.use(router)

  // 集成 unhead
  const head = createHead()
  app.use(head)

  // 集成 VueLazyLoad
  app.use(VueLazyLoad, {})

  // 全局注册组件 SvgIcon
  loadSvg(app)

  // 全局注册组件 AdSense
  app.component("AdsbyGoogle", AdsbyGoogle)

  return { app, store, router, head }
}
