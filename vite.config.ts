import { fileURLToPath, URL } from "node:url"

import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import autoprefixer from "autoprefixer"
import path from "path"
import { defineConfig, loadEnv } from "vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// @see: https://cn.vitejs.dev/config
export default defineConfig(({ mode }) => {
  // 加载环境变量文件
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH } = viteEnv

  return {
    // 打包时根据实际情况修改 base
    base: VITE_PUBLIC_PATH,
    // 配置别名
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    // 样式配置
    css: {
      postcss: {
        plugins: [autoprefixer()]
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler" // 关闭控制台【Deprecation [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.】警告
        }
      }
    },
    // 插件
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    // 混淆器
    esbuild:
      mode === "development"
        ? undefined
        : {
            // 打包时移除 console.log
            pure: ["console.log"],
            // 打包时移除 debugger
            drop: ["debugger"],
            // 打包时移除所有注释
            legalComments: "none"
          },
    // 代理服务器
    server: {
      host: true,
      open: true,
      proxy: {
        "/api": {
          target: "https://测试接口.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  }
})
