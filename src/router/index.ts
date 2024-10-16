import type { Router } from "vue-router"
import { createMemoryHistory, createRouter as createVueRouter, createWebHistory } from "vue-router"

import { horoscopeList, typeList } from "@/config/constants"

const Layout = () => import("@/layout/index.vue")

/** 生成路由数组 */
const generateRoutes = () => {
  const routes = typeList.flatMap((type) =>
    horoscopeList.map((horoscope) => {
      const routePath = `${type}-${horoscope.name.toLowerCase()}` // 路由形式：daily-aries
      return {
        name: routePath, // 路由名
        path: routePath, // 路径
        // component: componentMap[type] // 动态选择组件
        component: () => import(`@/views/Result/${type}.vue`)
      }
    })
  )

  return routes
}

const horoscopeRoutes = generateRoutes()

/**  创建一个路由实例的函数，根据传入的类型 ('client' 或 'server') 来选择历史模式 */
export const createRouter = (type: "client" | "server"): Router =>
  createVueRouter({
    // 根据类型选择使用的历史模式
    history: type === "client" ? createWebHistory() : createMemoryHistory(),

    // 定义路由表
    routes: [
      {
        path: "/",
        component: Layout,
        children: [
          {
            name: "daily",
            path: "",
            component: () => import("@/views/Home/daily.vue")
          },
          {
            name: "weekly",
            path: "weekly-horoscope",
            component: () => import("@/views/Home/weekly.vue")
          },
          {
            name: "monthly",
            path: "monthly-horoscope",
            component: () => import("@/views/Home/monthly.vue")
          },
          {
            name: "yearly",
            path: "yearly-horoscope",
            component: () => import("@/views/Home/yearly.vue")
          },
          ...horoscopeRoutes
        ]
      }
    ],

    // 滚动行为
    scrollBehavior: () => {
      // 找到自定义滚动容器
      const scrollContainer = document.querySelector(".app-container")
      if (scrollContainer) {
        scrollContainer.scrollTo(0, 0) // 滚动到顶部
      }
    }
  })
