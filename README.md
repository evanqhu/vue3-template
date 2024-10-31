# Vite + Vue3 + TypeScript + SSR 项目模板

该仓库是一个基于 Vite、Vue3 和 TypeScript 的项目模板，用于快速搭建 Vue3 SSR 项目。

### 🚀 特性

- 移动端和 PC 端适配
- 使用 Unhead 处理 title 和 meta（需完善）
- 安装 Firebase
- 安装 AdSense 并封装组件
- 使用 vue3-lazyload 图片懒加载插件
- ## 使用 useDevice 判断设备类型，设备类型存储在 store 中

待处理

- [ ] 优化 Firebase
- [ ] 优化 Adsense
- [ ] Winston 日志记录
- [ ] Vite 图片压缩插件
- [ ] Unhead 服务端渲染 meta
- [ ] 加一个相对单位

### ⚙️ 运行项目

- Node 版本：v18+

- 安装依赖

```bash
pnpm install
```

- 开发

```bash
pnpm run dev
```

- 打包

```bash
pnpm run build
```

- 预览

```bash
pnpm run preview # 需在打包后执行
```

- 语法校验

```bash
pnpm run lint
```

- 风格校验

```bash
pnpm run format
```

- 提交代码

```bash
pnpm run commit
```

### ⚙️ 组合式 API 生命周期钩子

| 生命周期钩子    | 服务端 (server) | 客户端 (client) | 说明                         |
| --------------- | --------------- | --------------- | ---------------------------- |
| setup           | ✅              | ✅              | 包含 beforeCreate 和 created |
| onBeforeMount   | ❎              | ✅              | 组件挂载到 DOM 前            |
| onMounted       | ❎              | ✅              | 组件挂载到 DOM 后            |
| onBeforeUpdate  | ❎              | ✅              | 数据已更新，页面未更新       |
| onUpdated       | ❎              | ✅              | 数据页面均更新               |
| onActivated     | ❎              | ✅              | 组件激活时                   |
| onDeactivated   | ❎              | ✅              | 组件失活时                   |
| onBeforeUnmount | ❎              | ✅              | 组件卸载前                   |
| onUnmounted     | ❎              | ✅              | 组件卸载后                   |

### ⚙️ 移动端和 PC 端适配

#### 逻辑适配

在组件中使用 `useDevice` 获取当前设备状态，进行逻辑判断

```javascript
const { isMobile, isDesktop } = useDevice()
```

#### 样式适配

在样式中，使用媒体查询编写样式即可

- 默认写移动端的布局样式，使用媒体查询添加 PC 端的样式

```scss
.container {
  display: flex;
  flex-direction: column;
  padding: half(20);

  // 适用于屏幕宽度大于或等于 768px 的布局 (PC 端布局)
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  .content {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    width: 100%;

    @media (min-width: 768px) {
      margin-top: 0;
      width: 70%;
    }
  }
}
```

- PC 端样式像素单位使用绝对单位 px
- 移动端像素单位使用函数 `half()` 处理，将设计的像素单位除以 2，例如 `half(100) = 50px`（因为设计稿宽度为 720 px）
  - 已通过 Vite 配置注入了全局样式变量和函数，在任意组件中均可直接使用
  - 全局样式文件：`@/styles/variables.scss`

```javascript
export default defineConfig(() => {
  return {
    ...,
    css: {
    	preprocessorOptions: {
    		scss: {
    			additionalData: `@import "@/styles/variables.scss";`,
  			}
  		}
  	}
  }
})
```

### ⚙️ 环境变量

CDN 部署地址：修改 `.env` 文件中的 `VITE_PUBLIC_PATH`

项目名称：修改 `.env` 文件中的 `VITE_APP_TITLE`

### ⚙️ Svg 组件

项目中通过 `vite-plugin-svg-icons` 包封装了 Svg 组件，使用方法如下

- 将 svg 图片资源放在 @/icons/svg 文件夹下
- 在组件中使用

```html
<SvgIcon name="fullscreen" width="20px" height="20px" />
```

注意事项：

- `SvgIcon` 组件已全局注册，无需引入即可使用
- name 属性需和文件名保持一致

### ⚙️ 图片懒加载

项目中使用 `vue3-lazyload` 包实现图片懒加载，使用方法如下：

- 将 `img` 标签的 `src` 属性换成 `v-lazy` 即可

### ⚙️ 处理 head 信息

项目中通过 `Unhead` 包添加 title 和 meta，使用方法如下：

- 添加全局的 head 信息可在 `@/main.ts` 中添加

```javascript
head.push({
  meta: [
    {
      name: "og:title",
      content: appTitle
    }
  ]
})
```

- 给路由组件添加标题和 meta，可以在组件中使用 useHead

```javascript
import { useHead } from "@unhead/vue"

useHead({
  title: "Home Page",
  meta: [
    {
      name: "description",
      content: "My home page description"
    }
  ]
})
```

> 目前存在一个问题，useHead 无法在服务端渲染，暂时不明原因

### ⚙️ Firebase 相关

Firebase 相关代码集成在 `@/utils/firebase.ts` 中
配置文件在 `@/settings.ts` 下，修改此处的 firebase 内容即可

> 暂未完成

### ⚙️ AdSense 相关

- AdSense 的配置文件在 `@/settings.ts` 下，修改此处的 adSense 内容即可

- `Client` 信息存储在环境变量 `.env` 中

- 配置文件中的内容被存储在 pinia 的 appStore 中

- `ads.txt` 文件的内容直接写在 `public` 文件夹中

- 在 main.ts 中通过 head.push 方法注入广告脚本

  ```javascript
  head.push({
    script: [
      {
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.PROD ? AD_CLIENT : "ca-google"}`,
        crossorigin: "anonymous",
        async: true
      }
    ]
  })
  ```

- 在组件中使用广告组件

  ```vue
  <Adsbygoogle :adsAttrs="adSense.home_1" />
  ```

> `Adsbygoogle` 组件已全局注册，无需引入即可使用

### ⚙️ 广告调试

在 url 后面增加 `db` `query`参数即可，如 `www.xxx.com?db=1`，表示开启 debug 模式

### ⚙️ 复制友好开发指南

后面凡是用到网站名字相关的地方全部在 `.env` 或 `settings.ts` 中定义好变量

```bash
# .env
VITE_APP_TITLE = "Astro Insights"
VITE_APPTITLE = "AstroInsights"
VITE_APP_EMAIL = "astroinsights.support@gmail.com"
VITE_APP_URL = "astroinsights.click"
```

### ⚙️ 网站复制指南

1. 修改 `package.json` 中的 `name`
2. 修改所有 `.env` 中的网站相关的变量
3. 修改 `ads.txt` 中的内容
4. 修改 `src/settings.ts` 中的 `adsense`、`firebase`、`aboutUs` 等
5. 替换 `favicon.ico` 和 `app-logo.svg`
