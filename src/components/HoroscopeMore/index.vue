<!-- 更多推荐 -->
<script setup lang="ts">
import { useRouter } from "vue-router"

import { typeList, type TypeListType } from "@/config/constants"
import { capitalizeWords } from "@/utils"

defineOptions({
  name: "HoroscopeMore"
})

interface Props {
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "daily"
})

const filteredTypeList = typeList.filter((item) => item !== props.type)

const router = useRouter()

const handleToMore = (item: string) => {
  if (item === "daily") {
    router.push("/")
  } else {
    router.push(`/${item}-horoscope`)
  }
}

// #region 动态导入图片
const images: Record<string, { default: string }> = import.meta.glob(
  "@/assets/imgs/*-forecast.webp",
  {
    eager: true
  }
)
// 从导入的模块中提取默认导出的路径
const imageMap = Object.keys(images).reduce((acc, path) => {
  const key = path.match(/\/(\w+)-forecast\.webp$/)?.[1] || "daily"
  acc[key] = images[path].default || images[path]
  return acc
}, {})
/** 动态获取图片 URL */
const getImgUrl = (item: TypeListType) => imageMap[item] || imageMap["daily"]
// #endregion
</script>

<template>
  <div class="horoscope-more">
    <div v-for="item in filteredTypeList" :key="item" class="more-item">
      <p class="item-title">{{ capitalizeWords(item) }} Forecast</p>
      <img class="item-img" v-lazy="getImgUrl(item)" alt="" @click="handleToMore(item)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horoscope-more {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .more-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-title {
      font-family: "Abhaya Libre";
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      line-height: normal;
    }

    .item-img {
      width: 100%;
      border-radius: 10px;
    }
  }
}

@media (min-width: 768px) {
  .horoscope-more {
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;

    .item-title {
      margin-bottom: 10px;
    }
    .item-img {
      width: 100%;
      @include hover-effect;
    }
  }
}
</style>
