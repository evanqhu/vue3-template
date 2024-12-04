<script setup lang="ts">
import { useRouter } from "vue-router"

import { useAppStore } from "@/stores/modules/app"

const router = useRouter()
const appStore = useAppStore()
const { webConfig, toggleMenuDrawer } = appStore

/** 点击标题和 logo */
const handleHeadClick = () => {
  router.push("/")
}

/** 点击菜单 */
const handleMenuClick = () => {
  toggleMenuDrawer(!appStore.menuDrawerOpened)
}
</script>

<template>
  <header class="header">
    <div class="header__left" @click="handleHeadClick">
      <SvgIcon :name="webConfig.appLogo" width="30" height="30" />
      <div class="app-title">{{ webConfig.appTitle }}</div>
    </div>
    <div class="header__right" @click="handleMenuClick">
      <SvgIcon v-if="appStore.menuDrawerOpened" name="close" width="25" height="25" />
      <SvgIcon v-else name="menu" width="25" height="25" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: $header-height;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 1000;

  @media (min-width: $container-width) {
    padding: 0 calc((100% - $container-width) / 2);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 6px;
    @include hover-effect;

    .app-title {
      font-family: "Rubik One";
      font-size: 1rem;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    @include hover-effect;
  }
}
</style>
