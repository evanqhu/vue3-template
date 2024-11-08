import { computed } from "vue"

import { DeviceEnum } from "@/configs/constants"
import { useAppStore } from "@/stores/modules/app"

export const useDevice = () => {
  const appStore = useAppStore()
  const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
  const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)
  return { isMobile, isDesktop }
}
