import type { App } from "vue"

import Carousel3D from "./Carousel3D.vue"
import CarouselSlide from "./CarouselSlide.vue"

const install = (app: App) => {
  app.component("Carousel3D", Carousel3D)
  app.component("CarouselSlide", CarouselSlide)
}

// 可以全局注册成插件使用 Vue.use(Carousel3d)
export default {
  install
}

// 也可以在组件中导入模块使用 import { Carousel3d, CarouselSlide } from 'vue-carousel-3d';
export { Carousel3D, CarouselSlide }
