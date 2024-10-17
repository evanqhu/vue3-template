<script setup lang="ts">
import { onMounted } from "vue"
import { useRoute } from "vue-router"

import { useResize } from "@/hooks/useResize"
import { useAppStore } from "@/store/modules/app"

/** 监视页面大小变化 hook */
useResize()

const route = useRoute()
const appStore = useAppStore()

onMounted(() => {
  // 开启广告调试模式
  if (route.query.db) {
    appStore.toggleDebug(true)
  }
})
</script>

<template>
  <RouterView />
</template>
