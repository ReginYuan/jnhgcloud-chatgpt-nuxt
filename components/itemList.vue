<template>
  <div class="content">
    <div v-for="(item, index) in list" :key="index">
      <!-- 一张图片 -->
      <div class="content-item">
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
      <div class="content-item2">
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
const props = defineProps<{ itemList: Array<ItemListType> }>()
const list = props.itemList
</script>

<style scoped lang="scss">
.main {
  width: 100%;
}
.content {
  width: 100%;
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
      line-height: 25px;
      color: #222222;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //使用自适应布局
      -webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
      -webkit-box-orient: vertical;
      padding-top: 10px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      .tag {
        font-size: 12px;
        color: #fa5151;
        span {
          background-color: rgba($color: #fa5151, $alpha: 0.1);
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
        color: rgba($color: #222222, $alpha: 0.7);
      }
    }
  }
}
</style>
