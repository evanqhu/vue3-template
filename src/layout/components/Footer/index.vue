<script setup lang="ts">
import { useDevice } from "@/hooks/useDevice"

import DesktopFooter from "./modules/desktop.vue"
import MobileFooter from "./modules/mobile.vue"

defineOptions({
  name: "BaseFooter"
})

const { isMobile } = useDevice()
</script>

<template>
  <component :is="isMobile ? MobileFooter : DesktopFooter" />
</template>

<style scoped></style>
