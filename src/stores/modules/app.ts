import { defineStore } from "pinia"
import { ref } from "vue"

import { DeviceEnum } from "@/configs/constants"

export const useAppStore = defineStore("app", () => {
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Mobile)

  /** MenuDrawer 状态 */
  const menuDrawerOpened = ref(false)

  /** 网站配置 */
  const webConfig = ref<WebConfig>({} as WebConfig)

  /** 切换设备类型 */
  const toggleDevice = (type: DeviceEnum) => {
    device.value = type
  }

  /** 切换 MenuDrawer 状态 */
  const toggleMenuDrawer = (type: boolean) => {
    menuDrawerOpened.value = type
  }

  return {
    device,
    menuDrawerOpened,
    webConfig,
    toggleDevice,
    toggleMenuDrawer
  }
})
