import { defineStore } from "pinia"
import { ref } from "vue"

import { adSenseConfig } from "@/config/adSense"
import { DeviceEnum } from "@/config/constants"

export const useAppStore = defineStore("app", () => {
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Mobile)

  /** adSenseConfig */
  const adSense = ref(adSenseConfig)

  /** 切换设备类型 */
  const toggleDevice = (type: DeviceEnum) => {
    device.value = type
  }

  return { device, adSense, toggleDevice }
})
