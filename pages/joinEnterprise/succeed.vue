<template>
  <div>
    <van-icon name="checked" />
    <div class="success">提交成功</div>
    <div class="title">您的企业认证申请已提交，平台正在审核中，请耐心等待</div>
    <div style="margin: 16px">
      <van-button block type="primary">下载筑数合宝APP</van-button>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: false })
</script>
<style scoped>
.van-badge__wrapper {
  color: #07c160;
  font-size: 70px;
  margin-left: 41%;
  margin-top: 40px;
}
.success {
  width: 100%;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #000000;
  line-height: 36px;
  text-align: center;
  margin-top: 20px;
}
.title {
  width: 70%;
  height: 51px;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ccd6cb;
  line-height: 22px;
  margin-left: 15%;
  text-align: center;
  margin-top: 20px;
}

.van-button--primary {
  background-color: #1f46b6;
  margin-top: 150px
}
</style>
