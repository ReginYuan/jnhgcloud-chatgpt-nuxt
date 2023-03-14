<template>
  <div class="content">
    <!-- 产业头条 -->
    <div class="industry_recommend" v-if="props.type === 'industry'">
      <swiper-side></swiper-side>
    </div>
    <!-- 政策法规 -->
    <div class="policyRule" v-if="props.type === 'policyRule'">
      <van-swipe class="my-swipe" :show-indicators="false" lazy-render>
        <van-swipe-item v-for="(item, index) in 5" :key="index">
          <van-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div class="swipe_title">
            俄乌谈判乌方代表：乌方不再致力于申请加入北约
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 老板智库 -->
    <div class="bossBank" v-if="props.type === 'bossBank'">
      <swiper></swiper>
    </div>
    <div v-for="(item, index) in list" :key="index">
      <!-- 一张图片 -->
      <div class="content-item" v-if="item.imgUrl">
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <div class="tag">
              <span>{{ item.tag }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <van-image
          width="80"
          height="80"
          fit="contain"
          radius="10"
          src="https://www.hao528.com/uploads/allimg/220605/9-220605160242.jpg"
        />
      </div>
      <!-- 无图片 -->
      <div class="content-item2" v-else>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <div class="tag">
              <span>{{ item.tag }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ItemListType } from '~/types/itemList'
const props = defineProps<{ itemList: Array<ItemListType>; type: string }>()
const list = props.itemList

let color = ref('')
let backgroundColor = ref('')
if (props.type === 'bossBank') {
  color.value = '#FDAD15'
  backgroundColor.value = '#fff3dc'
} else if (props.type === 'industry') {
  color.value = '#FA5151'
  backgroundColor.value = '#ffeeee'
} else if (props.type === 'policyRule') {
  color.value = '#007AFF'
  backgroundColor.value = '#e6f2ff'
}
</script>

<style scoped lang="scss">
.content {
  .content-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }
  .content-item2 {
    padding: 12px 16px;
  }
  .text {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 16px;
    flex: 1;
    .title {
      font-size: 16px;
      line-height: 20px;
      color: #222222;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-top: 5px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      .tag {
        font-size: 12px;
        color: v-bind('color');
        span {
          background-color: v-bind('backgroundColor');
          padding: 2px 10px;
          margin: 0 20px;
          border-radius: 2px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .time {
        font-size: 12px;
        color: rgba($color: #222222, $alpha: 0.5);
      }
    }
  }
}

// 政策法规
.policyRule {
  padding: 10px 20px;
  :deep(.van-swipe-item) {
    box-sizing: border-box;
    width: 335px;
    height: 179px;
    padding: 0 5px;
    position: relative;
    .van-image {
      width: 100%;
      height: 100%;
      .van-image__img {
        border-radius: 10px;
      }
    }
    .swipe_title {
      position: absolute;
      bottom: 8px;
      left: 5px;
      line-height: 24px;
      padding: 8px 12px 0;
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
