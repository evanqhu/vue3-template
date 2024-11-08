<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { onBeforeMount, provide } from "vue"
import { useRoute } from "vue-router"

import { $eventTrack, $logEvent } from "@/configs/constants"
import { useFirebase } from "@/hooks/useFirebase"
import { useResize } from "@/hooks/useResize"
import { useAppStore } from "@/stores/modules/app"

useResize()
const route = useRoute()
const appStore = useAppStore()
const { webConfig } = appStore

/** 全局提供 Firebase 的函数 */
const { customLogEvent, customEventTrack } = useFirebase()
provide($logEvent, customLogEvent)
provide($eventTrack, customEventTrack)

// 设置页面标题，加载广告脚本
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
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense.client}`,
      crossorigin: "anonymous",
      async: true
    }
  ],
  link: [
    {
      rel: "icon",
      href: import(`@/icons/logos/${webConfig.appLogo}.svg`)?.dafault
    }
  ]
})

onBeforeMount(() => {
  // 开启广告调试模式
  if (route.query.db) {
    appStore.toggleDebug(true)
  }
})
</script>

<template>
  <RouterView />
</template>
