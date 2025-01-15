/** 监听广告点击 */
import { inject, onMounted } from "vue"

import { $eventTrack, type eventTrackType } from "@/configs/constants"

export const useAdsClickListener = () => {
  /** firebase 的函数 */
  const eventTrack = inject($eventTrack) as eventTrackType

  let isTrackingSetup = false // 是否已经设置监听
  let intervalTimer: NodeJS.Timeout | undefined // 定时器
  const iframeObjList: any[] = [] // iframe 对象列表

  /** 监听 iframe 是否被点击 */
  const setupIframeTracking = (iframe: HTMLIFrameElement, ins: HTMLElement) => {
    if (isTrackingSetup) {
      console.log("🚨🚨🚨 Tracking 已经设置，清除定时器，重新设置")
      clearInterval(intervalTimer)
    }
    isTrackingSetup = true
    // const iframes = document.querySelectorAll("iframe")
    // const iframeObjList: any[] = []
    // iframes.forEach((iframe) => {
    //   const ad = iframe.closest("ins.adsbygoogle") as HTMLElement
    //   const obj = {
    //     element: iframe,
    //     clicked: false,
    //     adSlot: ad?.dataset.adSlot
    //   }
    //   iframeObjList.push(obj)
    // })
    iframeObjList.push({
      element: iframe,
      ins,
      clicked: false,
      adSlot: ins.dataset.adSlot
    })

    const checkIframeClick = () => {
      const activeElement = document.activeElement
      if (activeElement) {
        iframeObjList.forEach((iframeObj) => {
          if (!iframeObj) return
          if (activeElement === iframeObj.element && !iframeObj.clicked) {
            iframeObj.clicked = true
            console.log("🚀🚀🚀 广告被点击 ad_click", iframeObj.adSlot)
            // 获取 ins 元素的边界矩形
            const insRect = iframeObj.ins.getBoundingClientRect()

            // 计算 ins 元素相对于页面左上角的位置和高度
            const transformData = {
              insX: insRect.left,
              insY: insRect.top,
              insHeight: insRect.height,
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight
            }

            // 1. JSCallAndroid 调用
            if (window.JSCallAndroid && typeof window.JSCallAndroid === "function") {
              window.JSCallAndroid.adClick(JSON.stringify(transformData))
            } else {
              console.log("🚀🚀🚀 transformData: ", transformData)
            }

            // 2. firebase 上报
            eventTrack("ad_click", "click", {
              "data-ad-slot": iframeObj.adSlot
            })
          }
        })
      }
    }

    intervalTimer = setInterval(() => {
      checkIframeClick()
    }, 200)
  }

  onMounted(() => {
    /** 1. 监听广告是否插入并显示 */
    const mutationOb = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof Element &&
            node.tagName === "IFRAME" &&
            node.closest("ins.adsbygoogle")
          ) {
            console.log("🚀🚀🚀 有广告 iframe 插入", node, node.closest("ins.adsbygoogle"))
            // 2. 在检测到广告 iframe 插入后，调用 setupIframeTracking
            setupIframeTracking(
              node as HTMLIFrameElement,
              node.closest("ins.adsbygoogle") as HTMLElement
            )
          }
        })
      })
    })
    mutationOb.observe(document.body, { childList: true, subtree: true })
  })
}
