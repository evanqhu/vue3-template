// 客户端入口文件
// 用于挂载应用实例，将服务端渲染的 HTML 转换为可交互的 DOM（Hydrate）
import "@/styles/main.scss"

import { createApp } from "@/main"

const initializeApp = async () => {
  const { app, router } = await createApp("client")

  router.isReady().then(() => {
    app.mount("#app", true)
  })
}

initializeApp()
