// 客户端入口文件
// 用于挂载应用实例，将服务端渲染的 HTML 转换为可交互的 DOM（Hydrate）
import "@/styles/main.scss"

import { DeviceEnum } from "@/config/constants"
import { createApp } from "@/main"
import { useAppStore } from "@/store/modules/app"

const initializeApp = async () => {
  const { app, store, router } = await createApp("client")
  const appStore = useAppStore()

  // 将服务端渲染的初始状态注入到 store 中
  if (window.__INITIAL_STATE__) {
    const stateObj = JSON.parse(window.__INITIAL_STATE__)
    store.state.value = stateObj
    // NOTE 这里需手动修改 appStore 中的值，直接通过 store.state.value 修改无效
    appStore.toggleDevice(!stateObj.app.device ? DeviceEnum.Mobile : DeviceEnum.Desktop)
  }

  router.isReady().then(() => {
    app.mount("#app", true)
  })
}

initializeApp()
