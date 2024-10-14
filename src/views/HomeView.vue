<script setup lang="ts">
import { useHead } from "@unhead/vue"

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
  <main class="home">
    <h1>This is the home page</h1>
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quae excepturi unde laudantium
      repellendus voluptate voluptatibus, assumenda modi eum, voluptatum molestias nulla quia hic
      natus similique sapiente molestiae quis rerum?
    </div>
  </main>
</template>
