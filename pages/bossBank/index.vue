<template>
  <!-- 头部搜索区域 -->
  <div class="fixd">
    <div class="header">
      <van-nav-bar left-text="老板智库" left-arrow :clickable="false">
        <template #right>
          <van-search
            v-model="value"
            placeholder="搜索资讯"
            background="transparent"
            shape="round"
          >
            <template #right-icon>
              <img src="~/assets/img/icon-search.png" alt="" />
            </template>
          </van-search>
        </template>
      </van-nav-bar>
    </div>
    <van-tabs v-model:active="active" line-height="0">
      <van-tab :title="item" v-for="(item, index) in tabList" :key="index">
        <ItemList :itemList="itemLists" :type="`bossBank`"></ItemList>
      </van-tab>
    </van-tabs>
  </div>
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
.fixd {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.header {
  background: url('~/assets/img/bg-hand-yellow.png') no-repeat;
  background-size: 100% 100%;
  :deep(.van-nav-bar) {
    background-color: transparent;
    font-size: 20px;
    .van-nav-bar__right {
      width: 199px;
      margin-left: 31px;
      .van-search {
        padding: 0;
        .van-field__right-icon {
          display: flex;
          align-items: center;
        }
      }
    }
    .van-nav-bar__arrow {
      font-size: 20px;
      color: #ffffff;
    }
    .van-nav-bar__text {
      font-size: 20px;
      color: #ffffff;
      margin-left: 10px;
    }
    .van-field__left-icon {
      display: none;
    }
  }
}
:deep(.van-tab__text) {
  color: #888888;
  font-size: 16px;
}
:deep(.van-tab--active) {
  .van-tab__text {
    position: relative;
    color: #000000;
    &::after {
      content: '';
      width: 80%;
      height: 5px;
      border-radius: 7px;
      background-image: linear-gradient(
        to right,
        #ffa432,
        rgba($color: #edb469, $alpha: 0)
      );
      position: absolute;
      bottom: -7px;
      left: 10%;
    }
  }
}
.content {
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
