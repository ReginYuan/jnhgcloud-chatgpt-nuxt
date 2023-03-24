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
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in itemList"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="content">
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
              <div class="time">{{ item.createTime?.split(' ')[0] }}</div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { Tabtype, ItemListType } from '~/types/itemList'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getInfo, informationList } from '~/server/api/user'
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

let idInfo = ref({
  levelOne: '',
  levelTwo: '',
  recommend: '',
  count: 4
})
const loading = ref(false)
const finished = ref(false)
interface pageType {
  offset?: number
  min?: string
}
let page = ref<pageType>({})
let lastPage = ref(false)

const getTypeList = async () => {
  tabList.value = []
  const parentId = '1636282673046081537'
  const { data } = await getInfo({ parentId })
  tabList.value = JSON.parse(JSON.stringify(data))
  tabList.value.unshift({
    inforTypeId: '',
    parentId: '',
    name: '推荐',
    level: 1,
    sortBy: 0
  })
}

const getList = async () => {
  if (tabItem.data?.parentId === '') {
    idInfo.value.levelOne = Id.value
    idInfo.value.recommend = 'Y'
  } else {
    idInfo.value.recommend = ''
  }
  const { data } = await informationList({ ...idInfo.value, ...page.value })
  console.log(itemList.value, data.data)

  itemList.value.push(...data.data)
  page.value.min = data.min
  page.value.offset = data.offset
  if (data.data.length <= idInfo.value.count) lastPage.value = true
  console.log(itemList.value)
}

const onClickTab = async (info: any) => {
  tabItem.data = tabList.value.find(item => item.name === info.title) as Tabtype
  idInfo.value.levelOne = tabItem.data.parentId
  idInfo.value.levelTwo = tabItem.data.inforTypeId
  itemList.value = []
  page.value = {}
  getList()
}
const onLoad = async () => {
  getList()
  loading.value = false
  if (lastPage) finished.value = true
}

const router = useRouter()
function toDetail(item: any) {
  const url = Base64.encode(item.files)
  router.push(`/IndustryReport/detail/${url}`)
}
onMounted(async () => {
  getTypeList()
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
