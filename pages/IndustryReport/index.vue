<template>
  <HeaderBar title="行业报告"></HeaderBar>
  <van-tabs
    v-model:active="active"
    :line-width="10"
    :line-height="5"
    title-active-color="#000000"
    title-inactive-color="#888888"
    color="#2ac670"
    :ellipsis="false"
  >
    <van-tab :title="item" v-for="(item, index) in tabList" :key="index">
      <div class="content">
        <div v-for="(item, index) in list" :key="index" @click="toDetail(item)">
          <div class="title">
            <div class="pic">
              <img src="~/assets/img/icon-pdf.png" alt="" />
            </div>
            <div class="text">{{ item.title }}</div>
          </div>
          <div class="info">
            <div class="tag">
              <span class="come">{{ item.tag }}</span>
              <span class="page">{{ item.page }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { ItemListType } from '~/types/itemList'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const active = ref(0)
let value = ref('')
let tabList = ref([''])
tabList.value = ['推荐', '资本投资', '建设单位', '设计院', '材料设计院']

interface type {
  title: string
  time: string
  tag: string
  page: string
}
let list = ref<type[]>([])
list.value = [
  {
    title:
      '近日，《新建北京至雄安新区至商丘高速铁路环境影响评价第一次信息公告》在沿线各市（区）人民政府网站正式发布',
    time: '2023 - 2 - 1',
    tag: '来源：老板智库',
    page: '12页'
  },
  {
    title:
      '近日，《新建北京至雄安新区至商丘高速铁路环境影响评价第一次信息公告》在沿线各市（区）人民政府网站正式发布',
    time: '2023 - 2 - 1',
    tag: '来源：老板智库',
    page: '12页'
  },
  {
    title:
      '近日，《新建北京至雄安新区至商丘高速铁路环境影响评价第一次信息公告》在沿线各市（区）人民政府网站正式发布',
    time: '2023 - 2 - 1',
    tag: '来源：老板智库',
    page: '12页'
  }
]
const router = useRouter()
function toDetail(item: any) {
  const id = 123456
  router.push(`/IndustryReport/detail/${id}`)
}
</script>

<style scoped lang="scss">
.fixd {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
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
