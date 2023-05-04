<template>
  <div>
    <div class="header">
      <div class="header-top">
        <div>{{ data[0].city }}</div>
        <div style="font-size: 25px">×</div>
      </div>
      <img src="~/assets/img/investment-climate-logo.png" alt="" />
    </div>
    <div class="content">
      <div v-for="(item,index) in data[0].data">
        <div class="top">
          <!-- <img :src="item.url" alt="" /> -->
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="middle">
          <div>{{ item.onetext }}</div>
          <div style="margin: 16px 0;">{{ item.twotext }}</div>
          <div>{{ item.threetext }}</div>
          <div v-show="item.fourtext" style="margin-top: 16px;">{{ item.fourtext }}</div>
        </div>
        <div >
          <RadarChart v-show="item.indicator.length>0" :indicator="item.indicator"></RadarChart>
        </div>

      </div>
    </div>
    
  </div>
</template>
<script setup lang="ts">
  definePageMeta({ layout: 'macrograph' })
  import RadarChart from './radarChart'
  import data from './data.json'
  const getList = () => {
    console.log(data, 'data')
  }
  getList()
</script>
<style scoped lang="scss">
  .header {
    height: 226px;
    background: url('~/assets/img/investment-climate-bg.png') no-repeat;
    background-size: 100% 100%;

    .header-top {

      height: 88px;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }

    img {
      margin-left: 28%;
    }
  }

  .content {
    background-color: #fff;
    margin-top: -40px;
    border-radius: 20px 20px 0px 0px;

    .top {
      display: flex;
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #333333;
      align-items: center;
      margin-left: 16px;

      img {
        width: 4px;
        height: 12px;
        margin-right: 5px;
      }
    }

    .middle {
      font-size: 13px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      line-height: 18px;
      padding: 0 16px;
      box-sizing: border-box;
    }
  }
</style>