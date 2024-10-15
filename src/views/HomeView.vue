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
      natus similique sapiente molestiae quis rerum? Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Dolores modi adipisci at vitae libero, beatae autem voluptatum est,
      explicabo fugit tempore soluta repellendus consequuntur aliquid nostrum. Nesciunt totam qui
      voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita
      quisquam eaque iure aliquam nam perspiciatis commodi praesentium. Quo molestiae eveniet
      pariatur eius ab delectus aspernatur veritatis repellat fugit quasi! Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Fugit expedita aut omnis voluptate, quae, repellendus
      impedit quis eius mollitia qui sed suscipit temporibus eveniet unde modi eos nesciunt odio
      veniam.
    </div>
  </main>
</template>
