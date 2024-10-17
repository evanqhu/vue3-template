<script setup lang="ts">
import { useRouter } from "vue-router"

defineOptions({
  name: "HeaderAbout"
})

interface Props {
  title: string
}

withDefaults(defineProps<Props>(), {
  title: "Terms of service"
})

const router = useRouter()
</script>

<template>
  <div class="header-about">
    <SvgIcon name="back" width="25" height="25" class="back-btn" @click="router.back()" />
    <h1 class="header-title">{{ title }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.header-about {
  position: fixed;
  height: 50px;
  width: 100%;
  padding: 0 15px;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;

  .header-title {
    flex: 1;
    margin-right: 25px;
    text-align: center;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
  }

  @media (min-width: 1200px) {
    padding: 0 calc((100% - 1200px) / 2);

    .back-btn {
      @include hover-effect;
    }
  }
}
</style>
