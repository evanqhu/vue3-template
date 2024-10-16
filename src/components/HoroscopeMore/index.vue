<!-- 更多推荐 -->
<script setup lang="ts">
import { useRouter } from "vue-router"

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

const typeList = ["daily", "weekly", "monthly", "yearly"]
const filteredTypeList = typeList.filter((item) => item !== props.type)

const router = useRouter()

const handleToMore = (item: string) => {
  console.log(item)
  router.push(`/${item}-horoscope`)
}
</script>

<template>
  <div class="horoscope-more">
    <div v-for="item in filteredTypeList" :key="item" class="more-item">
      <p class="item-title">{{ capitalizeWords(item) }} Forecast</p>
      <img class="item-img" src="@/assets/imgs/img1.jpg" alt="" @click="handleToMore(item)" />
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
      @include hover-effect;
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
    }
  }
}
</style>
