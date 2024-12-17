<script setup lang="ts">
import { useHead } from "@unhead/vue"

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
</script>

<template>
  <div>home</div>
</template>
