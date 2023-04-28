<template>
  <div class="body flex flex-col">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item icon="home-o" to="/macrograph/macroData"
        >宏观数据</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/macrograph/investmentClimate"
        >投资环境</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/macrograph/landData"
        >土地数据</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/macrograph/policyReport"
        >政策报告</van-tabbar-item
      >
    </van-tabbar>
    <main class="main">
      <!-- <slot /> -->
      <NuxtPage></NuxtPage>
    </main>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script setup lang="ts">
const active = ref(0)
</script>

<style scoped>
.van-tabbar {
  border-top: 1px solid #d9d9d9;
  height: 62px;
}
::v-deep .van-tabbar-item__text {
  font-size: 12px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #999999;
}
::v-deep .van-tabbar-item--active .van-tabbar-item__text {
  color: #333333;
}
</style>
