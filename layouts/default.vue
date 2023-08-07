<template>
  <div class="layouts">
    <main class="main">
      <!-- <slot /> -->
      <NuxtPage keepalive></NuxtPage>
    </main>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.layouts {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 0 !important;
  margin: 0 !important;
  scrollbar-width: none;
  overflow: hidden;
  scrollbar-width: none !important;
}


.main{
  height: 100%;
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
