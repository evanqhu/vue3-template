// 服务端入口文件
import { basename } from "node:path"

import { renderSSRHead } from "@unhead/ssr"
import type { Request } from "express"
import { renderToWebStream } from "vue/server-renderer"

import { useAppStore } from "@/store/modules/app"

import { DeviceEnum } from "./config/constants"
import { createApp } from "./main"

export async function render(url: string, _ssrManifest: string, req: Request) {
  const manifest: Record<string, string[]> = _ssrManifest && JSON.parse(_ssrManifest) // 将字符串格式的 manifest 转换为对象
  const { app, store, router, head } = await createApp("server")

  // 根据请求头判断设备类型并存储状态
  const userAgent = req.headers["user-agent"] || "mobile"
  const isMobile = /mobile|android|webos|iphone|ipod|blackberry/i.test(userAgent)
  const appStore = useAppStore()
  appStore.toggleDevice(isMobile ? DeviceEnum.Mobile : DeviceEnum.Desktop)

  // 将状态序列化为 JSON 字符串
  const state = JSON.stringify(store.state.value)

  await router.push(url)
  await router.isReady()

  const headPayload = await renderSSRHead(head)

  const ctx: { modules?: string[] } = {}
  const stream = renderToWebStream(app, ctx)

  // Vite 生成的 SSR manifest 包含模块到 chunk/资源的映射，之后我们可以利用它来确定此请求需要预加载哪些文件
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)

  return { stream, preloadLinks, state, headPayload }
}

/** 服务端预加载文件 */
const renderPreloadLinks = (modules: undefined | string[], manifest: Record<string, string[]>) => {
  let links = ""
  const seen = new Set()
  if (modules === undefined || manifest === undefined) {
    return links
  }
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

const renderPreloadLink = (file: string) => {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith(".woff")) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith(".woff2")) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith(".gif")) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith(".png")) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  } else if (file.endsWith(".webp")) {
    return `<link rel="preload" href="${file}" as="image" type="image/webp">`
  } else {
    return ""
  }
}
