<template>
  <HeaderBar title="行业报告" :parentId="Id"></HeaderBar>
  <van-tabs
    v-model:active="active"
    :line-width="10"
    :line-height="5"
    title-active-color="#000000"
    title-inactive-color="#888888"
    color="#2ac670"
    :ellipsis="false"
    @click-tab="onClickTab"
  >
    <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index">
      <div class="content">
        <div
          v-for="(item, index) in itemList"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="title">
            <div class="pic">
              <img src="~/assets/img/icon-pdf.png" alt="" />
            </div>
            <div class="text">{{ item.title }}</div>
          </div>
          <div class="info">
            <div class="tag">
              <span class="come">来源：{{ item.infoSources }}</span>
              <!-- <span class="page">{{ item.page }}</span> -->
            </div>
            <div class="time">{{ item.createTime.split(' ')[0] }}</div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { Tabtype, ItemListType } from '~/types/itemList'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getInfo, informationList, bannerInfo } from '~/server/api/user'
import { Base64 } from 'js-base64'

let Id = ref('1636282673046081537')

const active = ref(0)
let tabList = ref<Tabtype[]>([])
let itemList = ref<ItemListType[]>([])
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
  tabList.value = []
  const parentId = '1636282673046081537'
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
    // 是否推荐
    const { data } = await bannerInfo({
      levelOne: tabItem.data.parentId,
      levelTwo: tabItem.data.inforTypeId,
      recommend: 'Y',
      pageSize: 5,
      pageNum: 1
    })
    itemList.value = data
  } else {
    const { data } = await informationList({
      levelOne: tabItem.data.parentId,
      levelTwo: tabItem.data.inforTypeId,
      pageSize: 5,
      pageNum: 1
    })
    itemList.value = data.records
  }
}

const router = useRouter()
function toDetail(item: any) {
  const url = Base64.encode(item.files)
  router.push(`/IndustryReport/detail/${url}`)
}
onMounted(async () => {
  getTypeList()
  const { data } = await bannerInfo({
    levelOne: '',
    levelTwo: '',
    recommend: 'Y',
    pageSize: 5,
    pageNum: 1
  })
  itemList.value = data
})
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/hand-bg-green.png') no-repeat;
  background-size: 100% 100%;
}

:deep(.van-tab__text) {
  font-size: 16px;
}
:deep(.van-tabs__line) {
  bottom: 20px !important;
  border-radius: 4px 4px 0 0 !important;
}
.content {
  height: calc(100vh - 90px);
  overflow: auto;
  padding: 10px 16px 0;
  .title {
    font-size: 18px;
    color: #222222;
    display: flex;
    .pic {
      width: 20px;
      height: 24px;
      margin-right: 8px;
      img {
        height: 100%;
      }
    }
    .text {
      letter-spacing: 1px;
      line-height: 25px;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin: 21px 0 33px;
    .tag {
      margin-left: 28px;
      .come {
        color: #2ac670;
        background-color: rgba($color: #2ac670, $alpha: 0.1);
        padding: 4px 8px;
        border-radius: 2px;
      }
      .page {
        margin-left: 9px;
        color: #fdad15;
        background-color: rgba($color: #fdad15, $alpha: 0.1);
        padding: 4px 8px;
        border-radius: 2px;
      }
    }
    .time {
      color: #888888;
      margin-right: 15px;
      padding: 4px 0;
    }
  }
}
</style>
