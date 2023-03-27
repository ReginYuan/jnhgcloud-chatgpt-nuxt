<template>
  <HeaderBar title="政策法规" :parentId="Id"></HeaderBar>
  <van-tabs v-model:active="active" :ellipsis="false" @click-tab="onClickTab">
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <div class="policyRule" v-if="showSwiper">
        <van-swipe class="my-swipe" :show-indicators="false" lazy-render>
          <van-swipe-item v-for="(item, index) in swiperList" :key="index">
            <van-image :src="item.coverLink" />
            <div class="swipe_title">{{ item.title }}</div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in itemList"
          :key="index"
          :border="false"
        >
          <ItemList :list="item" type="policyRule"></ItemList>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { getInfo } from '~/server/api/user'
import { ref, reactive, onMounted } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
import { informationList, bannerInfo } from '~/server/api/user'
let Id = ref('1636282617106649089')
const active = ref(0)
let tabList = ref<Tabtype[]>([])
let tabItem = reactive<{ data: Tabtype }>({
  data: {
    inforTypeId: '',
    parentId: '',
    name: '',
    level: -1,
    sortBy: -1
  }
})
let itemList = ref<ItemListType[]>([])
let swiperList = ref<ItemListType[]>([])
let showSwiper = ref(false)
const loading = ref(false)
const finished = ref(false)
let idInfo = ref({
  levelOne: '',
  levelTwo: '',
  recommend: '',
  count: 20
})
interface pageType {
  offset?: number
  min?: string
}
let page = ref<pageType>({})

const getTypeList = async () => {
  const parentId = '1636282617106649089'
  const { data } = await getInfo({ parentId })
  tabList.value = JSON.parse(JSON.stringify(data))
  tabList.value.unshift({
    inforTypeId: '',
    parentId: '',
    name: '推荐',
    level: 1,
    sortBy: 0
  })
}

const getBannerList = async () => {
  const { data } = await bannerInfo({
    levelOne: tabItem.data.parentId,
    levelTwo: tabItem.data.inforTypeId,
    recommend: 'Y',
    pageSize: 5,
    pageNum: 1
  })
  swiperList.value = data
}

const onClickTab = async (info: any) => {
  tabItem.data = tabList.value.find(item => item.name === info.title) as Tabtype
  idInfo.value.levelOne = tabItem.data.parentId
  idInfo.value.levelTwo = tabItem.data.inforTypeId
  itemList.value = []
  page.value = {}
  finished.value = false
}
const onLoad = async () => {
  if (tabItem.data?.parentId === '') {
    getBannerList()
    idInfo.value.levelOne = Id.value
    idInfo.value.recommend = 'Y'
    showSwiper.value = true
  } else {
    idInfo.value.recommend = ''
    showSwiper.value = false
  }
  const { data } = await informationList({
    ...idInfo.value,
    ...page.value
  })
  itemList.value.push(...data.data)
  page.value.min = data.min
  page.value.offset = data.offset
  loading.value = false
  if (data.data.length < idInfo.value.count) finished.value = true
}
onMounted(async () => {
  getTypeList()
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/bg-hand-blue.png') no-repeat;
  background-size: 100% 100%;
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
        #007aff,
        rgba($color: #007aff, $alpha: 0)
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
:deep(.van-cell) {
  padding: 0;
}
:deep(.van-tabs__line) {
  display: none;
}
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
