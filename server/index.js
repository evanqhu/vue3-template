// 入口文件，启动 SSR 服务器
import fs from "node:fs/promises" // 导入文件系统模块，用于读取文件（使用 Promises）
import os from "node:os" // 导入操作系统模块，用于获取环境变量

import express from "express" // 导入 Express，用于创建 HTTP 服务器

// 常量
const isProduction = process.env.NODE_ENV === "production"
const port = process.env.PORT || 5173
const base = process.env.BASE || "/"

// 在生产环境中缓存静态文件（HTML 和 ssr-manifest）
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8") // 读取生产环境下的 HTML 模板
  : "" // 开发环境下 HTML 模板不缓存，后续动态读取
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8") // 读取生产环境下的 SSR Manifest 文件
  : undefined // 开发环境不使用 SSR Manifest

// 创建 HTTP 服务器实例
const app = express()

// 根据环境加载相应的中间件
let vite
if (!isProduction) {
  // 如果是开发环境，使用 Vite 的中间件
  const { createServer } = await import("vite") // 动态导入 Vite
  vite = await createServer({
    server: { middlewareMode: true }, // 以中间件模式启动 Vite
    appType: "custom", // 自定义应用类型
    base // 设置基础路径
  })
  app.use(vite.middlewares) // 使用 Vite 中间件
} else {
  // 如果是生产环境，使用生产中间件
  const compression = (await import("compression")).default // 动态导入 compression 模块，用于压缩响应
  const sirv = (await import("sirv")).default // 动态导入 sirv，用于提供静态文件服务
  app.use(compression()) // 启用 gzip 压缩
  app.use(base, sirv("./dist/client", { extensions: [] })) // 提供静态资源服务，服务路径为 './dist/client'
}

// 处理 ads.txt 请求
app.get("/ads.txt", async (req, res) => {
  const content = (await vite.ssrLoadModule("/src/settings.ts")).defaultSettings.adSense.ads
  console.log("🚀🚀🚀  ads content: ", content)
  res.type("text/plain").send(content)
})

// 处理所有的 HTML 请求
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "") // 获取请求的 URL，并去除基础路径

    let template
    let render
    if (!isProduction) {
      // 在开发环境下，动态读取 HTML 模板并处理
      template = await fs.readFile("./index.html", "utf-8") // 读取开发环境的 HTML 模板
      template = await vite.transformIndexHtml(url, template) // 使用 Vite 处理模板
      render = (await vite.ssrLoadModule("/src/entry-server.ts")).render // 动态加载 SSR 入口并获取 render 函数
    } else {
      // 在生产环境下，使用缓存的模板和 render 函数
      template = templateHtml // 使用缓存的生产环境模板
      render = (await import("../dist/server/entry-server.js")).render // 从已构建的服务器端模块中导入 render 函数
    }

    // 调用服务端的 render 函数，生成流式内容和 Pinia 状态
    const { stream, state, headPayload } = await render(url, ssrManifest, req)

    const [htmlStart, htmlEnd] = template
      .replace("<!--pinia-state-->", state)
      .replace("<!--headTags-->", headPayload.headTags)
      .split("<!--app-html-->") // 将模板分割为头部和尾部

    res.status(200).set({ "Content-Type": "text/html" }) // 设置响应头，表示返回 HTML 内容

    // 流式发送 HTML 的头部内容
    res.write(htmlStart)
    // 通过流式发送组件渲染的 HTML 内容
    for await (const chunk of stream) {
      if (res.closed) break // 如果连接已关闭，则停止写入
      res.write(chunk) // 写入每个渲染块
    }
    // 发送 HTML 的尾部内容
    res.write(htmlEnd)
    res.end() // 完成响应
  } catch (e) {
    vite?.ssrFixStacktrace(e) // 在开发环境中，修复 Vite 的 SSR 堆栈跟踪
    console.log(e.stack) // 打印错误堆栈
    res.status(500).end(e.stack) // 返回 500 错误，并输出堆栈信息
  }
})

// 启动 HTTP 服务器并监听指定端口
app.listen(port, "0.0.0.0", () => {
  // 获取局域网 IP 地址
  const interfaces = os.networkInterfaces()
  let localIP = "localhost"

  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === "IPv4" && !alias.internal && alias.address.startsWith("192.168")) {
        localIP = alias.address // 获取非本地回环地址的 IPv4
        break
      }
    }
  }
  console.log(`Server started at:`)
  console.log(`- Local:   http://localhost:${port}`)
  console.log(`- Network: http://${localIP}:${port}`) // 打印局域网内可访问的 IP 地址
})
