import { defineStore } from "pinia"
import { ref } from "vue"

import { adSenseConfig } from "@/config/adSense"
import { DeviceEnum } from "@/config/constants"

export const useAppStore = defineStore("app", () => {
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Mobile)

  /** adSenseConfig */
  const adSense = ref(adSenseConfig)

  /** 调试广告模式 */
  const showDebug = ref(false)

  /** 切换设备类型 */
  const toggleDevice = (type: DeviceEnum) => {
    device.value = type
  }

  /** 切换 debug 模式 */
  const toggleDebug = (type: boolean) => {
    showDebug.value = type
  }

  return { device, adSense, showDebug, toggleDevice, toggleDebug }
})
