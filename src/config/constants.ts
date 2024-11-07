import type { InjectionKey } from "vue"

/** 设备类型 */
export enum DeviceEnum {
  Mobile,
  Desktop
}

/** 封装 firebase 的 logEvent 方法 */
export type logEventType = (eventName: string, eventParams?: object) => void
export type eventTrackType = (eventName: string, method: string, eventParams?: object) => void

export const $logEvent = Symbol() as InjectionKey<logEventType>
export const $eventTrack = Symbol() as InjectionKey<eventTrackType>

/** Resource */
export const resourceList = [
  {
    name: "Daily horoscope",
    path: "/"
  },
  {
    name: "Weekly horoscope",
    path: "/weekly-horoscope"
  },
  {
    name: "Monthly horoscope",
    path: "/monthly-horoscope"
  },
  {
    name: "Yearly horoscope",
    path: "/yearly-horoscope"
  },
  {
    name: "Terms of service",
    path: "/terms-of-service"
  },
  {
    name: "Privacy policy",
    path: "/privacy-policy"
  }
]
