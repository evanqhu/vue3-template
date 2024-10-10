// 客户端入口文件
// 用于挂载应用实例，将服务端渲染的 HTML 转换为可交互的 DOM（Hydrate）
import "@/styles/main.scss"

import { createApp } from "./main"

const { app, store, router } = createApp("client")

// 将服务端渲染的初始状态注入到 store 中
if (window.__INITIAL_STATE__) {
  store.state.value = JSON.parse(window.__INITIAL_STATE__)
}

router.isReady().then(() => {
  app.mount("#app", true)
})
