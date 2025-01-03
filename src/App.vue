<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue"
import { onMounted, provide, ref } from "vue"

import { $eventTrack, $logEvent } from "@/configs/constants"
import { useFirebase } from "@/hooks/useFirebase"
import { useResize } from "@/hooks/useResize"
import { useAppStore } from "@/stores/modules/app"

useResize()
const appStore = useAppStore()
const { webConfig } = appStore

/** 全局提供 Firebase 的函数 */
const { customLogEvent, customEventTrack } = useFirebase()
provide($logEvent, customLogEvent)
provide($eventTrack, customEventTrack)

/** 网站图标 */
const iconUrl = ref("")

// 设置页面标题，加载广告脚本
useHead(
  {
    script: [
      ...(webConfig.adSense?.client
        ? [
            {
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense.client}`,
              crossorigin: "anonymous" as const,
              async: true
            }
          ]
        : [])
    ],
    link: [
      {
        rel: "icon",
        href: iconUrl
      }
    ]
  },
  { mode: "client" }
)
useSeoMeta({
  title: webConfig.appTitle,
  ogTitle: webConfig.appTitle
})

// 动态引入 icon
onMounted(async () => {
  iconUrl.value = (await import(`@/icons/logos/${webConfig.appLogo}.svg`)).default
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
