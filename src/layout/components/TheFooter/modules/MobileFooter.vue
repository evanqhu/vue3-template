<script setup lang="ts">
import type { ResourceListType } from "@/configs/constants"

interface Props {
  resourceList: ResourceListType
  webConfig: WebConfig
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <footer class="footer">
    <div class="footer__section">
      <p class="footer__section__title">ABOUT US</p>
      <p class="footer__section__content">{{ webConfig.aboutUs }}</p>
    </div>
    <div class="footer__section resource">
      <p class="footer__section__title">RESOURCE</p>
      <p
        v-for="(item, index) in resourceList"
        :key="index"
        class="footer__section__content"
        @click="$emit('resource-click', item.path)"
      >
        {{ item.name }}
      </p>
    </div>
    <div class="footer__section">
      <p class="footer__section__title">CONTACT US</p>
      <a class="footer__section__content" :href="`mailto:${webConfig.appEmail}`">
        {{ webConfig.appEmail }}
      </a>
    </div>
    <div class="footer__section copyright">
      <p class="footer__section__content">
        Copyright © 2024 {{ webConfig.appUrl }}. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$bg-color: #000;
$text-color: #fff;
$text-color-muted: #999;
$border-color: #444;
$pc-margin: calc((100% - $container-width) / 2);

.footer {
  display: flex;
  flex-direction: column;
  background: $bg-color;
  color: $text-color;

  &__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;

    &:not(:last-of-type) {
      border-bottom: 1px solid $border-color;
    }

    &__title {
      font-weight: 600;
      margin-bottom: 1.25rem;
    }

    &__content {
      color: $text-color-muted;
      text-align: center;
      line-height: 1.25;
    }

    &.resource {
      .footer__section__content:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }

    &.copyright {
      color: rgba(255, 255, 255, 0.6);

      .footer__section__content {
        font-size: 0.625rem;
      }
    }
  }
}
</style>
