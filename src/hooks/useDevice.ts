import { computed } from "vue"

import { DeviceEnum } from "@/config/constants"
import { useAppStore } from "@/store/modules/app"

export const useDevice = () => {
  const appStore = useAppStore()
  const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
  const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)
  return { isMobile, isDesktop }
}
