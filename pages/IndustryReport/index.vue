<template>
  <HeaderBar title="行业报告" :parentId="Id"></HeaderBar>
  <div>
    <van-tabs
      v-model:active="active"
      :line-width="10"
      :line-height="5"
      title-active-color="#000000"
      title-inactive-color="#888888"
      color="#2ac670"
      :ellipsis="false"
      @click-tab="onClickTab"
      swipeable
      @change="onChange"
      sticky
      offset-top="23.5vw"
    >
      <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in itemList" :key="index">
              <PdfItemList :list="item"></PdfItemList>
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
let Id = ref('1636282673046081537')
const active = ref(0)
let itemList = ref<ItemListType[]>([])
let idInfo = ref({
  levelOne: Id.value,
  levelTwo: '',
  recommend: ''
})
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
let page = ref({
  pageSize: 20,
  pageNum: 1
})

let tabList = ref<Tabtype[]>([])
const getTypeList = async () => {
  tabList.value = []
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
  // 清空列表数据
  finished.value = false
  loading.value = true
  page.value.pageNum = 1
  onLoad()
}
const onLoad = async () => {
  if (idInfo.value.levelTwo === '') {
    idInfo.value.recommend = 'Y'
  } else {
    idInfo.value.recommend = ''
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
  page.value.pageNum++
  loading.value = false
  if (data.records.length < page.value.pageSize) finished.value = true
}

onMounted(async () => {
  hideNav()
  getTypeList()
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/hand-bg-green.png') no-repeat;
  background-size: 100% 100%;
}

:deep(.van-tab__text) {
  font-size: 18px;
}
:deep(.van-tabs__line) {
  bottom: 3px !important;
  border-radius: 4px 4px 0 0 !important;
}
:deep(.van-cell) {
  padding: 0;
}
:deep(.van-tabs) {
  margin-top: 88px !important;
}
:deep(.van-pull-refresh) {
  min-height: calc(100vh - 132px);
}
</style>
