<!-- 更多推荐 -->
<script setup lang="ts">
import { useRouter } from "vue-router"

import { typeList } from "@/config/constants"
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
</script>

<template>
  <div class="horoscope-more">
    <div v-for="item in filteredTypeList" :key="item" class="more-item">
      <p class="item-title">{{ capitalizeWords(item) }} Forecast</p>
      <img
        class="item-img"
        :src="`src/assets/imgs/${item}-forecast.webp`"
        alt=""
        @click="handleToMore(item)"
      />
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
