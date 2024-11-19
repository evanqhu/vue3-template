import { fileURLToPath, URL } from "node:url"

import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import autoprefixer from "autoprefixer"
import path from "path"
import { defineConfig, loadEnv } from "vite"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// @see: https://cn.vitejs.dev/config
export default defineConfig(({ mode }) => {
  // 加载环境变量文件
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH } = viteEnv // 静态资源地址

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
          additionalData: `@import "@/styles/variables.scss";`, // 全局注入样式文件，包含全局样式变量和函数
          api: "modern-compiler" // 关闭控制台【Deprecation [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.】警告
        }
      }
    },
    // 插件
    plugins: [
      vue(),
      vueJsx(),
      // svg 雪碧图
      createSvgIconsPlugin({
        iconDirs: [
          path.resolve(process.cwd(), "src/icons/svg"),
          path.resolve(process.cwd(), "src/icons/logos")
        ],
        symbolId: "icon-[dir]-[name]"
      }),
      // 图片打包压缩
      ViteImageOptimizer({
        jpg: {
          quality: 80
        },
        jpeg: {
          quality: 80
        },
        png: {
          quality: 80
        },
        webp: {
          quality: 80
        }
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
          target: "http://test.api.example.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  }
})
