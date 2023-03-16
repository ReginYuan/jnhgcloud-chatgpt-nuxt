<template>
  <div class="swiperbox">
    <swiper
      :width="230"
      :slidesPerView="auto"
      :centeredSlides="true"
      :spaceBetween="15"
      :slidesOffsetBefore="0"
      :loop="true"
      :loopAdditionalSlides="3"
      class="mySwiper"
      :modules="modules"
    >
      <swiper-slide v-for="(item, index) in imgs" :key="index">
        <div class="content">
          <img :src="item.url" alt="" />
          <div class="title">俄乌谈判乌方代表：乌方不再致力于申请加入北约</div>
          <div class="tagInfo">央视新间客户端·10分钟前</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
//默认滑动效果（这里面注释掉的可以不要）
// const onSwiper = swiper => {
// 	console.log(swiper);
// };
// const onSlideChange = e => {
// 	// swiper切换的时候执行的方法
// 	console.log('slide change', e.activeIndex);
// };
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y]

const imgs = ref([
  { url: 'https://www.hao528.com/uploads/allimg/220605/9-220605160242.jpg' },
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg' },
  { url: 'https://www.hao528.com/uploads/allimg/220605/9-220605160242.jpg' },
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg' }
])
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
  }
}
</style>
