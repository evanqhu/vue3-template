<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import { typeList } from "@/config/constants"
import DAILY_CONFIG from "@/config/daily.json"
import { capitalizeWords } from "@/utils"

defineOptions({
  name: "ResultDaily"
})

useHead({
  title: "DailyHoroscope - Your Daily Astrological Insights",
  meta: [
    {
      name: "description",
      content:
        "Discover personalized daily horoscopes and cosmic guidance to navigate your life journey. Get insights and inspiration every day."
    }
  ]
})

const TYPE = "Daily"
const isSSR = ref(true)
const filteredTypeList = typeList.filter((item) => item !== `${TYPE.toLocaleLowerCase()}`)

// 预测内容
const forecastContent = ref("")

const route = useRoute()

// 星座名
const horoscopeName = route.meta.horoscopeName as string

// 仅在客户端生成随机数，防止激活不匹配
onMounted(() => {
  isSSR.value = false
  const randomIndex = Math.floor(Math.random() * 10)
  forecastContent.value = DAILY_CONFIG[horoscopeName][randomIndex]
})
</script>

<template>
  <div class="app-content result">
    <div class="horoscope-type">
      <SvgIcon :name="horoscopeName" class="icon" />
      <p class="name">{{ horoscopeName }}</p>
      <p v-if="isSSR" class="date">
        {{ TYPE }} Forecast -
        {{
          new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })
        }}
      </p>
    </div>

    <div v-if="!isSSR" class="forecast-content">{{ forecastContent }}</div>

    <div class="other-types">
      <div v-for="item in filteredTypeList" :key="item" class="other-type-item">
        <p>{{ horoscopeName }} {{ item }} Forecast</p>
        <div class="item-content">
          <img class="item-img" v-lazy="'src/assets/imgs/other-type.webp'" alt="" />
          <p class="item-img-text">{{ capitalizeWords(item) }} Forecast</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .horoscope-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .icon {
      width: 100px;
      height: 100px;
    }

    .name,
    .date {
      font-family: "Abhaya Libre";
      font-size: 18px;
      font-weight: 700;
    }
  }

  .forecast-content {
    font-family: Roboto;
    line-height: 1.5;
  }

  .other-types {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .other-type-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-family: "Abhaya Libre";
      font-size: 18px;
      font-weight: 700;

      .item-content {
        position: relative;

        .item-img {
          width: 100%;
          border-radius: 8px;
        }
        .item-img-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: 0px 2px 4px #f6e079;
          font-family: Roboto;
          font-size: 22px;
          font-weight: 900;
          background: linear-gradient(187deg, #fff 29.67%, #ffe068 54.51%, #ffc800 90.25%);
          background-clip: text; // 让背景在文字区域显示
          -webkit-text-fill-color: transparent; // 文字颜色透明
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #9634ff;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
