<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

defineOptions({
  name: "ResultDaily"
})

const route = useRoute()
const horoscopeName = route.meta.horoscopeName as string

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
</script>

<template>
  <div class="app-content result">
    <div class="horoscope-type">
      <SvgIcon :name="horoscopeName" class="icon" />
      <p class="name">{{ horoscopeName }}</p>
      <p class="date">
        Daily Forecast -
        {{
          new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })
        }}
      </p>
    </div>

    <div class="forecast-content">
      If you encounter something you can't decide on, you can let the Answer Book Online help you
      with just a few simple steps!If you encounter something you can't decide on, you can let the
      Answer Book Online help you with just a few simple steps!If you encounter something you can't
      decide on, you can let the Answer Book Online help you with just a few simple steps!
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
}
</style>
