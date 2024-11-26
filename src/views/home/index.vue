<script setup lang="ts">
import { useHead } from "@unhead/vue"

import imgURL from "@/assets/images/demo.jpg"
import { useDevice } from "@/hooks/useDevice"
import { useAppStore } from "@/stores/modules/app"

import HomeDesktop from "./modules/desktop.vue"
import HomeMobile from "./modules/mobile.vue"

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
  <component :is="isMobile ? HomeMobile : HomeDesktop" :adSense="adSense" :imgURL="imgURL" />
</template>
