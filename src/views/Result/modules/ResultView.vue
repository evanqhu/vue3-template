<!-- 结果页 UI 组件 -->
<script setup lang="ts">
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek" // 支持 ISO 周
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

import type { HoroscopeListType, TypeListType } from "@/config/constants"
import { typeList } from "@/config/constants"
import { capitalizeWords } from "@/utils"

dayjs.extend(isoWeek)

defineOptions({
  name: "ResultView"
})

interface Props {
  type: TypeListType // 类型 daily | weekly | monthly | yearly
  horoscopeName: HoroscopeListType // 星座名 首字母大写
}

const props = withDefaults(defineProps<Props>(), {
  type: "daily",
  horoscopeName: "Aries"
})

const isSSR = ref(true)
const filteredTypeList = typeList.filter((item) => item !== `${props.type}`)
const forecastContent = ref("")
const month = new Date().getMonth() + 1

const router = useRouter()

/** 跳转到其他类别 */
const handleToOtherType = (type: string) => {
  const url = `/${type}-${props.horoscopeName}`
  router.push(url)
}

/** 获取日期展示 */
const getDate = () => {
  const today = dayjs()
  let date = today.format("MMM D")
  if (props.type === "weekly") {
    const startOfWeek = today.startOf("isoWeek").format("MMM D") // 本周的开始日期（星期一）
    const endOfWeek = today.endOf("isoWeek").format("MMM D") // 本周的结束日期（星期日）
    date = `${startOfWeek} - ${endOfWeek}`
  } else if (props.type === "monthly") {
    date = today.format("MMMM")
  } else if (props.type === "yearly") {
    date = today.format("YYYY")
  }
  return date
}

// 仅在客户端生成随机数，防止激活不匹配
onMounted(async () => {
  isSSR.value = false
  let randomIndex = Math.floor(Math.random() * 10)
  if (props.type === "monthly" || props.type === "yearly") {
    randomIndex = Math.floor(Math.random() * 5)
  }
  const CONFIG = await import(`@/config/${props.type}.json`)
  switch (props.type) {
    case "daily":
    case "weekly":
      forecastContent.value = CONFIG[props.horoscopeName][randomIndex]
      break
    case "monthly":
      forecastContent.value = CONFIG[props.horoscopeName][month][randomIndex]
      break
    case "yearly":
      forecastContent.value = CONFIG[props.horoscopeName][randomIndex]
      break
    default:
      break
  }
})
</script>

<template>
  <div class="app-content result">
    <div class="horoscope-type">
      <SvgIcon :name="horoscopeName" class="icon" />
      <p class="name">{{ horoscopeName }}</p>
      <p v-if="!isSSR" class="date">
        {{ capitalizeWords(type) }} Forecast -
        {{ getDate() }}
      </p>
    </div>

    <div v-if="!isSSR" class="forecast-content">{{ forecastContent }}</div>

    <div class="other-types">
      <div v-for="item in filteredTypeList" :key="item" class="other-type-item">
        <p>{{ horoscopeName }} {{ capitalizeWords(item) }} Forecast</p>
        <div class="item-content" @click="handleToOtherType(item)">
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

  @media (min-width: 768px) {
    .other-types {
      flex-direction: row;

      .other-type-item .item-content {
        @include hover-effect;
      }
    }
  }
}
</style>
