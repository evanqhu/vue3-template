<script setup lang="ts">
import { ref } from "vue"

defineOptions({
  name: "AdSense"
})

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs: object
  /**
   * 是否显示调试信息
   */
  showDebug?: boolean
  /**
   * 自定义样式
   */
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  showDebug: false,
  customClass: ""
})

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
// TODO
// const observeAdStatus = () => {

// }

/** 广告是否显示 */
const isAdFilled = ref(true)
</script>

<template>
  <div class="ads-item">
    <div v-show="isAdFilled" class="ads-content" :class="customClass">
      <div class="ads-content-title">Advertisement</div>
      <ins ref="adsense" v-bind="adsAttrs" />
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
}
.ads-content {
  border-bottom: 1px solid #c6c6c6;
  height: fit-content;

  .ads-content-title {
    display: flex;
    place-items: center;
    font-family: Roboto;
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
</style>
