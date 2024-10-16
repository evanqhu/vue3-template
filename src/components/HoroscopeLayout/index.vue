<!-- 十二星座图标布局组件 -->
<script setup lang="ts">
import { horoscopeList } from "@/config/constants"

defineOptions({
  name: "HoroscopeLayout"
})
</script>

<template>
  <div class="horoscope-layout">
    <div v-for="item in horoscopeList" :key="item.name" class="horoscope-item">
      <SvgIcon :name="item.name" class="icon" />
      <p class="name">{{ item.name }}</p>
      <p class="date">{{ item.date }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horoscope-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 默认移动端 3 列 */
  grid-gap: 20px 8px; /* 设置网格间距 */

  .horoscope-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    @include hover-effect(1.1);

    .icon {
      width: 100px;
      height: 100px;
    }

    .name {
      font-family: "Abhaya Libre";
      font-weight: 700;
      margin-top: -20px;
    }
    .date {
      font-family: Roboto;
      font-size: 12px;
    }
  }
}

/* PC 端布局：2 行 6 列 */
@media (min-width: 768px) {
  .horoscope-layout {
    grid-template-columns: repeat(6, 1fr); /* PC 端 6 列 */
    grid-gap: 40px 8px; /* 设置网格间距 */

    .horoscope-item {
      gap: 10px;

      .icon {
        width: 120px;
        height: 120px;
      }
      .name {
        font-size: 18px;
        margin-top: -30px;
      }
      .date {
        font-size: 14px;
      }
    }
  }
}
</style>
