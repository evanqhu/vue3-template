import { createPinia } from "pinia"

import useCounterStore from "./modules/counter"

/** 用于创建和返回 pinia 实例的函数 */
export const createStore = () => {
  const pinia = createPinia()

  // 在处理服务器端渲染时，您必须将 pinia 实例传递给 useStore()。这可以防止 pinia 在不同的应用程序实例之间共享全局状态。
  useCounterStore(pinia)

  return pinia
}
