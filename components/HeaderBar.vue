<template>
  <div class="header">
    <van-nav-bar :left-text="props.title" left-arrow :clickable="false">
      <template #right>
        <van-button to="" round @click="goSearch">
          <span>搜索资讯</span>
          <img src="~/assets/img/icon-search.png" alt="" />
        </van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{ title: string; parentId: string }>()
const router = useRouter()
const goSearch = () => {
  router.push(`/search/${props.parentId}`)
}
</script>

<style scoped lang="scss">
.header {
  :deep(.van-nav-bar) {
    background-color: transparent;
    font-size: 20px;
    .van-nav-bar__right {
      width: 199px;
      .van-button {
        width: 100%;
        height: 32px;
        .van-button__text {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #a6a6a6;
        }
      }
    }
    .van-nav-bar__arrow,
    .van-nav-bar__text {
      font-size: 20px;
      color: #ffffff;
    }
  }
}
</style>
