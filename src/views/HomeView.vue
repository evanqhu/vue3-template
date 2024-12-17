<script setup lang="ts">
import { useHead } from "@unhead/vue"

import imgURL from "@/assets/images/demo.jpg"
import { useAppStore } from "@/stores/modules/app"

useHead({
  title: "Home Page",
  meta: [
    {
      name: "description",
      content: "My home page description"
    }
  ]
})

const appStore = useAppStore()
const {
  webConfig: { adSense }
} = appStore
</script>

<template>
  <div class="home">
    <h1>This is the home page</h1>
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quae excepturi unde laudantium
      repellendus voluptate voluptatibus, assumenda modi eum, voluptatum molestias nulla quia hic
      natus similique sapiente molestiae quis rerum? Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Dolores modi adipisci at vitae libero, beatae autem voluptatum est,
      explicabo fugit tempore soluta repellendus consequuntur aliquid nostrum. Nesciunt totam qui
      voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita
      quisquam eaque iure aliquam nam perspiciatis commodi praesentium. Quo molestiae eveniet
      pariatur eius ab delectus aspernatur veritatis repellat fugit quasi! Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Fugit expedita aut omnis voluptate, quae, repellendus
      impedit quis eius mollitia qui sed suscipit temporibus eveniet unde modi eos nesciunt odio
      veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. A reprehenderit cum, in id
      obcaecati officia maxime delectus quas quia vero odit neque quo, unde harum porro, aspernatur
      iusto ipsa itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni deserunt
      dolore repudiandae voluptatibus consequuntur obcaecati, corporis quasi provident non
      voluptatum suscipit ratione aliquid delectus accusantium, est quo quos quia repellendus.
      Mollitia earum veritatis fugit laudantium illum fugiat quia debitis voluptatem. Placeat sit
      magni, pariatur sint dolore eveniet id voluptatibus vel ab esse repudiandae omnis non
      laboriosam iste numquam, eum nobis. Laborum eveniet, voluptates quaerat quia recusandae
      placeat explicabo. Sequi laborum in quod recusandae explicabo. Suscipit, consequuntur
      inventore. Temporibus, ea, beatae eum, voluptatum quasi dolorum facilis molestiae libero porro
      quod hic. Reprehenderit rem minima a tenetur animi nam. Illum eius porro nam enim facere rem
      quas praesentium iusto voluptatibus laboriosam quia aspernatur recusandae, sint animi maiores
      explicabo iste vel tempore doloremque! Distinctio veniam unde, odit, praesentium maiores
      consequatur odio quaerat eius exercitationem quas cum perspiciatis maxime officia eveniet
      dicta ut suscipit magnam. Et voluptatibus expedita amet incidunt asperiores architecto sint
      sunt!
    </div>
    <img v-lazy="imgURL" alt="" width="100%" />
    <AdsbyGoogle :ads-attrs="adSense.home_1" />
    <AdsbyGoogle :ads-attrs="adSense.home_2" />
  </div>
</template>

<style lang="scss" scoped></style>
