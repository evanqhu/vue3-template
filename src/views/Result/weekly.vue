<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

import { type HoroscopeListType } from "@/config/constants"

import ResultView from "./modules/ResultView.vue"

defineOptions({
  name: "ResultWeekly"
})

useHead({
  title: "Weekly Horoscope - Plan Your Week with the Stars",
  meta: [
    {
      name: "description",
      content:
        "Explore your weekly horoscope for detailed astrological insights. Prepare for the week ahead with our expert predictions."
    }
  ]
})

const route = useRoute()

// 星座名
const horoscopeName = route.meta.horoscopeName as HoroscopeListType
</script>

<template>
  <ResultView type="weekly" :horoscopeName="horoscopeName"></ResultView>
</template>
