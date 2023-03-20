<template>
  <HeaderBar title="政策法规" :parentId="Id"></HeaderBar>
  <van-tabs
    v-model:active="active"
    line-height="0"
    :ellipsis="false"
    @click-tab="onClickTab"
  >
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <ItemList
        :itemList="itemList"
        :bannerList="bannerList"
        :showRuleSwiper="showSwiper"
      ></ItemList>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { getInfo } from '~/server/api/user'
import { ref, reactive, onMounted } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
import { informationList, bannerInfo, relatedArticles } from '~/server/api/user'
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
let bannerList = ref<ItemListType[]>([])
let showSwiper = ref(false)

const getTypeList = async () => {
  const parentId = '1636282617106649089'
  const { data } = await getInfo({ parentId })
  tabList.value = [...data]
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
  if (tabItem.data?.parentId === '') {
    const { data } = await bannerInfo({
      levelOne: tabItem.data.parentId,
      levelTwo: tabItem.data.inforTypeId,
      recommend: 'Y',
      pageSize: 5,
      pageNum: 1
    })
    bannerList.value = data.slice(0, 3)
    showSwiper.value = true
    itemList.value = data
  } else {
    const { data } = await informationList({
      levelOne: tabItem.data.parentId,
      levelTwo: tabItem.data.inforTypeId,
      pageSize: 5,
      pageNum: 1
    })
    showSwiper.value = false
    itemList.value = data.records
  }
}
onMounted(async () => {
  getTypeList()
  const { data } = await bannerInfo({
    levelOne: tabItem.data.parentId,
    levelTwo: tabItem.data.inforTypeId,
    recommend: 'Y',
    pageSize: 5,
    pageNum: 1
  })
  bannerList.value = data.slice(0, 3)
  showSwiper.value = true
  itemList.value = data
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
</style>
