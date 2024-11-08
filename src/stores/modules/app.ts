import { defineStore } from "pinia"
import { ref } from "vue"

import { DeviceEnum } from "@/configs/constants"

export const useAppStore = defineStore("app", () => {
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Mobile)

  /** MenuDrawer 状态 */
  const menuDrawerOpened = ref(false)

  /** 调试广告模式 */
  const showDebug = ref(false)

  /** 网站配置 */
  const webConfig = ref()

  /** 切换设备类型 */
  const toggleDevice = (type: DeviceEnum) => {
    device.value = type
  }

  /** 切换 MenuDrawer 状态 */
  const toggleMenuDrawer = (type: boolean) => {
    menuDrawerOpened.value = type
  }

  /** 切换 debug 模式 */
  const toggleDebug = (type: boolean) => {
    showDebug.value = type
  }

  /** 设置 webConfig */
  const setWebConfig = (config: any) => {
    webConfig.value = config
  }

  return {
    device,
    menuDrawerOpened,
    showDebug,
    webConfig,
    toggleDevice,
    toggleMenuDrawer,
    toggleDebug,
    setWebConfig
  }
})
