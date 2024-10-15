<script setup lang="ts">
import { useHead } from "@unhead/vue"

import HoroscopeLayout from "@/components/HoroscopeLayout/index.vue"

defineOptions({
  name: "HomeDaily"
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
</script>

<template>
  <div class="app-content home">
    <div class="home-title">
      <p>Daily Forecast</p>
      <p>Choose Your Zodiac Sign</p>
    </div>
    <HoroscopeLayout />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .home-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    p {
      font-family: "Abhaya Libre";
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>

<style lang="scss">
.app-content {
  padding: 30px 15px 60px;
}

@media (min-width: 768px) {
  .app-content {
    padding: 50px 0 100px;
  }
}
</style>
