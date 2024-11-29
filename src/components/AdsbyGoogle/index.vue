<script setup lang="ts">
import { computed, inject, nextTick, onActivated, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import { $eventTrack, type eventTrackType } from "@/configs/constants"
import { useAppStore } from "@/stores/modules/app"

defineOptions({
  name: "AdsbyGoogle"
})

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs?: object
  /**
   * 自定义样式
   */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  customClass: ""
})

const route = useRoute()
const appStore = useAppStore()
const { webConfig } = appStore

/** firebase 的函数 */
const eventTrack = inject($eventTrack) as eventTrackType

/** ins 标签模板引用 */
const adsenseRef = ref<HTMLElement>()
/** 是否显示广告（如果广告位配置对象不含 data-ad-slot 属性则不显示广告） */
const isShowAd = computed(() => {
  return Object.keys(props.adsAttrs).includes("data-ad-slot")
})
/** 广告是否填充成功（如果广告填充失败，则隐藏广告内容及标题） */
const isAdFilled = ref(true)
/** 是否进入调试模式 */
const isShowDebug = ref(false)

/** 完整的广告位配置对象 */
const adsAttrsFull = computed(() => {
  return Object.assign(
    // 默认属性
    {
      class: "adsbygoogle",
      style: "display:block",
      "data-ad-format": "auto",
      "data-full-width-responsive": "true",
      "data-ad-client": webConfig.adSense?.client
    },
    props.adsAttrs
  )
})

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
  if (!isShowAd.value) return
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
    isShowDebug.value = true
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
  <div v-if="isShowAd" class="ads-item">
    <div v-show="isAdFilled" class="ads-content" :class="customClass">
      <div class="ads-content-title">Advertisement</div>
      <ins ref="adsenseRef" v-bind="adsAttrsFull" />
    </div>
    <div v-if="isShowDebug" class="ads-debug">
      {{ adsAttrsFull }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ads-item {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  border: 2px solid red;
  margin-bottom: 2px;
  background-color: #ffe786;
  color: #000;
}
</style>
