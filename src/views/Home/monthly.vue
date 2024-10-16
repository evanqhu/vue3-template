<script setup lang="ts">
import { useHead } from "@unhead/vue"

import HoroscopeLayout from "@/components/HoroscopeLayout/index.vue"
import HoroscopeMore from "@/components/HoroscopeMore/index.vue"

defineOptions({
  name: "HomeMonthly"
})

useHead({
  title: "Monthly Horoscope - Navigate the Month Ahead",
  meta: [
    {
      name: "description",
      content:
        "Unlock your monthly horoscope for in-depth astrological guidance. Discover what the stars have in store for you this month."
    }
  ]
})
</script>

<template>
  <div class="app-content home">
    <div class="home-title">
      <p>Monthly Forecast</p>
      <p>Choose Your Zodiac Sign</p>
    </div>
    <HoroscopeLayout />
    <div class="more-title">More Horoscopes for You</div>
    <HoroscopeMore type="monthly" />
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
    font-family: "Abhaya Libre";
    font-size: 20px;
    font-weight: 700;
  }

  .more-title {
    font-family: "Abhaya Libre";
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-top: 30px;
  }
}
</style>

<style lang="scss">
.app-content {
  padding: 30px 15px 60px;
}

@media (min-width: 768px) {
  .app-content {
    padding: 50px 15px 100px;
  }
}
</style>
