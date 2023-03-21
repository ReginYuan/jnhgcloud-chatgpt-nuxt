<template>
  <HeaderBar title="产业头条" :parentId="Id"></HeaderBar>
  <van-tabs
    v-model:active="active"
    line-height="0"
    :ellipsis="false"
    @click-tab="onClickTab"
  >
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <!-- <SwiperSide v-show="showSwiper"></SwiperSide> -->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <van-cell v-for="(item, index) in itemList" :key="index">
          <ItemList :list="item" type="industry"></ItemList>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
import { getInfo, informationList, bannerInfo } from '~/server/api/user'
let Id = ref('1636282443407937538')
const active = ref(0)
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
let showSwiper = ref(true)
const loading = ref(false)
const finished = ref(false)
let page = ref({
  levelOne: '',
  levelTwo: '',
  min: '',
  offset: 0,
  count: 20
})

// 获取tab栏数据
let tabList = ref<Tabtype[]>([])
const getTypeList = async () => {
  const { data } = await getInfo({ parentId: Id.value })
  tabList.value = [...data]
  tabList.value.unshift({
    inforTypeId: '',
    parentId: '',
    name: '推荐',
    level: 1,
    sortBy: 0
  })
}

const getList = async () => {
  if (tabItem.data?.parentId === '') {
    const { data } = await informationList({
      levelOne: page.value.levelOne,
      levelTwo: page.value.levelTwo,
      count: page.value.count,
      recommend: 'Y'
    })
    showSwiper.value = true
    itemList.value = data.data
    page.value.min = data.min
    page.value.offset = data.offset
  } else {
    const { data } = await informationList({
      levelOne: page.value.levelOne,
      levelTwo: page.value.levelTwo,
      count: page.value.count
    })
    showSwiper.value = false
    itemList.value = data.data
    page.value.min = data.min
    page.value.offset = data.offset
  }
}

const onClickTab = async (info: any) => {
  tabItem.data = tabList.value.find(item => item.name === info.title) as Tabtype
  page.value.levelOne = tabItem.data.parentId
  page.value.levelTwo = tabItem.data.inforTypeId
  getList()
}
const onLoad = async () => {
  if (itemList.value.length >= page.value.count) {
    if (tabItem.data?.parentId === '') {
      // 请求推荐数据
      const { data } = await bannerInfo({ ...page.value, recommend: 'Y' })
      itemList.value.push(...data.data)
      page.value.min = data.min
      page.value.offset = data.offset
      loading.value = false
      if (data.data.length < page.value.count) finished.value = true
    } else {
      const { data } = await informationList({ ...page.value })
      itemList.value.push(...data.data)
      page.value.min = data.min
      page.value.offset = data.offset
      loading.value = false
      if (data.data.length < page.value.count) finished.value = true
    }
  } else {
    loading.value = false
    finished.value = true
  }
}
onMounted(() => {
  getTypeList()
  getList()
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img//bg-hand-red.png') no-repeat;
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
      width: 7px;
      height: 7px;
      border-radius: 7px;
      background-color: red;
      position: absolute;
      top: 0;
      right: -8px;
    }
  }
}

:deep(.van-cell) {
  padding: 0;
}
.content {
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
