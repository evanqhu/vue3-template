import { defineStore } from "pinia"
import { ref } from "vue"

import { DeviceEnum } from "@/config/constants"

export const useAppStore = defineStore("app", () => {
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Mobile)

  /** 切换设备类型 */
  const toggleDevice = (type: DeviceEnum) => {
    device.value = type
  }

  return { device, toggleDevice }
})
