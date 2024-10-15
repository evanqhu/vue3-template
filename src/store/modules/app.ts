import { defineStore } from "pinia"
import { ref } from "vue"

import { DeviceEnum } from "@/config/constants"
import { defaultSettings } from "@/settings"

export const useAppStore = defineStore("app", () => {
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Mobile)

  /** MenuDrawer 状态 */
  const menuDrawerOpened = ref(false)

  /** adSenseConfig */
  const adSense = ref(defaultSettings.adSense)

  /** 调试广告模式 */
  const showDebug = ref(false)

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

  return {
    device,
    menuDrawerOpened,
    adSense,
    showDebug,
    toggleDevice,
    toggleMenuDrawer,
    toggleDebug
  }
})
