<template>
  <div class="body flex flex-col">
    <main class="main">
      <!-- <keep-alive>
        <slot />
      </keep-alive> -->
      <NuxtPage keepalive></NuxtPage>
    </main>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  KeepAlive: {
    exclude: ['industry', 'bossBank', 'IndustryReport', 'policyRule']
  }
})
</script>

<style scoped></style>
