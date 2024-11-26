<script setup lang="ts">
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import MenuDrawer from "./components/MenuDrawer.vue"

defineOptions({
  name: "BaseLayout"
})
</script>

<template>
  <MenuDrawer />
  <div class="app-container">
    <Header />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <main class="app-main">
          <component :is="Component" />
        </main>
      </KeepAlive>
    </RouterView>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  min-width: 360px;
  position: relative;

  .app-main {
    padding-top: 50px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
