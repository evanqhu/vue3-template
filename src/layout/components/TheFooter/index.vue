<script setup lang="ts">
import { useRouter } from "vue-router"

import { resourceList } from "@/configs/constants"
import { useDevice } from "@/hooks/useDevice"
import { useAppStore } from "@/stores/modules/app"

import DesktopFooter from "./modules/DesktopFooter.vue"
import MobileFooter from "./modules/MobileFooter.vue"

defineOptions({
  name: "TheFooter"
})

const { isMobile } = useDevice()
const router = useRouter()
const appStore = useAppStore()
const { webConfig } = appStore

const handleResourceClick = (path: string) => {
  router.push(path)
}
</script>

<template>
  <component
    :is="isMobile ? MobileFooter : DesktopFooter"
    :resource-list="resourceList"
    :web-config="webConfig"
    @resource-click="handleResourceClick"
  />
</template>

<style scoped></style>
