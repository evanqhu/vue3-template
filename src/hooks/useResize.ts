import { onBeforeMount, onBeforeUnmount } from "vue"

import { DeviceEnum } from "@/configs/constants"
import { useAppStore } from "@/stores/modules/app"

export const useResize = () => {
  const appStore = useAppStore()

  const _resizeHandler = () => {
    // 根据 UA 判断当前设备类型
    const userAgent = navigator.userAgent.toLocaleLowerCase()
    const isMobile = /mobile|android|webos|iphone|ipod|blackberry/i.test(userAgent)
    appStore.toggleDevice(isMobile ? DeviceEnum.Mobile : DeviceEnum.Desktop)
  }

  onBeforeMount(() => {
    window.addEventListener("resize", _resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", _resizeHandler)
  })
}
