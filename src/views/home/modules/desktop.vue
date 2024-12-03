<script setup lang="ts">
defineOptions({
  name: "HomeDesktop"
})

interface Props {
  adSense: WebConfig["adSense"]
  imgUrl: string
}

defineProps<Props>()
</script>

<template>
  <div class="home">
    <h1>This is the home desktop page</h1>
    <img v-lazy="imgUrl" alt="" width="100%" />
    <!-- <AdsbyGoogle :ads-attrs="adSense?.home_1" />
    <AdsbyGoogle :ads-attrs="adSense?.home_2" /> -->
  </div>
</template>

<style lang="scss" scoped></style>
