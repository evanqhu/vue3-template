// 通用代码，在服务器和客户端之间共享
import { createHead } from "@unhead/vue"
import { createSSRApp } from "vue"
import VueLazyLoad from "vue3-lazyload"

import App from "@/App.vue"
import { loadSvg } from "@/icons"
import { createRouter } from "@/router"
import { createStore } from "@/store"
import { setupAnalytics } from "@/utils/firebase"

/** 事件队列，用于在 Analytics 初始化之前暂存事件 */
const eventQueue: any[] = []

// SSR 每个请求都需要一个新的应用实例，因此我们导出一个函数来创建一个新的应用实例
// 如果使用状态管理器，我们也会在这里创建一个新的存储（store）
// 每次请求时调用
export function createApp(type: "client" | "server") {
  const app = createSSRApp(App)

  // 集成 Pinia 状态管理器
  const store = createStore()
  app.use(store)

  // 集成 Vue Router
  const router = createRouter(type)
  app.use(router)

  // 集成 unhead
  const head = createHead()
  // NOTE 可在此处注入元信息
  // head.push({
  //   meta: [
  //     {
  //       name: "description",
  //       content: "This is a description"
  //     }
  //   ]
  // })
  app.use(head)

  // 集成 VueLazyLoad
  app.use(VueLazyLoad, {})

  // 全局注册组件 SvgIcon
  loadSvg(app)

  // Firebase 相关
  app.config.globalProperties.$logEvent = (event, params = {}) => {
    console.log(`Queued log: ${event}`, params)
    eventQueue.push({ type: "log", event, params })
  }

  app.config.globalProperties.$eventrack = (msg, method, map = {}) => {
    console.log(`Queued track: ${msg}`, method, map)
    eventQueue.push({ type: "track", msg, method, map })
  }

  if (typeof window !== "undefined") {
    setupAnalytics(app, eventQueue)
  } else {
    // 服务器端只定义简单的 log
    app.config.globalProperties.$logEvent = (event, params = {}) => {
      console.log(`Server Log: ${event}`, params)
    }
    app.config.globalProperties.$eventrack = (event, params = {}) => {
      console.log(`Server Log: ${event}`, params)
    }
  }

  return { app, store, router, head }
}
