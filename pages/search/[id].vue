<template>
  <div class="top"></div>
  <div class="header">
    <van-nav-bar left-arrow :clickable="false" @click-left="onClickLeft">
      <template #title>
        <van-search
          v-model="idInfo.title"
          placeholder="搜索资讯"
          background="transparent"
          shape="round"
          @focus="onFocus"
          :clearable="false"
        >
          <template #label>
            <img src="~/assets/img/icon-search.png" alt="" />
          </template>
        </van-search>
      </template>
      <template #right>
        <span class="search" @click="searchBtn">搜索</span>
      </template>
    </van-nav-bar>
  </div>
  <!-- tab栏 -->
  <van-tabs
    v-model:active="active"
    :ellipsis="false"
    @click-tab="onClickTab"
    inactive-color="#222229"
  >
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <!-- 搜索结果 -->
      <van-list
        v-if="isShow"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in itemList" :key="index">
          <!-- 行业报告 -->
          <PdfItemList
            :list="item"
            v-if="item.levelOne === '1636282673046081537'"
          ></PdfItemList>
          <ItemList :list="item" :type="type" v-else></ItemList>
        </van-cell>
      </van-list>
      <!-- 历史记录 -->
      <div v-else>
        <div class="history">
          <div class="history_title">搜索历史</div>
          <div class="clear">
            <van-icon name="delete-o" />
            <span class="clear_text" @click="clearBtn">清空</span>
          </div>
        </div>
        <div class="tag">
          <div
            v-for="(item, index) in taglist"
            :key="index"
            @click="goHistory(item)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { historyStrore } from '~/composables/store/model/history'
import { getInfo, informationList } from '~/server/api/user'
import { Tabtype, ItemListType } from '~/types/itemList'
const route = useRoute()
const active = ref(0)
let isShow = ref(false)
let tabList = ref<Tabtype[]>([])
let itemList = ref<ItemListType[]>([])
const loading = ref(false)
const finished = ref(false)
const taglist = ref<string[]>([])
let type = ref('')

let idInfo = ref({
  title: '',
  levelOne: ''
})
let page = ref({
  pageSize: 20,
  pageNum: 1
})

// 获取tab栏数据
const getTypeList = async () => {
  const { data } = await getInfo({ parentId: 0 })
  tabList.value = data
  const index = tabList.value.findIndex(
    item => item.inforTypeId === route.params.id
  )
  active.value = index
  // const item = tabList.value.find(item => item.inforTypeId === route.params.id)
  // idInfo.value.levelOne = item?.inforTypeId as string
}

const onClickTab = async (info: any) => {
  const value = tabList.value.find(item => item.name === info.title) as Tabtype
  if (value.inforTypeId === '1636282443407937538') {
    type.value = 'industry'
  } else if (value.inforTypeId === '1636282537209352194') {
    type.value = 'bossBank'
  } else if (value.inforTypeId === '1636282617106649089') {
    type.value = 'policyRule'
  }
  idInfo.value.levelOne = value.inforTypeId
  itemList.value = []
  page.value.pageNum = 1
  finished.value = false
}

const store = historyStrore()
const searchBtn = async () => {
  page.value.pageNum = 1
  itemList.value = []
  isShow.value = true
  finished.value = false
}
const goHistory = (item: any) => {
  idInfo.value.title = item
  page.value.pageNum = 1
  itemList.value = []
  isShow.value = true
  finished.value = false
}

const clearBtn = () => {
  store.setHistory([])
  taglist.value = []
}
const onFocus = () => (isShow.value = false)

const onLoad = async () => {
  const { data } = await informationList({ ...idInfo.value, ...page.value })
  itemList.value.push(...data.records)
  // 存储输入框历史记录
  if (idInfo.value.title != '') {
    taglist.value.unshift(idInfo.value.title)
    taglist.value = [...new Set(taglist.value)].slice(0, 10)
    taglist.value && store.setHistory(taglist.value)
  }
  loading.value = false
  page.value.pageNum++
  if (data.records.length < page.value.pageSize) finished.value = true
}
const onClickLeft = () => history.back()

onMounted(() => {
  const history = window.localStorage.getItem('History')
  taglist.value = history ? JSON.parse(history) : []
  idInfo.value.levelOne = route.params.id as string
  getTypeList()
  if (route.params.id === '1636282443407937538') {
    type.value = 'industry'
  } else if (route.params.id === '1636282537209352194') {
    type.value = 'bossBank'
  } else if (route.params.id === '1636282617106649089') {
    type.value = 'policyRule'
  }
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 46px;
  background-color: transparent;
}
:deep(.van-nav-bar) {
  font-size: 20px;
  .van-nav-bar__left {
    padding: 0 10px !important;
  }
  .van-nav-bar__title {
    min-width: 80% !important;
    .van-search {
      margin-right: 10px;
    }
    .van-search__label {
      display: flex;
      align-items: center;
    }
    .van-icon-search:before {
      content: none;
    }
  }
  .van-nav-bar__arrow {
    font-size: 20px;
    color: #222229;
  }
  .search {
    font-size: 16px;
    color: #222229;
  }
}
:deep(.van-tab__text) {
  font-size: 18px;
  color: #222229;
}
:deep(.van-tab--active) {
  .van-tab__text {
    color: #1f46b6;
  }
}
:deep(.van-tabs__line) {
  width: 60px;
  height: 2px;
  background-color: #1f46b6;
  bottom: 20px;
}
.history {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 0;
  margin-top: 16px;
  .history_title {
    font-size: 16px;
    color: #222222;
  }
  .clear {
    font-size: 14px;
    color: #1f46b6;
    .clear_text {
      margin-left: 7px;
    }
  }
}
.tag {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin: 16px 0;
  padding: 0 16px;
  span {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    margin: 4px;
    padding: 6px 16px;
    color: #3e3e3e;
    background-color: #f8f8f9;
  }
}
</style>
