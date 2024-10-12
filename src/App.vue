<script setup lang="ts">
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

import HelloWorld from "@/components/HelloWorld.vue"

import { useAdSense } from "./hooks/useAdSense"
import { useDevice } from "./hooks/useDevice"
import { useResize } from "./hooks/useResize"
import { useAppStore } from "./store/modules/app"

useResize()

const appStore = useAppStore()
const { adSense } = storeToRefs(appStore)

const { isMobile } = useDevice()
console.log("🚀🚀🚀  isMobile: ", isMobile.value)

/** 广告组件引用 */
const ad1 = ref(null)
const ad2 = ref(null)
const adsRefs = computed(() => [ad1, ad2])

/** 加载广告 hook */
useAdSense(adsRefs)
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
  <div class="demo"></div>
  <AdSense ref="ad1" :adsAttrs="adSense.home_1" />
  <AdSense ref="ad2" :adsAttrs="adSense.home_2" />

  <RouterView />
  <SvgIcon name="fullscreen" width="20px" height="20px" />
</template>

<style lang="scss" scoped>
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

.demo {
  width: half(200);
  height: 100px;
  background-color: aquamarine;
}
</style>
