import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import autoprefixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 样式配置
    css: {
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    // 插件
    plugins: [vue(), vueJsx()],
    // 混淆器
    esbuild:
      mode === 'development'
        ? undefined
        : {
            // 打包时移除 console.log
            pure: ['console.log'],
            // 打包时移除 debugger
            drop: ['debugger'],
            // 打包时移除所有注释
            legalComments: 'none'
          },
    // 代理服务器
    server: {
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: 'https://测试接口.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
