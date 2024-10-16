<script setup lang="ts">
import { useHead } from "@unhead/vue"

import HoroscopeLayout from "@/components/HoroscopeLayout/index.vue"
import HoroscopeMore from "@/components/HoroscopeMore/index.vue"

defineOptions({
  name: "HomeYearly"
})

useHead({
  title: "Yearly Horoscope - Your Annual Astrological Outlook",
  meta: [
    {
      name: "description",
      content:
        "Dive into your yearly horoscope to uncover major themes and trends. Plan your year with comprehensive astrological insights."
    }
  ]
})
</script>

<template>
  <div class="app-content home">
    <div class="home-title">
      <p>Yearly Forecast</p>
      <p>Choose Your Zodiac Sign</p>
    </div>
    <HoroscopeLayout type="yearly" />
    <div class="more-title">More Horoscopes for You</div>
    <HoroscopeMore type="yearly" />
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
