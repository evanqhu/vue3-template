<script setup lang="ts">
import { useRouter } from "vue-router"

import { defaultSettings } from "@/settings"

defineOptions({
  name: "MobileFooter"
})

const router = useRouter()
</script>

<template>
  <footer class="footer">
    <div class="footer-item">
      <p class="item-title">About us</p>
      <p class="item-content">{{ defaultSettings.aboutUs }}</p>
    </div>
    <div class="footer-item resource">
      <p class="item-title">Resource</p>
      <p
        v-for="(item, index) in defaultSettings.resource"
        :key="index"
        class="item-content"
        @click="router.push(item.path)"
      >
        {{ item.name }}
      </p>
    </div>
    <div class="footer-item">
      <p class="item-title">Contact us</p>
      <p class="item-content">{{ defaultSettings.email }}</p>
    </div>
    <div class="footer-item copyright">
      <p v-for="(item, index) in defaultSettings.copyright" :key="index" class="item-content">
        {{ item }}
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #333;
  color: #fff;
  font-family: "Roboto";

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 24px;

    &:not(:last-of-type) {
      border-bottom: 1px solid #434343;
    }

    .item-title {
      font-weight: 600;
      margin-bottom: 15px;
    }

    .item-content {
      text-align: center;
      line-height: normal;
      font-size: 14px;
    }

    &.resource {
      .item-content {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }

    &.copyright {
      color: rgba(255, 255, 255, 0.6);

      .item-content {
        font-size: 10px;
        line-height: 18px;
      }
    }
  }
}
</style>
