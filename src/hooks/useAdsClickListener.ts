/** 监听广告点击 */
import { onMounted } from "vue"

export const useAdsClickListener = () => {
  let isTrackingSetup = false // 是否已经设置监听
  let intervalTimer: NodeJS.Timeout | undefined // 定时器
  const iframeObjList: any[] = []

  /** 监听 iframe 是否被点击 */
  const setupIframeTracking = (iframe: HTMLIFrameElement, ad: HTMLElement) => {
    if (isTrackingSetup) {
      console.log("🚨🚨🚨 Tracking 已经设置，清除定时器，重新设置")
      clearInterval(intervalTimer)
    }
    isTrackingSetup = true
    iframeObjList.push({
      element: iframe,
      clicked: false,
      adSlot: ad.dataset.adSlot
    })

    const checkIframeClick = () => {
      const activeElement = document.activeElement
      if (activeElement) {
        iframeObjList.forEach((iframeObj) => {
          if (!iframeObj) return
          if (activeElement === iframeObj.element && !iframeObj.clicked) {
            iframeObj.clicked = true
            console.log("🚀🚀🚀 广告被点击 ad_click", iframeObj.adSlot)
          }
        })
      }
    }

    intervalTimer = setInterval(() => {
      checkIframeClick()
    }, 200)
  }

  onMounted(() => {
    /** 监听广告是否显示 */
    const mutationOb = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof Element &&
            node.tagName === "IFRAME" &&
            node.closest("ins.adsbygoogle")
          ) {
            console.log("🚀🚀🚀 有广告 iframe 插入", node, node.closest("ins.adsbygoogle"))
            setupIframeTracking(
              node as HTMLIFrameElement,
              node.closest("ins.adsbygoogle") as HTMLElement
            ) // 在检测到广告 iframe 插入后，调用 setupIframeTracking
          }
        })
      })
    })
    mutationOb.observe(document.body, { childList: true, subtree: true })
  })
}
