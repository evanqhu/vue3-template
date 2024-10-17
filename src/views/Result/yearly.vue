<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { useRoute } from "vue-router"

import { type HoroscopeListType } from "@/config/constants"

import ResultView from "./modules/ResultView.vue"

defineOptions({
  name: "ResultYearly"
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

const route = useRoute()

// 星座名
const horoscopeName = route.meta.horoscopeName as HoroscopeListType
</script>

<template>
  <ResultView type="yearly" :horoscopeName="horoscopeName"></ResultView>
</template>
