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
}
</style>
