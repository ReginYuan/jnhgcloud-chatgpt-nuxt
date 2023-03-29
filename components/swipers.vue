<template>
  <swiper
    v-if="swiperList?.length > 0"
    :width="230"
    :centeredSlides="true"
    :spaceBetween="15"
    :slidesOffsetBefore="0"
    :loop="true"
    :loopAdditionalSlides="3"
    :modules="modules"
    :autoplay="true"
    :delay="100"
    :disableOnInteraction="false"
  >
    <swiper-slide v-for="(item, index) in swiperList" :key="index">
      <div class="content">
        <img :src="item.coverLink" alt="" />
        <div class="title">{{ item.title }}</div>
        <div class="tagInfo">
          {{ item.authorBy }}<i class="point" v-show="item.authorBy"></i
          >{{ item.createTime.split(' ')[0] }}
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ItemListType } from '~/types/itemList'
import { bannerInfo } from '~/server/api/user'
const modules = [Autoplay, Pagination, Navigation, A11y]

let swiperList = ref<ItemListType[]>([])
onMounted(async () => {
  const { data } = await bannerInfo({
    levelOne: '1636282537209352194',
    recommend: 'Y'
  })
  swiperList.value = data
})
</script>

<style scoped lang="scss">
.swiper {
  height: 145px !important;
  margin: 7px 0px 10px 16px;
}
:deep(.swiper-button-prev:after) {
  content: none !important;
}
:deep(.swiper-button-next:after) {
  content: none !important;
}
.content {
  width: 100%;
  height: 80%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .title {
    position: absolute;
    bottom: 8px;
    font-size: 16px;
    color: #ffffff;
    padding: 0 8px;
  }
  .tagInfo {
    z-index: 99999999999999 !important;
    position: absolute;
    bottom: -25px;
    font-size: 10px;
    color: rgba($color: #000000, $alpha: 0.5);
    .point {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      margin: 0 3px 2px;
      background-color: #c4c4c4;
    }
  }
}
</style>
