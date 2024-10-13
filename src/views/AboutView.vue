<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { onActivated } from "vue"

useHead({
  title: "About Page",
  meta: [
    {
      name: "description",
      content: "My about page description"
    }
  ]
})

onActivated(() => {
  console.log("🚀🚀🚀 onActivated: ")
})
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga distinctio tenetur nobis
      recusandae fugit quos doloremque ducimus vero dolorum, repudiandae odio deserunt, molestiae
      perferendis magni cupiditate aperiam tempore nemo dicta?
    </div>
  </div>
</template>

<style></style>
