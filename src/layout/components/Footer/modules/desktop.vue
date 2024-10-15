<script setup lang="ts">
import { useRouter } from "vue-router"

import { defaultSettings } from "@/settings"

defineOptions({
  name: "DesktopFooter"
})

const router = useRouter()
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="top-item">
        <div class="footer-item about-us">
          <p class="item-title">About us</p>
          <p class="item-content">{{ defaultSettings.aboutUs }}</p>
        </div>
      </div>
      <div class="top-item">
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
      </div>
    </div>

    <div class="footer-bottom footer-item copyright">
      <p v-for="(item, index) in defaultSettings.copyright" :key="index" class="item-content">
        {{ item }}
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  background: #333;
  color: #fff;
  font-family: "Roboto";

  .footer-top {
    border-bottom: 1px solid #434343;
    display: flex;

    .top-item {
      flex: 1;
      padding: 0 calc((100% - 720px) / 4);
    }
  }

  .footer-bottom {
    display: flex;
    align-items: center;
  }

  .footer-item {
    display: flex;
    flex-direction: column;
    padding: 16px 24px;

    .item-title {
      font-weight: 600;
      margin-bottom: 20px;
    }

    .item-content {
      line-height: normal;
      font-size: 14px;
    }

    &.about-us {
      .item-content {
        line-height: 2;
      }
    }

    &.resource {
      .item-content {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        &:not(:last-of-type) {
          margin-bottom: 20px;
        }
      }
    }

    &.copyright {
      color: rgba(255, 255, 255, 0.6);

      .item-content {
        font-size: 10px;
        line-height: 2;
      }
    }
  }
}

@media (min-width: 1200px) {
  .footer {
    padding: 0 calc((100% - 1200px) / 2);
  }
}
</style>
