<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"

import HelloWorld from "@/components/HelloWorld.vue"
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  display: flex;
  gap: 1rem;
  text-align: center;
  margin: 2rem;
}
</style>
