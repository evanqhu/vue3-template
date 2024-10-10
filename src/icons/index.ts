import "virtual:svg-icons-register"

import { type App } from "vue"

import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component

export const loadSvg = (app: App) => {
  app.component("SvgIcon", SvgIcon)
}
