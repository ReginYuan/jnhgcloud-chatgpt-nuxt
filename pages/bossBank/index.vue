<template>
  <HeaderBar title="老板智库"></HeaderBar>
  <van-tabs
    v-model:active="active"
    line-height="0"
    :ellipsis="false"
    @click-tab="onClickTab"
  >
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
  const parentId = '1636282537209352194'
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
.fixd {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.header {
  background: url('~/assets/img/bg-hand-yellow.png') no-repeat;
  background-size: 100% 100%;
  :deep(.van-nav-bar) {
    background-color: transparent;
    font-size: 20px;
    .van-nav-bar__right {
      width: 199px;
      margin-left: 31px;
      .van-search {
        padding: 0;
        .van-field__right-icon {
          display: flex;
          align-items: center;
        }
      }
    }
    .van-nav-bar__arrow {
      font-size: 20px;
      color: #ffffff;
    }
    .van-nav-bar__text {
      font-size: 20px;
      color: #ffffff;
      margin-left: 5px;
    }
    .van-field__left-icon {
      display: none;
    }
  }
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
</style>
