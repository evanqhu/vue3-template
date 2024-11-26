// src/types/shims-global.d.ts
import type { WebConfig as ConfigType } from "@/web-configs"

declare global {
  interface Window {
    __INITIAL_STATE__: string
    adsbygoogle: any
  }

  type WebConfig = ConfigType
}

// 现有声明不变
export {}
