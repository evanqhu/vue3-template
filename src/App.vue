<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { onBeforeMount, onMounted, provide } from "vue"
import { useRoute } from "vue-router"

import { $eventTrack, $logEvent } from "@/config/constants"
import { useFirebase } from "@/hooks/useFirebase"
import { useResize } from "@/hooks/useResize"
import { useAppStore } from "@/store/modules/app"

useResize()
const route = useRoute()
const appStore = useAppStore()
const { webConfig } = appStore

/** 全局提供 Firebase 的函数 */
const { customLogEvent, customEventTrack } = useFirebase()
provide($logEvent, customLogEvent)
provide($eventTrack, customEventTrack)

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
  ]
})

onMounted(async () => {
  useHead({
    link: [
      {
        rel: "icon",
        href: (await import(`@/icons/logos/${webConfig.appLogo}.svg`)).default
      }
    ]
  })
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
