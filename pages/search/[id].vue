<template>
  <div class="header">
    <van-nav-bar left-arrow :clickable="false" @click-left="onClickLeft">
      <template #title>
        <van-search
          v-model="title"
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
    <van-tab
      v-model:active="active"
      :title="item.name"
      v-for="(item, index) in tabList"
      :key="index"
    >
      <!-- 搜索结果 -->
      <ItemList
        v-if="isShow"
        :itemList="itemList"
        @goNextpage="goNextpage"
      ></ItemList>
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
let title = ref('')
let tabList = ref<Tabtype[]>([])
let itemList = ref<ItemListType[]>([])
let inforTypeId = ref('')
const taglist = ref<string[]>([])
let page = ref({
  pageSize: 5,
  pageNum: 2
})

const getTypeList = async () => {
  const { data } = await getInfo({ parentId: 0 })
  tabList.value = data
  const index = tabList.value.findIndex(
    item => item.inforTypeId === route.params.id
  )
  active.value = index
}

const onClickTab = async (info: any) => {
  const value = tabList.value.find(item => item.name === info.title) as Tabtype
  inforTypeId.value = value.inforTypeId
  searchBtn()
}

const store = historyStrore()
const searchBtn = async () => {
  isShow.value = true
  if (title.value != '') {
    taglist.value.unshift(title.value)
    taglist.value = [...new Set(taglist.value)].slice(0, 10)
    taglist.value && store.setHistory(taglist.value)
  }
  const { data } = await informationList({
    levelOne: inforTypeId.value,
    title: title.value,
    pageSize: page.value.pageSize,
    pageNum: page.value.pageNum
  })
  itemList.value = data.records
}
const clearBtn = () => {
  store.setHistory([])
  taglist.value = []
}
const onFocus = () => (isShow.value = false)
const goHistory = (item: any) => {
  title.value = item
  searchBtn()
}
const onClickLeft = () => history.back()
const goNextpage = (info: number) => {
  page.value.pageNum = info
  console.log('触底加载下一页数据')
  searchBtn()
}

let value = ref('')
onMounted(() => {
  const history = window.localStorage.getItem('History')
  taglist.value = history ? JSON.parse(history) : []
  getTypeList()
})
</script>

<style scoped lang="scss">
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
  font-size: 16px;
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
  padding: 0 24px 0 16px;
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
