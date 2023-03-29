<template>
  <div class="top"></div>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft">
      <template #right>
        <img src="~/assets/img/icon-send.png" alt="" />
      </template>
    </van-nav-bar>
  </div>
  <div class="content">
    <PdfPage></PdfPage>
  </div>
</template>

<script setup lang="ts">
const onClickLeft = () => history.back()
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 46px;
  background-color: transparent;
}
:deep(.van-icon) {
  color: #222229;
  font-size: 22px;
  /* font-weight: 700; */
}
:deep(.van-nav-bar__title) {
  font-size: 18px;
  color: #141419;
  /* letter-spacing: 1px; */
}

.content {
  // height: 100vh;
  height: calc(100vh - 92px);
  overflow: auto;
  background-color: #ededef !important;
  // padding: 0 20px;
}
</style>
