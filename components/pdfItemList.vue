<template>
  <div class="content" @click="toDetail(props.list)">
    <div class="title">
      <div class="pic">
        <img src="~/assets/img/icon-pdf.png" alt="" />
      </div>
      <div class="text">{{ props.list.title }}</div>
    </div>
    <div class="info">
      <div class="tag">
        <span class="come">来源：{{ props.list.infoSources }}</span>
        <!-- <span class="page">{{ item.page }}</span> -->
      </div>
      <div class="time">{{ props.list.createTime?.split(' ')[0] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Base64 } from 'js-base64'
import { ItemListType } from '~/types/itemList'
const props = defineProps<{
  list: ItemListType
}>()
const router = useRouter()
function toDetail(item: any) {
  const url = Base64.encode(item.files)
  router.push(`/IndustryReport/detail/${url}`)
}
</script>

<style lang="scss" scoped>
.content {
  padding: 16px 16px 0;
  .title {
    font-size: 18px;
    color: #222222;
    display: flex;
    .pic {
      width: 20px;
      height: 24px;
      margin-right: 8px;
      img {
        height: 100%;
      }
    }
    .text {
      letter-spacing: 1px;
      line-height: 25px;
      text-align: left;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin: 17px 0;
    .tag {
      margin-left: 28px;
      .come {
        display: inline-block;
        line-height: 17px;
        color: #2ac670;
        // background-color: rgba($color: #2ac670, $alpha: 0.1);
        background-color: #eafaf1;
        padding: 0px 8px;
        border-radius: 2px;
        max-width: 100px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .page {
        margin-left: 9px;
        color: #fdad15;
        background-color: rgba($color: #fdad15, $alpha: 0.1);
        padding: 4px 8px;
        border-radius: 2px;
      }
    }
    .time {
      color: #888888;
      margin-right: 15px;
      padding: 4px 0;
    }
  }
}
</style>
