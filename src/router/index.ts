import type { Router } from "vue-router"
import { createMemoryHistory, createRouter as createVueRouter, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

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
            path: "/weekly-horoscope",
            component: () => import("@/views/Home/weekly.vue")
          }
        ]
      }
    ]
  })
