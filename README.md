# Vite + Vue3 + TypeScript 项目模板

该仓库是一个基于 Vite、Vue3 和 TypeScript 的项目模板，用于快速搭建 Vue3 项目。

## master 分支

- 使用 Pinia 状态管理器
- 使用 Vue Router 路由管理器
- 使用 ESLint 进行代码规范检查
- 使用 Prettier 进行代码格式化
- 使用 postcss 的 autoprefixer 插件自动添加浏览器前缀
- 使用 sass 样式预处理器
- 使用 commitlint 规范提交，使用 cz-git 实现交互式提交
- 封装 SvgIcon 组件（vite-plugin-svg-icons）
- 封装 axios

待处理

- [ ] stylelint 样式校验
- [ ] 完善路由配置和导航守卫

## vue3-ssr 分支

- 使用 Unhead 处理 title 和 meta
- 使用 vue3-lazyload 图片懒加载插件
- 使用 useDevice 判断设备类型，设备类型存储在 store 中

待处理

- [ ] 安装 firebase
- [ ] adscomponents

### 移动端和 PC 端适配

在组件中使用 useDevice 获取当前设备状态，进行逻辑判断
在样式中，使用媒体查询编写样式即可

### 样式

使用媒体查询写样式，max-width: 768px 是移动端，大于 768px 是 PC 端
PC 端像素单位使用绝对单位 px
移动端像素单位使用函数 half 处理，将设计的像素单位除以 2，例如 half(100) = 50px
