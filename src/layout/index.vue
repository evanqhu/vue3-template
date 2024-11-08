<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app"

import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import MenuDrawer from "./components/MenuDrawer.vue"

defineOptions({
  name: "BaseLayout"
})

const appStore = useAppStore()
</script>

<template>
  <div class="app-container" :style="{ overflow: appStore.menuDrawerOpened ? 'hidden' : 'auto' }">
    <Header />
    <MenuDrawer />
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <main class="app-main">
            <component :is="Component" />
          </main>
        </KeepAlive>
      </Transition>
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
// 组件切换动画
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s ease;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }
</style>
