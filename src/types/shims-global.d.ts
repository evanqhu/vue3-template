// src/types/shims-global.d.ts
declare global {
  interface Window {
    __INITIAL_STATE__: string
    adsbygoogle: any
  }
}

// 现有声明不变
export {}
