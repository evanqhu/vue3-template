<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { defineAsyncComponent } from "vue"

import imgURL from "@/assets/images/demo.jpg"
import { useDevice } from "@/hooks/useDevice"
import { useAppStore } from "@/stores/modules/app"

// import HomeDesktop from "./modules/desktop.vue"
// import HomeMobile from "./modules/mobile.vue"

// 使用异步加载组件
const HomeMobile = defineAsyncComponent(() => import("./modules/mobile.vue"))
const HomeDesktop = defineAsyncComponent(() => import("./modules/desktop.vue"))

defineOptions({
  name: "HomeView"
})

useHead({
  title: "Home Page",
  meta: [
    {
      name: "description",
      content: "My home page description"
    }
  ]
})

const { isMobile } = useDevice()

const appStore = useAppStore()
const {
  webConfig: { adSense }
} = appStore
</script>

<template>
  <component :is="isMobile ? HomeMobile : HomeDesktop" :ad-sense="adSense" :img-url="imgURL" />
</template>
