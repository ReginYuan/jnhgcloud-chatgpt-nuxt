<template>
  <HeaderBar title="老板智库" :parentId="Id"></HeaderBar>
  <van-tabs v-model:active="active" :ellipsis="false" @click-tab="onClickTab">
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
          <ItemList :list="item" type="bossBank"></ItemList>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { getInfo, informationList } from '~/server/api/user'
import { ref, reactive, onMounted } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
let Id = ref('1636282537209352194')

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
let showSwiper = ref(true)
const loading = ref(false)
const finished = ref(false)

interface pageType {
  offset?: number
  min?: string
}
let idInfo = ref({
  levelOne: '',
  levelTwo: '',
  recommend: '',
  count: 20
})
let page = ref<pageType>({})

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
  page.value = {}
  finished.value = false
}
const onLoad = async () => {
  if (tabItem.data?.parentId === '') {
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
  if (data.data.length <= idInfo.value.count) finished.value = true
}
onMounted(async () => {
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
:deep(.van-cell) {
  padding: 0;
}
:deep(.van-tabs__line) {
  display: none;
}
</style>
