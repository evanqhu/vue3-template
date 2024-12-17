<script setup lang="ts">
import { useHead } from "@unhead/vue"

import logo from "@/icons/svg/logo.svg"

useHead({
  link: [
    {
      rel: "icon",
      href: logo
    }
  ]
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
