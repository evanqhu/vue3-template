import { storeToRefs } from "pinia"
import { nextTick, onActivated, onMounted } from "vue"

import { useAppStore } from "@/store/modules/app"

// 加载 Google AdSense 的 hook
export const useAdSense = (adsRefs: any) => {
  const appStore = useAppStore()
  const { adSense } = storeToRefs(appStore)

  /** 加载脚本 URL */
  const loadAdSenseScript = () => {
    // 检查广告脚本是否加载
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      console.log("Adsense script already loaded.")
      // TODO 使用 inject 的全局方法
      // this.$eventrack("adscript_loaded", "expose")
      loadAdWithDelay()
      return
    }

    console.log("🚀🚀🚀 adsensConfig: ", adSense.value)
    // 如果不存在广告脚本 URL，则不加载
    if (!adSense.value?.scriptUrl) {
      console.log("🚀🚀🚀 广告脚本的 URL 不存在，终止加载广告外链")
      // this.$eventrack("no_adscript_config", "expose")
      return
    }
    // 如果脚本已被加载，则不加载
    const existingScript = document.querySelector(`script[src="${adSense.value.scriptUrl}"]`)
    if (existingScript) {
      // this.$eventrack("adscript_exist", "expose")
      console.log("🚀🚀🚀 脚本已存在，无需重新添加")
      return
    }
    // 脚本存在且未被加载
    console.log("🚀🚀🚀 准备插入脚本")
    const script = document.createElement("script")
    script.src = adSense.value.scriptUrl
    script.crossOrigin = "anonymous"
    script.async = true
    document.head.appendChild(script)

    // this.$eventrack("adscript_add_success", "expose")
    console.log("🚀🚀🚀 脚本插入完成，加载完成，执行加载插入广告及监听操作")
    script.onerror = () => console.error("🚀🚀🚀 广告脚本加载失败")
    script.onload = loadAdWithDelay
  }

  /** 延迟加载广告 */
  const loadAdWithDelay = () => {
    setTimeout(() => displayAd(), 500)
  }

  /** 加载广告 */
  const displayAd = async () => {
    await nextTick() // 等待 DOM 更新完成
    const adsElements = adsRefs.value // 获取所有元素数组
    if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
      console.log("Adsense script not loaded yet, delaying ad display.")
      setTimeout(displayAd, 500) // 延迟再次尝试
      return
    }

    // 遍历所有广告元素并加载广告
    adsElements.forEach((element: any, index) => {
      console.log(`🚀🚀🚀 ready to push ad${index + 1}`, element.value.adsAttrs)
      ;(window.adsbygoogle = window.adsbygoogle || []).push({}) // 加载广告
    })
  }

  onMounted(() => {
    console.log("🚀🚀🚀 onMounted")
    loadAdSenseScript()
  })

  onActivated(() => {
    console.log("🚀🚀🚀 onActivated")
    loadAdSenseScript()
  })
}
