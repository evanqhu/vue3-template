import { createPinia } from "pinia"

/** 用于创建和返回 pinia 实例的函数 */
export const createStore = () => {
  const pinia = createPinia()

  return pinia
}
