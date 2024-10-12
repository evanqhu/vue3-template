<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { onMounted } from "vue"

import { getContractList } from "@/api/modules/list"

useHead({
  title: "Home Page",
  meta: [
    {
      name: "description",
      content: "My home page description"
    }
  ]
})

onMounted(async () => {
  const result = await getContractList({
    current: 1,
    pageSize: 10
  })
  console.log("🚀🚀🚀 result: ", result)
})
</script>

<template>
  <main class="home">
    <h1>This is the home page</h1>
  </main>
</template>
