<template>
  <HeaderBar title="产业头条"></HeaderBar>
  <van-tabs v-model:active="active" :ellipsis="false" @click-tab="onClickTab">
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <ItemList :tabItem="tabItem.data"></ItemList>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { getInfo } from '~/server/api/user'
import { ref, reactive, onMounted } from 'vue'
import { Tabtype } from '~/types/itemList'
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

const getTypeList = async () => {
  const parentId = '1636282443407937538'
  const { data } = await getInfo({ parentId })
  data.unshift({
    inforTypeId: '',
    parentId: '',
    name: '推荐',
    level: 1,
    sortBy: 0
  })
  tabList.value = data
}

const onClickTab = (info: any) => {
  tabItem.data = tabList.value.find(item => item.name === info.title) as Tabtype
}
onMounted(() => {
  getTypeList()
})
</script>

<style scoped lang="scss">
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
:deep(.van-tabs__line) {
  display: none;
}
.content {
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
