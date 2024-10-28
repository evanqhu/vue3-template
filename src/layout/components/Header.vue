<script setup lang="ts">
import { useRouter } from "vue-router"

import { useAppStore } from "@/store/modules/app"

defineOptions({
  name: "BaseHeader"
})

const router = useRouter()
const appStore = useAppStore()
const { toggleMenuDrawer } = appStore

const APP_TITLE = import.meta.env.VITE_APP_TITLE

/** 点击标题和 logo */
const handleHeadClick = () => {
  router.push({ name: "home" })
}

/** 点击菜单 */
const handleMenuClick = () => {
  toggleMenuDrawer(!appStore.menuDrawerOpened)
}
</script>

<template>
  <header class="header">
    <div class="header-left" @click="handleHeadClick">
      <SvgIcon name="app-logo" width="30" height="30" />
      <div class="app-title">{{ APP_TITLE }}</div>
    </div>
    <div class="header-right" @click="handleMenuClick">
      <SvgIcon name="menu" width="25" height="25" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 1000;

  @media (min-width: 1200px) {
    padding: 0 calc((100% - 1200px) / 2);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 5px;
    @include hover-effect;

    .app-title {
      font-family: "Rubik One";
      font-size: 15px;
      text-transform: uppercase;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    @include hover-effect;
  }
}
</style>
