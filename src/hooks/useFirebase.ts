// Firebase 服务
import { getAnalytics, logEvent } from "firebase/analytics"
import { initializeApp } from "firebase/app"

import { useAppStore } from "@/stores/modules/app"

export const useFirebase = () => {
  const appStore = useAppStore()
  const { webConfig } = appStore

  /** Firebase 配置 */
  const firebaseConfig = webConfig.firebase
  // console.log("🚀🚀🚀  firebaseConfig: ", firebaseConfig)

  /** 初始化 Firebase */
  const initializeFirebase = () => {
    const firebaseApp = initializeApp(firebaseConfig)

    // 启用 Analytics
    const analyticsInstance = getAnalytics(firebaseApp)
    return analyticsInstance
  }

  let customLogEvent: any
  let customEventTrack: any

  if (import.meta.env.SSR) {
    // 服务器端只定义简单的 log
    customLogEvent = (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Server Log: ${eventName}`, eventParams)
    }
    customEventTrack = (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Server Log: ${eventName}`, method, eventParams)
    }
  } else {
    try {
      const analytics = initializeFirebase()
      // 记录一个名为 "in_page" 的事件，表示用户进入页面
      logEvent(analytics, "in_page")
      console.log("🚀🚀🚀 firebase analytics: ", "in_page")

      // 覆盖默认的上报方法 1
      customLogEvent = (eventName: string, eventParams = {}) => {
        logEvent(analytics, eventName, eventParams)
        console.log("🚀🚀🚀 firebase analytics: ", eventName)
      }
      // 覆盖默认的上报方法 2 (增加了自定义的配置对象)
      customEventTrack = (eventName: string, method: string, eventParams = {}) => {
        const _eventParams = {
          time: new Date(),
          message: eventName,
          method,
          ...eventParams
        }
        logEvent(analytics, eventName, _eventParams)
        console.log("🚀🚀🚀 firebase analytics: ", eventName)
      }
    } catch (error) {
      console.log("🚀🚀🚀 Firebase Analytics not supported")
      customLogEvent = (eventName: string, eventParams = {}) => {
        console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
      }
      customEventTrack = (eventName: string, method: string, eventParams = {}) => {
        console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
      }
    }
  }

  return {
    customLogEvent,
    customEventTrack
  }
}
