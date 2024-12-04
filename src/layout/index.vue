<script setup lang="ts">
import MenuDrawer from "./components/MenuDrawer.vue"
import TheFooter from "./components/TheFooter/index.vue"
import TheHeader from "./components/TheHeader.vue"

defineOptions({
  name: "BaseLayout"
})
</script>

<template>
  <MenuDrawer />
  <div class="app-container">
    <TheHeader />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <main class="app-main">
          <component :is="Component" />
        </main>
      </KeepAlive>
    </RouterView>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  min-width: 360px;
  position: relative;

  .app-main {
    padding-top: $header-height;
    max-width: $container-width;
    margin: 0 auto;
  }
}
</style>
