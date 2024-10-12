// 封装 axios
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from "axios"
import axios from "axios"

import { AxiosCanceler } from "@/api/helper/axiosCanceler"

/** 响应数据格式，与后端协商确定 */
export interface ResponseData<T> {
  code: number
  message: string
  data?: T
}

/** 这些自定义的参数字段直接放在 axios 的 config 中，放在最外层，使用模块扩展来定义 */
// export interface RequestConfigData {
//   cancelRequest?: boolean // 是否取消重复请求，默认为 true
//   retry?: number // 请求重试次数
//   retryDelay?: number // 请求重试时间间隔
//   cache?: boolean // 是否缓存请求
//   setExpireTime?: number // 设置缓存时间
// }

/** 请求状态码枚举类型 */
export enum RequestEnum {
  SUCCESS = 0,
  TIMEOUT = 10000
}

/** 创建 axios 实例时的配置项 */
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_BASE_API, // 例如：https://api.example.com
  // 设置超时时间
  timeout: RequestEnum.TIMEOUT,
  // 跨域时候允许携带凭证
  withCredentials: true
}

/* 用于创建 axios 实例的类 */
class RequestFactory {
  // 显式声明实例属性
  private instance: AxiosInstance

  constructor(config: CreateAxiosDefaults) {
    // 创建 axios 实例
    this.instance = axios.create(config)

    // 1️⃣ 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 1. 取消请求
        const { cancelRequest = true } = config
        // 将当前请求添加到 pending 中
        if (cancelRequest) {
          AxiosCanceler.addPending(config)
        }
        // 2. 处理 token
        // 3. 重试请求
        // 4. 缓存请求等

        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    // 2️⃣ 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData<any>>): any => {
        if (response.status === 200) {
          const { data, config } = response
          // 请求结束成功后，移除本次请求
          AxiosCanceler.removePending(config)

          // 请求成功
          if (data.code === RequestEnum.SUCCESS) {
            return data
          }

          console.error(`😰😰😰 响应数据状态码异常：\n`, data)
          // reject() 中的内容会作为 error 对象传递给 .catch 方法或者 try catch 的 catch 方法
          // 这里 reject() 函数中可以不传参数，尽量不在每个请求中都用 catch 方法来打印错误信息，没必要，在这里全局打印一次即可
          // 如果不 return，程序会一直向下执行，如果到函数体结束都没有 return，会当做 return undefined
          // 只有 return 一个 Promise.reject()，才能在后面的 catch 中捕获到，否则都会走 await 成功后面的程序
          return Promise.reject(data)
        }
        console.error(`😰😰😰 网络请求结果异常：\n`, response)
        return Promise.reject(response)
      },
      (error: AxiosError) => {
        const { config } = error
        // 请求失败时，移除本次请求
        AxiosCanceler.removePending(config!)
        console.error(`😰😰😰 网络请求失败：\n`, error)
        return Promise.reject(error)
      }
    )
  }

  /**
   * 🎯 封装 get 请求
   * @param url 请求地址
   * @param config 请求配置对象
   * @description 泛型 T 表示当前接口的响应数据格式；请求数据格式不用泛型传递，在箭头函数的 params 参数中定义即可
   */
  get<T, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config)
  }

  /**
   * 🎯 封装 post 请求
   * @param url 请求地址
   * @param data 携带的参数
   * @param config 请求配置对象
   */
  post<T, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config)
  }

  /**
   * 🎯 封装 put 请求
   * @param url 请求地址
   * @param data 携带的参数
   * @param config 请求配置对象
   */
  put<T, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put(url, data, config)
  }

  /**
   * 🎯 封装 delete 请求
   * @param url 请求地址
   * @param config 请求配置对象
   */
  delete<T, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete(url, config)
  }
}

export default new RequestFactory(config)
