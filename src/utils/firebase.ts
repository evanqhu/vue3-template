import { getAnalytics, isSupported, logEvent } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import type { App } from "vue"

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id" // 这个 ID 是启用 Google Analytics 后生成的
}

/** 初始化 Firebase */
const initializeFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig)

  // 启用 Analytics
  const analyticsInstance = getAnalytics(firebaseApp)
  return analyticsInstance
}

/** 设置 Firebase */
export const setupAnalytics = (app: App, eventQueue: any[]) => {
  isSupported().then((result) => {
    if (result) {
      const analytics = initializeFirebase()

      // 记录一个名为 "in_page" 的事件，表示用户进入页面
      logEvent(analytics, "in_page")
      console.log("in_page")

      // 覆盖默认的上报方法
      app.config.globalProperties.$logEvent = (event, params = {}) => {
        console.log(event)
        logEvent(analytics, event, params)
      }

      app.config.globalProperties.$eventrack = (msg, method, map = {}) => {
        const params = { time: new Date(), message: msg, method: method, ...map }
        console.log(msg)
        logEvent(analytics, msg, params)
      }
      // 处理队列中的所有请求
      while (eventQueue.length > 0) {
        const queuedEvent = eventQueue.shift()
        if (queuedEvent.type === "log") {
          app.config.globalProperties.$logEvent(queuedEvent.event, queuedEvent.params)
        } else if (queuedEvent.type === "track") {
          app.config.globalProperties.$eventrack(
            queuedEvent.msg,
            queuedEvent.method,
            queuedEvent.map
          )
        }
      }
    } else {
      console.log("Firebase Analytics not supported")
    }
  })
}
