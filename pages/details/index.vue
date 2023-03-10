<template>
  <div class="navBar">
    <van-icon name="arrow-left" />
    <div>
      <van-icon name="star-o" />
      <img src="~/assets/img/icon-send.png" alt="" />
    </div>
  </div>
  <div style="background-color: #f7f7f7; height: 2px"></div>
  <div class="content">
    <div class="title">高交会“绿色之家”带您探寻低碳健康智慧的“未来之家”</div>
    <div class="infos">
      <div class="info_tag">
        <span>设计院</span>
      </div>
      <div class="time">环球时报*10分钟前</div>
    </div>
    <div class="text">内容</div>
  </div>
  <!-- 标签 -->
  <div class="tag">
    <div v-for="(item, index) in tag" :key="index">
      <span>{{ item }}</span>
    </div>
  </div>
  <!-- 相关文章 -->
  <div style="background-color: #f7f7f7; height: 8px"></div>
  <div class="about">
    <div class="title">相关文章</div>
    <ItemList :itemList="itemLists"></ItemList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tag = ref([
  '未来的家是怎么样的家',
  '未来的家',
  '未来的家是怎样',
  '未来的家',
  '未来的世界'
])

const itemLists = ref([
  {
    title:
      '英国副首相承认已经为乌克兰培训了约2.2万人的武装力量英国副首相承认已经为乌克兰培训了约2.2万人的武装力量英国副首相承认已经为乌克兰培训了约2.2万人的武装力量',
    time: '10分钟前',
    tag: '标签',
    imgUrl: 'xxxxxxx'
  },
  {
    title: '英国副首相承认已经为乌克兰培训了约2.2万人的武装力量',
    time: '10分钟前',
    tag: '标签',
    imgUrl: 'xxxxxxx'
  },
  {
    title: '英国副首相承认已经为乌克兰培训了约2.2万人的武装力量',
    time: '10分钟前',
    tag: '标签',
    imgUrl: 'xxxxxxx'
  }
])
</script>

<style lang="scss" scoped>
.navBar {
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 5px;
  img {
    vertical-align: middle;
    margin-left: 24px;
  }
}
.content {
  .title {
    padding: 12px 16px 0;
    font-size: 18px;
    color: #222222;
  }
  .infos {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin: 16px;
    .info_tag {
      span {
        color: #fa5151;
        background-color: rgba($color: #fa5151, $alpha: 0.1);
      }
    }
    .time {
      color: rgba($color: #222222, $alpha: 0.5);
    }
  }
  .text {
    padding: 0 16px;
  }
}
.tag {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin: 16px 0;
  span {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    margin: 4px 8px;
    padding: 0 12px;
    color: #1f46b6;
    border: 1px solid #1f46b6;
    border-radius: 36px;
  }
}
.about {
  .title {
    font-size: 18px;
    color: #222222;
    padding: 16px;
  }
}
</style>
