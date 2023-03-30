<template>
  <HeaderBar title="产业头条" :parentId="Id"></HeaderBar>
  <van-tabs v-model:active="active" :ellipsis="false" @click-tab="onClickTab">
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <SwiperSide v-if="showSwiper" :hotList="hotList"></SwiperSide>
      <!-- <KeepAlive> -->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in itemList" :key="index">
          <ItemList :list="item"></ItemList>
        </van-cell>
      </van-list>
      <!-- </KeepAlive> -->
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
import { getInfo, informationList } from '~/server/api/user'
import { hideNav } from '~/composables/utils/validate'
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
let hotList = ref<ItemListType[]>([])
let showSwiper = ref(true)
const loading = ref(false)
const finished = ref(false)
let idInfo = ref({
  levelOne: '',
  levelTwo: '',
  recommend: ''
})
let page = ref({
  pageSize: 20,
  pageNum: 1
})

// 获取tab栏数据
let tabList = ref<Tabtype[]>([])
const getTypeList = async () => {
  const { data } = await getInfo({ parentId: Id.value })
  tabList.value = JSON.parse(JSON.stringify(data))
  tabList.value.unshift({
    inforTypeId: '',
    parentId: '',
    name: '推荐',
    level: 1,
    sortBy: 0
  })
}

const onClickTab = async (info: any) => {
  tabItem.data = tabList.value.find(item => item.name === info.title) as Tabtype
  idInfo.value.levelOne = tabItem.data.parentId
  idInfo.value.levelTwo = tabItem.data.inforTypeId
  itemList.value = []
  page.value.pageNum = 1
  finished.value = false
}
const onLoad = async () => {
  if (tabItem.data?.parentId === '') {
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
  itemList.value.push(...data.records)
  if (tabItem.data?.parentId === '' && page.value.pageNum === 1) {
    hotList.value = itemList.value
    itemList.value = itemList.value.splice(3)
  }
  page.value.pageNum++
  loading.value = false
  if (data.records.length < page.value.pageSize) finished.value = true
}
onMounted(() => {
  hideNav()
  getTypeList()
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img//bg-hand-red.png') no-repeat;
  background-size: 100% 100%;
}
:deep(.van-tab__text) {
  color: #888888;
  font-size: 18px;
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
:deep(.van-tabs__line) {
  display: none;
}
:deep(.van-tabs) {
  margin-top: 50px !important;
}
// .content {
//   height: calc(100vh - 100px);
//   overflow: auto;
// }
</style>
