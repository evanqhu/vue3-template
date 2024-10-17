<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

import { type HoroscopeListType } from "@/config/constants"

import ResultView from "./modules/ResultView.vue"

defineOptions({
  name: "ResultDaily"
})

useHead({
  title: "Daily Horoscope - Your Daily Astrological Insights",
  meta: [
    {
      name: "description",
      content:
        "Discover personalized daily horoscopes and cosmic guidance to navigate your life journey. Get insights and inspiration every day."
    }
  ]
})

const route = useRoute()

// 星座名
const horoscopeName = route.meta.horoscopeName as HoroscopeListType
</script>

<template>
  <ResultView type="daily" :horoscopeName="horoscopeName"></ResultView>
</template>
