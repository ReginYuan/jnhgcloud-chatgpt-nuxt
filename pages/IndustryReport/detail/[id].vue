<template>
  <div>
    <van-nav-bar :title="route.params.id" left-arrow @click-left="onClickLeft">
      <template #right>
        <img src="~/assets/img/icon-send.png" alt="" />
      </template>
    </van-nav-bar>
  </div>
  <div class="content">pdf详情页{{ route.params.id }}</div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log(route.params.value)

const onClickLeft = () => history.back()
</script>

<style scoped lang="scss">
.content {
  height: calc(100vh - 46px);
  overflow: auto;
  background-color: #ededef !important;
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
</style>
