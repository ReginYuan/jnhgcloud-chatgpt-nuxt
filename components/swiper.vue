<template>
  <div class="swiperbox">
    <swiper
      :width="220"
      :slidesPerView="auto"
      :centeredSlides="true"
      :spaceBetween="15"
      :slidesOffsetBefore="0"
      :loop="true"
      :pagination="{
        clickable: true
      }"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide
        ><img
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://www.hao528.com/uploads/allimg/220605/9-220605160242.jpg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://www.hao528.com/uploads/allimg/220605/9-220605160242.jpg"
          alt=""
      /></swiper-slide>
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
</script>

<style scoped lang="scss">
.swiper {
  height: 125px !important;
}
:deep(.swiper-button-prev:after) {
  content: none !important;
}
:deep(.swiper-button-next:after) {
  content: none !important;
}
:deep(.swiper-slide .swiper-slide-active) {
  width: 220px !important;
}
img {
  width: 100%;
  // width: 60vw;
  height: 100%;
  border-radius: 10px;
}
</style>
