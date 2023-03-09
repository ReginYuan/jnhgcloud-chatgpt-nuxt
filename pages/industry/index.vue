<template>
  <!-- 头部搜索区域 -->
  <div class="header">
    <div class="title">
      <van-icon name="arrow-left" />
      <span>产业头条</span>
    </div>
    <div class="input">
      <van-search
        v-model="value"
        placeholder="搜索资讯"
        background="transparent"
        shape="round"
      />
    </div>
  </div>
  <van-tabs v-model:active="active">
    <van-tab :title="item" v-for="(item, index) in tabList" :key="index">
      <ItemList :itemList="itemLists"></ItemList>
      <!-- <ItemList :title="`xxxxxxxxx`"></ItemList> -->
    </van-tab>
  </van-tabs>
  <!-- <ul class="tabbar">
    <li v-for="(item, index) in tabList" :key="index">
      <span>{{ item }}</span>
    </li>
  </ul> -->
</template>
<script lang="ts" setup>
import { ItemListType } from '~/types/itemList'
import { ref } from 'vue'
const active = ref(0)
let tabList = ref([''])

let value = ref('')

let itemLists = ref<ItemListType[]>([])

tabList.value = [
  '推荐',
  '资本投资',
  '建设单位',
  '设计院',
  '材料设计院',
  '推荐',
  '资本投资',
  '建设单位',
  '设计院',
  '材料设计院',
  '推荐',
  '资本投资',
  '建设单位',
  '设计院',
  '材料设计院',
  '推荐',
  '资本投资',
  '建设单位',
  '设计院',
  '材料设计院'
]

itemLists.value = [
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
]
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/bg-hand-red.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 21px;
  .title {
    font-size: 20px;
    color: #ffffff;
    span {
      margin-left: 12px;
    }
  }
  .input {
  }
}
</style>
