<template>
  <div class="body flex flex-col">
    <!-- <HeaderBar></HeaderBar> -->
    <main class="main">
      <slot />
    </main>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
