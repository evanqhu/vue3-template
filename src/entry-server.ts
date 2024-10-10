// 服务端入口文件
import { renderToWebStream } from "vue/server-renderer"

import { createApp } from "./main"

export async function render(url: string) {
  const { app, store, router } = createApp("server")

  // 将状态序列化为 JSON 字符串
  const state = JSON.stringify(store.state.value)

  await router.push(url)
  await router.isReady()

  const ctx = {}
  const stream = renderToWebStream(app, ctx)

  return { stream, state }
}
