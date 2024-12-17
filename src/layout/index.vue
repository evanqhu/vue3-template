<script setup lang="ts">
defineOptions({
  name: "BaseLayout"
})
</script>

<template>
  <div class="app-container">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <main class="app-main">
          <component :is="Component" />
        </main>
      </KeepAlive>
    </RouterView>
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
