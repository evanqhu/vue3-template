// 服务端入口文件
import { renderSSRHead } from "@unhead/ssr"
import { renderToWebStream } from "vue/server-renderer"

import { createApp } from "./main"

export async function render(url: string) {
  const { app, store, router, head } = createApp("server")

  // 将状态序列化为 JSON 字符串
  const state = JSON.stringify(store.state.value)

  // 设置 head
  head.push({
    meta: [
      {
        name: "description",
        content: "My App Description"
      }
    ]
  })
  const headPayload = await renderSSRHead(head)

  await router.push(url)
  await router.isReady()

  const ctx = {}
  const stream = renderToWebStream(app, ctx)

  return { stream, state, headPayload }
}
