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
    <div class="footer__container">
      <div class="footer__section">
        <h2 class="footer__section__title">ABOUT US</h2>
        <p class="footer__section__content">{{ webConfig.aboutUs }}</p>
      </div>

      <div class="footer__section resource">
        <h2 class="footer__section__title">RESOURCE</h2>
        <p
          v-for="(item, index) in resourceList"
          :key="index"
          class="footer__section__content"
          @click="$emit('resource-click', item.path)"
        >
          {{ item.name }}
        </p>
      </div>

      <div class="footer__section contact">
        <h2 class="footer__section__title">CONTACT US</h2>
        <a class="footer__section__content" :href="`mailto:${webConfig.appEmail}`">
          {{ webConfig.appEmail }}
        </a>
      </div>
    </div>

    <div class="footer__copyright">
      <p>Copyright © 2024 {{ webConfig.appUrl }}. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$bg-color: #000;
$text-color: #fff;
$text-color-muted: #999;
$border-color: #666;
$pc-margin: calc((100% - $container-width) / 2);

.footer {
  background-color: $bg-color;
  color: $text-color;
  padding: 3rem $pc-margin 2rem;

  &__container {
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-around;
    gap: 2rem;
  }

  &__section {
    max-width: calc(1 / 3 * 100%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    &__content {
      color: $text-color-muted;
    }
  }

  &__copyright {
    padding-top: 2rem;
    border-top: 1px solid $border-color;
    text-align: center;
    color: $text-color-muted;
  }

  .resource,
  .contact {
    .footer__section__content {
      cursor: pointer;
      transition: color 0.3s ease;
      &:hover {
        color: $text-color;
      }
    }
  }

  .resource {
    .footer__section__content:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
