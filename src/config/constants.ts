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

/** 类别 */
export const typeList = ["daily", "weekly", "monthly", "yearly"]

/** 十二星座 */
export const horoscopeList = [
  {
    name: "Aries",
    date: "Mar 21 - Apr 19"
  },
  {
    name: "Taurus",
    date: "Apr 20 - May 20"
  },
  {
    name: "Gemini",
    date: "May 21 - Jun 20"
  },
  {
    name: "Cancer",
    date: "Jun 21 - Jul 22"
  },
  {
    name: "Leo",
    date: "Jul 23 - Aug 22"
  },
  {
    name: "Virgo",
    date: "Aug 23 - Sep 22"
  },
  {
    name: "Libra",
    date: "Sep 23 - Oct 22"
  },
  {
    name: "Scorpio",
    date: "Oct 23 - Nov 21"
  },
  {
    name: "Sagittarius",
    date: "Nov 22 - Dec 21"
  },
  {
    name: "Capricorn",
    date: "Dec 22 - Jan 19"
  },
  {
    name: "Aquarius",
    date: "Jan 20 - Feb 18"
  },
  {
    name: "Pisces",
    date: "Feb 19 - Mar 20"
  }
]
