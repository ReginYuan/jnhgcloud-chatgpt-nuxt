<template>
  <div class="industry_recommend">
    <div class="hot_header">
      <img src="~/assets/img/icon-hot.png" alt="" />
    </div>
    <div class="hot_titile">
      <div class="hot_titile-item">
        <img src="~/assets/img/icon-one.png" alt="" />
        <span>{{ swiperList && swiperList[0]?.title }}</span>
      </div>
      <div class="hot_titile-item">
        <img src="~/assets/img/icon-two.png" alt="" />
        <span>{{ swiperList && swiperList[1]?.title }}</span>
      </div>
      <div class="hot_titile-item">
        <img src="~/assets/img/icon-three.png" alt="" />
        <span>{{ swiperList && swiperList[2]?.title }}</span>
      </div>
    </div>
  </div>
  <swiper
    :autoplay="swiper_options.autoplay"
    :loop="swiper_options.loop"
    :speed="swiper_options.speed"
    :spaceBetween="swiper_options.spaceBetween"
    :coverflowEffect="swiper_options.coverflowEffect"
    :centeredSlides="swiper_options.centeredSlides"
    effect="coverflow"
    :loopAdditionalSlides="3"
  >
    <swiper-slide
      :style="{ width: '330px', height: '188px' }"
      v-for="(item, index) in swiperList"
      :key="index"
      ><img :src="item.coverLink" alt=""
    /></swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
import { bannerInfo } from '~/server/api/user'
import { ItemListType } from '~/types/itemList'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
SwiperCore.use([Autoplay, EffectCoverflow])
let swiper_options = reactive({
  autoplay: {
    disableOnInteraction: true, // 鼠标滑动后继续自动播放
    delay: 4000 // 4秒切换一次
  },
  speed: 500, //切换过渡速度
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true, //设置slide居中
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
    stretch: -10, //每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。
    depth: 50, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
    modifier: 2.5, //depth和rotate和stretch的倍率，相当于            depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
    slideShadows: false //开启slide阴影。默认 true。
  }
})
let swiperList = ref<ItemListType[]>([])
onMounted(async () => {
  const { data } = await bannerInfo({ parentId: '1636282443407937538' })
  swiperList.value = data?.slice(0, 3)
})
</script>

<style scoped lang="scss">
.industry_recommend {
  .hot_header {
    padding: 10px 16px 5px;
  }
  .hot_titile {
    font-size: 16px;
    color: #222222;
    padding: 0px 16px;
    .hot_titile-item {
      line-height: 36px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      img {
        vertical-align: middle;
        margin-right: 5px;
        margin-bottom: 2px;
      }
    }
  }
}
:deep(.swiper-3d .swiper-slide) {
  border-radius: 8px !important;
}
.swiper {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
}
</style>
