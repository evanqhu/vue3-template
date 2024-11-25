# Vite + Vue3 + TypeScript + SSR 项目模板

该仓库是一个基于 Vite、Vue3 和 TypeScript 的项目模板，用于快速搭建 Vue3 SSR 项目。

### 🚀 特性

- 移动端和 PC 端适配
- 使用 `Unhead` 处理 `title` 和 `meta`
- 安装 `Firebase`
- 安装 `AdSense` 并封装组件 `AdsbyGoogle`
- 使用 `vue3-lazyload` 图片懒加载插件
- 使用 `useDevice` 判断设备类型，设备类型存储在 `store` 中
- 使用 `webConfigs.ts` 配置文件同时部署多个域名
- 使用 `vite-plugin-svg-icons` 处理打包图片压缩

**待处理**

- [ ] 添加 Winston 日志记录
- [ ] Unhead 服务端渲染无效，服务端返回的 HTML 文件中未包含 useHead 定义的内容
- [ ] `App.vue` 中动态引入 icon 的方法，不确定是否合理
- [ ] 将首屏关键样式内联到 style 标签中

### ⚙️ 脚本介绍

Node 版本：v18+

```ini
"scripts": {
  # 启动开发服务器
  "dev": "node server",
  # 生产构建
  "build": "run-p type-check \"build:client {@}\" \"build:server {@}\" --",
  # 开发构建
  "build:dev": "run-s \"build --mode development\"",
  # 测试构建
  "build:stage": "run-s \"build --mode staging\"",
  "build:client": "vite build --ssrManifest --outDir dist/client",
  "build:server": "vite build --ssr src/entry-server.ts --outDir dist/server",
  "type-check": "vue-tsc --build --force",
  # 预览（需在打包后执行）
  "preview": "cross-env NODE_ENV=production node server",
  # 语法校验
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
  # 风格校验
  "format": "prettier --write src/",
  "prepare": "husky",
  "lint-staged": "lint-staged",
  # 提交代码
  "commit": "bash pull-commit-push.sh"
  },
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

后端接口路径：修改 `.env` 文件中的 `VITE_BASE_API`

### ⚙️ Svg 组件

项目中通过 `vite-plugin-svg-icons` 包封装了 Svg 组件，使用方法如下

- 将 svg 图片资源放在 @/icons/svg 文件夹下
- 在组件中使用

```html
<SvgIcon name="menu" width="20px" height="20px" />
```

注意事项：

- `SvgIcon` 组件已全局注册，无需引入即可使用
- name 属性需和文件名保持一致

### ⚙️ 图片懒加载

项目中使用 `vue3-lazyload` 包实现图片懒加载，使用方法如下：

- 将 `img` 标签的 `src` 属性换成 `v-lazy` 即可
- v-lazy 的路径必须是浏览器可以访问的完整路径
- 有两种书写路径的方法
  - 1. 将图片放在 public 文件夹下，使用绝对路径
  - 2. 使用 import 动态引入图片

```html
<script>
  import imgURL from "@/assets/images/xxx.jpg"
</script>

<!-- 绝对路径，图片放在 public 文件夹下 -->
<img v-lazy="'/demo.jpg'" alt="" />
<!-- 动态引入 -->
<img v-lazy="imgURL" alt="" />
```

### ⚙️ 处理 head 信息

项目中通过 `Unhead` 包添加 `title` 和 `meta`，使用方法如下：

- 在 `App.vue` 中添加全局的 `head` 信息

```javascript
const iconUrl = ref("")

useHead({
  title: webConfig.appTitle,
  meta: [
    {
      name: "og:title",
      content: webConfig.appTitle
    }
  ],
  script: [
    {
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense.scriptUrl}`,
      crossorigin: "anonymous",
      async: true
    }
  ],
  link: [
    {
      rel: "icon",
      href: iconUrl
    }
  ]
})

// 动态加载 icon
onMounted(async () => {
  iconUrl.value = (await import(`@/icons/logos/${webConfig.appLogo}.svg`)).default
})
```

- 给路由组件添加标题和 `meta`，可以在组件中使用 `useHead`

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

- 配置文件在 `src/webConfigs.ts` 中
- Firebase 相关代码集成在 `@/hooks/useFirebase.ts` 中
- 在 `App.vue` 中使用 `useFirebase()` 即可，然后通过 provide 将函数传递给后代的 `AdsbyGoogle` 组件

```javascript
const { customLogEvent, customEventTrack } = useFirebase()
provide($logEvent, customLogEvent)
provide($eventTrack, customEventTrack)
```

### ⚙️ AdSense 相关

- 配置文件在 `src/webConfigs.ts` 中

  ```javascript
  adSense: {
      // NOTE 这里的 client 只需要写 script 中 client= 后面的内容
      //（如：ca-pub-8158555231596181），千万不要写成全部的 URL
      client: "ca-google", // 必填
      ads: "template ads.txt",
      home_1: {
        // 广告位信息只需要填 slot 就行，其他的都给了默认值
        "data-ad-slot": "1468595611",
      },
      home_2: {
        "data-ad-slot": "9290411161",
        // class: "adsbygoogle",
        // style: "display:block",
        // "data-ad-client": "ca-pub-8158555231596181",
        // "data-ad-format": "auto",
        // "data-full-width-responsive": "true"
      }
    }
  ```

- 在 `App.vue` 中通过 `useHead` 注入广告脚本

  ```javascript
  useHead({
    script: [
      {
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense.client}`,
        crossorigin: "anonymous",
        async: true
      }
    ]
  })
  ```

- 在组件中使用广告组件

  ```vue
  <AdsbyGoogle :adsAttrs="adSense.home_1" />
  ```

> `AdsbyGoogle` 组件已全局注册，无需引入即可使用

### ⚙️ 广告调试

在 `url` 后面增加 `db` `query`参数即可，如 `www.xxx.com?db=1`，表示开启 debug 模式

### ⚙️ 项目部署

项目部署到服务器上时，告知运运维打包命令：`pnpm run build`

告知运维打包后静态资源上传的 CDN 目录，也就是环境变量中的 `VITE_PUBLIC_PATH`

之后会运行 `run.sh` 文件，执行 `NODE_ENV=production PORT=5000 node server/index.js`

以上命令将部署的端口号设为 5000，将 `NODE_ENV` 环境变量设为 `production`

### ⚙️ 网站复制指南

1. 修改 `webConfigs.ts` 文件
2. 将 `logo` 放在 `icons/logos` 文件夹下，`svg` 格式，命名参考 `webConfigs.ts` 中的 `appLogo` 字段

### ⚙️ 其他

- 一个网站项目，建一个仓库，命名如（ptc_ssr_star），第一版网站放在 main 分支，之后相同 UI 的复制网站直接在 main 分支上添加
- STMP 服务命名如（ptc-nch-star）
- 不同 UI 的网站，建立新分支，命名为 style1、style2 等
- 新分支对应的 STMP 服务命名如 （ptc-nch-star-style1、ptc-nch-star-style2 等）
