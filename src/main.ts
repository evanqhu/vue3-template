// 通用代码，在服务器和客户端之间共享
import { createHead } from "@unhead/vue"
import { createSSRApp } from "vue"
import VueLazyLoad from "vue3-lazyload"

import App from "@/App.vue"
import AdSense from "@/components/AdSense/index.vue"
import { loadSvg } from "@/icons"
import { createRouter } from "@/router"
import { createStore } from "@/store"
import { setupAnalytics } from "@/utils/firebase"

import { $eventTrack, $logEvent } from "./config/constants"

/** 事件队列，用于在 Analytics 初始化之前暂存事件 */

const appTitle = import.meta.env.VITE_APP_TITLE

// SSR 每个请求都需要一个新的应用实例，因此我们导出一个函数来创建一个新的应用实例
// 如果使用状态管理器，我们也会在这里创建一个新的存储（store）
// 每次请求时调用
export const createApp = async (type: "client" | "server") => {
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
  head.push({
    meta: [
      {
        name: "og:title",
        content: appTitle
      }
    ]
  })
  app.use(head)
  // const demo = await head.resolveTags()
  // console.log("🚀🚀🚀  demo: ", demo)

  // 集成 VueLazyLoad
  app.use(VueLazyLoad, {})

  // 全局注册组件 SvgIcon
  loadSvg(app)

  // 全局注册组件 AdSense
  app.component("AdSense", AdSense)

  // Firebase 相关
  if (import.meta.env.SSR) {
    // 服务器端只定义简单的 log
    app.provide($logEvent, (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Server Log: ${eventName}`, eventParams)
    })
    app.provide($eventTrack, (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Server Log: ${eventName}`, method, eventParams)
    })
  } else {
    await setupAnalytics(app)
  }

  return { app, store, router, head }
}
