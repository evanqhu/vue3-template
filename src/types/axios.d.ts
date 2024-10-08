// 模块扩展
import "axios"

declare module "axios" {
  interface AxiosRequestConfig {
    cancelRequest?: boolean // 是否取消重复请求，默认为 true
    // retry?: number; // 请求重试次数
    // retryDelay?: number; // 请求重试时间间隔
    // cache?: boolean; // 是否缓存请求
    // setExpireTime?: number; // 设置缓存时间
  }
}
