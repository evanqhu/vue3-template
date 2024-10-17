// 客户端入口文件
// 用于挂载应用实例，将服务端渲染的 HTML 转换为可交互的 DOM（Hydrate）
import "@/styles/main.scss"

import { createApp } from "@/main"

const initializeApp = async () => {
  const { app, store, router } = await createApp("client")

  // 将服务端渲染的初始状态注入到 store 中
  if (window.__INITIAL_STATE__) {
    const stateObj = JSON.parse(window.__INITIAL_STATE__)
    // 似乎可以解决服务端的状态注入到客户端时不匹配的问题
    for (const key in store.state.value) {
      Object.assign(store.state.value[key], stateObj[key])
    }

    // store.state.value = stateObj
    // NOTE 这里需手动修改 appStore 中的值，直接通过 store.state.value 修改无效
    // appStore.toggleDevice(!stateObj.app.device ? DeviceEnum.Mobile : DeviceEnum.Desktop)
  }

  router.isReady().then(() => {
    app.mount("#app", true)
  })
}

initializeApp()
