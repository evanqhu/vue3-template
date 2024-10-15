<script setup lang="ts">
import { onMounted } from "vue"
import { useRoute } from "vue-router"

import { useDevice } from "@/hooks/useDevice"
import { useResize } from "@/hooks/useResize"
import { useAppStore } from "@/store/modules/app"

/** 监视页面大小变化 hook */
useResize()

const route = useRoute()
const appStore = useAppStore()
const { isMobile } = useDevice()

console.log("🚀🚀🚀  isMobile: ", isMobile.value)

onMounted(() => {
  // 开启广告调试模式
  if (route.query.db) {
    appStore.toggleDebug(true)
  }
})
</script>

<template>
  <!-- <div class="temp">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div> -->
  <RouterView />
</template>

<style lang="scss" scoped>
.temp {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
