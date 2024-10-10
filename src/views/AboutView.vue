<script setup lang="ts">
import { useHead } from "@unhead/vue"

useHead({
  title: "About Page",
  meta: [
    {
      name: "description",
      content: "My about page description"
    }
  ]
})
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style></style>
