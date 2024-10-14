// Firebase 服务
import { getAnalytics, isSupported, logEvent } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import type { App } from "vue"

import { $eventTrack, $logEvent } from "@/config/constants"
import { defaultSettings } from "@/settings"

/** Firebase 配置 */
const firebaseConfig = defaultSettings.firebase

/** 初始化 Firebase */
const initializeFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig)

  // 启用 Analytics
  const analyticsInstance = getAnalytics(firebaseApp)
  return analyticsInstance
}

/** 设置 Firebase */
export const setupAnalytics = async (app: App) => {
  try {
    await isSupported()
    const analytics = initializeFirebase()
    console.log("🚀🚀🚀  analytics: ", analytics)

    // 记录一个名为 "in_page" 的事件，表示用户进入页面
    logEvent(analytics, "in_page")
    console.log("🚀🚀🚀 firebase analytics: ", "in_page")

    // 覆盖默认的上报方法 1
    app.provide($logEvent, (eventName: string, eventParams = {}) => {
      logEvent(analytics, eventName, eventParams)
      console.log("🚀🚀🚀 firebase analytics: ", eventName)
    })

    // 覆盖默认的上报方法 2 (增加了自定义的配置对象)
    app.provide($eventTrack, (eventName: string, method: string, eventParams = {}) => {
      const _eventParams = {
        time: new Date(),
        message: eventName,
        method,
        ...eventParams
      }
      logEvent(analytics, eventName, _eventParams)
      console.log("🚀🚀🚀 firebase analytics: ", eventName)
    })
  } catch (error) {
    console.log("🚀🚀🚀 Firebase Analytics not supported")
    app.provide($logEvent, (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
    })
    app.provide($eventTrack, (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
    })
  }
}
