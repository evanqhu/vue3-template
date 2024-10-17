<script setup lang="ts">
import { useHead } from "@unhead/vue"

import Footer from "@/layout/components/Footer/index.vue"
import HeaderAbout from "@/layout/components/HeaderAbout.vue"

defineOptions({
  name: "PrivacyPolicy"
})

useHead({
  title: "Privacy policy -Daily Horoscope",
  meta: [
    {
      name: "description",
      content:
        "Read our privacy policy to understand how we protect your personal information and data privacy. Your security is our top priority."
    }
  ]
})

const privacyPolicy = [
  {
    title: "Information Collection",
    content: `We may collect personal information such as your name, email address, and any other information you provide when you subscribe to our newsletter or contact us.`
  },
  {
    title: "Use of Information",
    content: `The information we collect is used to enhance our services, respond to inquiries, and send newsletters or promotional materials. We do not sell or rent your personal information to third parties.`
  },
  {
    title: "Third-Party Services",
    content: `We may use third-party services to help operate our site. These parties may have access to your information only to perform tasks on our behalf and are obligated not to disclose or use it for any other purpose.`
  },
  {
    title: "Data Security",
    content: `We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure.`
  },
  {
    title: "Children's Privacy",
    content: `Our site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.`
  },
  {
    title: "Changes to Policy",
    content: `We may update this privacy policy periodically. We encourage you to review it regularly to stay informed about how we protect your information.`
  },
  {
    title: "Contact Information",
    content: `For any questions or concerns regarding these terms or our privacy practices, please contact us at dailyhoroscope.support@gmail.com.`
  }
]
</script>

<template>
  <HeaderAbout title="Privacy policy" />
  <div class="app-main">
    <div class="app-content">
      <div class="item-wrapper">
        <p class="item-content">
          At dailyhoroscope.fun, we are committed to protecting your privacy. This policy outlines
          how we collect, use, and safeguard your personal information.
        </p>
      </div>
      <div v-for="(item, index) in privacyPolicy" :key="index" class="item-wrapper">
        <h2 class="item-title">
          <span class="item-index">{{ index + 1 }}</span>
          {{ item.title }}
        </h2>
        <p class="item-content">{{ item.content }}</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
.app-main {
  padding-top: 50px;
  max-width: 1200px;
  margin: 0 auto;

  .item-wrapper {
    margin-bottom: 25px;

    .item-title {
      font-family: "Rubik One";
      line-height: normal;
      margin-bottom: 18px;

      .item-index {
        width: 20px;
        height: 20px;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: Roboto;
        background-color: #000;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        border-radius: 50%;
      }
    }

    .item-content {
      font-family: Roboto;
      font-weight: 500;
      line-height: 1.5;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
