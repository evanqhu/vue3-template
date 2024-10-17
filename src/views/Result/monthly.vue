<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

import { type HoroscopeListType } from "@/config/constants"

import ResultView from "./modules/ResultView.vue"

defineOptions({
  name: "ResultMonthly"
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

const route = useRoute()

// 星座名
const horoscopeName = route.meta.horoscopeName as HoroscopeListType
</script>

<template>
  <ResultView type="monthly" :horoscopeName="horoscopeName"></ResultView>
</template>
