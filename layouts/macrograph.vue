<template>
  <div class="body flex flex-col">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item icon="home-o" to="/macrograph/macroData">
        <span>宏观数据</span>
        <template #icon="props">
          <img :src="props.active ? macroImg : unmacroImg" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/macrograph/investmentClimate">
        <span>投资环境</span>
        <template #icon="props">
          <img :src="props.active ? invest : uninvestImg" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/macrograph/landData">
        <span>土地数据</span>
        <template #icon="props">
          <img :src="props.active ? landdataImg : unlanddataImg" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/macrograph/policyReport">
        <span>政策报告</span>
        <template #icon="props">
          <img :src="props.active ? policyImg : unpolicyImg" />
        </template>
      </van-tabbar-item>
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
import macroImg from '~/assets/img/macro-tabbar.png'
import unmacroImg from '~/assets/img/unmacro-tabbar.png'
import invest from '~/assets/img/invest-tabbar.png'
import uninvestImg from '~/assets/img/uninvest-tabbar.png'
import landdataImg from '~/assets/img/landdata-tabbar.png'
import unlanddataImg from '~/assets/img/unlanddata-tabbar.png'
import policyImg from '~/assets/img/policy-tabbar.png'
import unpolicyImg from '~/assets/img/unpolicy-tabbar.png'
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
