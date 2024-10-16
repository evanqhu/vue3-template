<script setup lang="ts">
import { useHead } from "@unhead/vue"

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
</script>

<template>
  <div class="app-content result">daily result</div>
</template>

<style lang="scss" scoped></style>
