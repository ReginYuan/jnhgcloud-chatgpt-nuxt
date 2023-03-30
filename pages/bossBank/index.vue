<template>
  <HeaderBar title="老板智库" :parentId="Id"></HeaderBar>
  <van-tabs
    v-model:active="active"
    :ellipsis="false"
    @click-tab="onClickTab"
    swipeable
    @change="onChange"
  >
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <swipers v-if="showSwiper"></swipers>
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
          <ItemList :list="item"></ItemList>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getInfo, informationList } from '~/server/api/user'
import { Tabtype, ItemListType } from '~/types/itemList'
import { hideNav, geTokenAll } from '~/composables/utils/validate'
let Id = ref('1636282537209352194')

const active = ref(0)
let tabList = ref<Tabtype[]>([])
let itemList = ref<ItemListType[]>([])
let showSwiper = ref(true)
const loading = ref(false)
const finished = ref(false)

let idInfo = ref({
  levelOne: Id.value,
  levelTwo: '',
  recommend: ''
})
let page = ref({
  pageSize: 20,
  pageNum: 1
})

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
    ...page.value
  })
  itemList.value.push(...data.records)
  page.value.pageNum++
  loading.value = false
  if (data.records.length < page.value.pageSize) finished.value = true
}
onMounted(async () => {
  geTokenAll()
  hideNav()
  getTypeList()
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/bg-hand-yellow.png') no-repeat;
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
// .content {
//   height: calc(100vh - 100px);
//   overflow: auto;
// }
:deep(.van-cell) {
  padding: 0;
}
:deep(.van-tabs__line) {
  display: none;
}
:deep(.van-swipe-item) {
  min-height: 100vh;
}
</style>
