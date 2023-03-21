<template>
  <HeaderBar title="老板智库" :parentId="Id"></HeaderBar>
  <van-tabs
    v-model:active="active"
    line-height="0"
    :ellipsis="false"
    @click-tab="onClickTab"
  >
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <!-- <swipers v-if="showSwiper"></swipers> -->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <van-cell v-for="(item, index) in itemList" :key="index">
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

// 获取列表数据
let page = ref({
  levelOne: Id.value,
  levelTwo: '',
  recommend: '',
  min: '',
  offset: 0,
  count: 5
})

const getList = async () => {
  if (tabItem.data?.parentId === '') {
    const { data } = await informationList({
      levelOne: Id.value,
      levelTwo: page.value.levelTwo,
      recommend: 'Y',
      count: page.value.count
    })
    showSwiper.value = true
    itemList.value = data.data
    page.value.min = data.min
    page.value.offset = data.offset
  } else {
    const { data } = await informationList({
      levelOne: Id.value,
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
    const { data } = await informationList({ ...page.value })
    itemList.value.push(...data.data)
    page.value.min = data.min
    page.value.offset = data.offset
    loading.value = false
    if (data.data.length < page.value.count) finished.value = true
  } else {
    loading.value = false
    finished.value = true
  }
}
onMounted(async () => {
  getTypeList()
  getList()
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
.tag {
  color: pink;
}
.content {
  height: calc(100vh - 100px);
  overflow: auto;
}
:deep(.van-cell) {
  padding: 0;
}
</style>
