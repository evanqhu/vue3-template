<script setup lang="ts">
import { inject, nextTick, onActivated, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import { $eventTrack, type eventTrackType } from "@/configs/constants"

defineOptions({
  name: "AdsbyGoogle"
})

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs: object
  /**
   * 自定义样式
   */
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  customClass: ""
})

/** firebase 的函数 */
const eventTrack = inject($eventTrack) as eventTrackType

/** ins 标签模板引用 */
const adsenseRef = ref<HTMLElement>()
/** 是否显示广告区域 */
const isAdFilled = ref(true)
/** 是否进入调试模式 */
const showDebug = ref(false)
const route = useRoute()

let observer: MutationObserver

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
const observeAdStatus = () => {
  /** ins 标签 DOM */
  const ads = adsenseRef.value
  if (!ads) return

  // 监听 DOM 树变动
  observer = new MutationObserver((mutations) => {
    // 遍历监听到的 DOM 变化
    mutations.forEach((mutation) => {
      const target = mutation.target as Element
      if (mutation.attributeName === "data-ad-status") {
        isAdFilled.value = target.getAttribute("data-ad-status") !== "unfilled"
      }
    })
  })

  observer.observe(ads, {
    attributes: true, // 监听属性变动
    attributeFilter: ["data-ad-status"] // 只监听 data-ad-status 属性
  })

  // 初始化检查
  isAdFilled.value = ads.getAttribute("data-ad-status") !== "unfilled"
}

/** 展示广告 */
const showAd = async () => {
  await nextTick()
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    eventTrack("load_ads", "expose")
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  // 开启广告调试模式
  if (route.query.db) {
    showDebug.value = true
  }
  showAd()
  observeAdStatus()
})

onActivated(() => {
  showAd()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="ads-item">
    <div v-show="isAdFilled" class="ads-content" :class="customClass">
      <div class="ads-content-title">Advertisement</div>
      <ins ref="adsenseRef" v-bind="adsAttrs" />
    </div>
    <div v-if="showDebug" class="ads-debug">
      {{ adsAttrs }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ads-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
}
.ads-content {
  border-bottom: 1px solid #c6c6c6;
  height: fit-content;

  .ads-content-title {
    display: flex;
    place-items: center;
    font-size: 10px;
    color: #999;
    line-height: normal;

    &::before,
    &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #c6c6c6;
    }

    &::before {
      margin-right: 15px;
    }

    &::after {
      margin-left: 15px;
    }
  }
}
.ads-debug {
  border: 1px solid red;
}
</style>
