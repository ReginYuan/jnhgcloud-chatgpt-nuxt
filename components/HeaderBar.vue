<template>
  <div class="header">
    <van-nav-bar :left-text="props.title" left-arrow :clickable="false">
      <template #right>
        <van-button to="/search" round>
          <span>搜索资讯</span>
          <img src="~/assets/img/icon-search.png" alt="" />
        </van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<style scoped lang="scss">
.header {
  background: url('~/assets/img/bg-hand-red.png') no-repeat;
  background-size: 100% 100%;
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
