<script setup lang="ts">
import { onMounted } from "vue"

import { getContractList } from "@/api/modules/list"

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
    <SvgIcon name="fullscreen" width="20px" height="20px" />
  </main>
</template>
