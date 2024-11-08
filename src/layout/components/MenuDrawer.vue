<script setup lang="ts">
import { useRouter } from "vue-router"

import { resourceList } from "@/configs/constants"
import { useAppStore } from "@/stores/modules/app"

const appStore = useAppStore()
const { toggleMenuDrawer } = appStore

const router = useRouter()

const handleItemClick = (item: { name: string; path: string }) => {
  router.push(item.path)
  toggleMenuDrawer(false)
}
</script>

<template>
  <div v-if="appStore.menuDrawerOpened" class="drawer-bg" @click="toggleMenuDrawer(false)"></div>
  <div
    :class="['menu-drawer', { opened: appStore.menuDrawerOpened }]"
    :style="{ transform: 'translateY(-100%)' }"
  >
    <div class="resource">Resource</div>
    <ul class="menu-list">
      <li
        v-for="(item, index) in resourceList"
        :key="index"
        class="menu-item"
        @click="handleItemClick(item)"
      >
        <span>{{ item.name }}</span>
        <SvgIcon name="arrow-right" width="6.5" height="11" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  // height: 100%;
  top: 50px;
  bottom: 0;
  position: absolute;
  z-index: 999;
}

.menu-drawer {
  position: absolute;
  top: 50px;
  z-index: 999;
  width: 100%;
  background: #fff;
  transition: all 0.2s ease-in-out;
  padding: 25px 18px 10px;

  &.opened {
    transform: translateY(0) !important; // TODO 默认行内样式，防止闪烁
  }

  .resource {
    font-family: "Rubik One";
    height: 25px;
  }

  .menu-list {
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;

      &:not(:last-of-type) {
        border-bottom: 1px dashed #727272;
      }
    }
  }
}

@media (min-width: 768px) {
  .drawer-bg {
    // display: none;
  }

  .menu-drawer {
    width: 360px;
    right: 0;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  }
}

@media (min-width: 1200px) {
  .menu-drawer {
    right: calc((100% - 1200px) / 2);
  }
}
</style>
