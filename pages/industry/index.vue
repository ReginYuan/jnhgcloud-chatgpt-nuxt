<template>
  <HeaderBar title="产业头条" :parentId="Id"></HeaderBar>
  <div>
    <van-tabs
      v-model:active="active"
      :ellipsis="false"
      @click-tab="onClickTab"
      swipeable
      @change="onChange"
    >
      <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <SwiperSide v-if="showSwiper" :hotList="hotList"></SwiperSide>
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
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
import { getInfo, informationList } from '~/server/api/user'
import { hideNav } from '~/composables/utils/validate'
let Id = ref('1636282443407937538')
const active = ref(0)
let itemList = ref<ItemListType[]>([])
let hotList = ref<ItemListType[]>([])
let showSwiper = ref(true)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
let idInfo = ref({
  levelOne: Id.value,
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
    parentId: Id.value,
    name: '推荐',
    level: 1,
    sortBy: 0
  })
}

let tabItem = ref<Tabtype>()
const onClickTab = async (info: any) => {
  tabItem.value = tabList.value.find(
    item => item.name === info.title
  ) as Tabtype
  idInfo.value.levelOne = tabItem.value.parentId
  idInfo.value.levelTwo = tabItem.value.inforTypeId
  itemList.value = []
  page.value.pageNum = 1
  finished.value = false
}
const onChange = (info: any) => {
  idInfo.value.levelOne = tabList.value[info].parentId
  idInfo.value.levelTwo = tabList.value[info].inforTypeId
  itemList.value = []
  page.value.pageNum = 1
  finished.value = false
}
const onRefresh = () => {
  finished.value = false
  loading.value = true
  page.value.pageNum = 1
  onLoad()
}
const onLoad = async () => {
  if (idInfo.value.levelTwo === '') {
    idInfo.value.recommend = 'Y'
    showSwiper.value = true
  } else {
    idInfo.value.recommend = ''
    showSwiper.value = false
  }
  const { data } = await informationList({
    ...idInfo.value,
    ...page.value,
    key: Date.now()
  })
  if (refreshing.value) {
    itemList.value = []
    refreshing.value = false
    if (data.records) {
      showToast('刷新成功')
    }
  }
  itemList.value.push(...data.records)
  if (idInfo.value.levelTwo === '' && page.value.pageNum === 1) {
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
  margin-top: 88px !important;
  height: calc(100vh - 88px);
  overflow: auto;
}
:deep(.van-pull-refresh) {
  min-height: calc(100vh - 133px);
}
:deep(.van-tabs__nav) {
  width: 100%;
  height: 44px;
  position: fixed;
  top: 88px;
  left: 0;
  z-index: 999;
  overflow: scroll;
  padding-bottom: 0;
}
</style>
