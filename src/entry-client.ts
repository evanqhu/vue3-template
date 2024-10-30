// 客户端入口文件
// 用于挂载应用实例，将服务端渲染的 HTML 转换为可交互的 DOM（Hydrate）
import "@/styles/main.scss"

import { createApp } from "@/main"

const initializeApp = async () => {
  const { app, store, router } = await createApp("client")

  // 将服务端渲染的初始状态注入到 store 中
  if (window.__INITIAL_STATE__) {
    const stateObj = JSON.parse(window.__INITIAL_STATE__)
    // NOTE 很奇怪，这两种方式有时候第一种生效，有时候第二种生效
    // for (const key in store.state.value) {
    //   Object.assign(store.state.value[key], stateObj[key])
    // }

    store.state.value = stateObj // 无效操作（有时候生效）
  }

  router.isReady().then(() => {
    app.mount("#app", true)
  })
}

initializeApp()
