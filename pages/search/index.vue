<template>
  <div class="header">
    <van-nav-bar left-arrow :clickable="false" @click-left="onClickLeft">
      <template #title>
        <van-search
          v-model="value"
          placeholder="搜索资讯"
          background="transparent"
          shape="round"
        >
          <template #label>
            <img src="~/assets/img/icon-search.png" alt="" />
          </template>
        </van-search>
      </template>
      <template #right>
        <span class="search">搜索</span>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute()

const onClickLeft = () => history.back()

let value = ref('')
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
</style>
