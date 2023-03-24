<template>
  <!-- 一张图片 -->
  <div class="content-item" v-if="list?.coverLink" @click="toDetail(list)">
    <div class="text">
      <div class="title">{{ list.title }}</div>
      <div class="info">
        <div class="tag">
          {{ list.infoSources }}
        </div>
        <div class="time">
          {{ list.authorBy }}<i class="point" v-show="list.authorBy"></i
          >{{ list.createTime.split(' ')[0] }}
        </div>
      </div>
    </div>
    <van-image
      width="80"
      height="80"
      fit="cover"
      radius="10"
      :src="list.coverLink"
    />
  </div>
  <!-- 无图片 -->
  <div class="content-item2" v-else>
    <div class="text">
      <div class="title">{{ list.title }}</div>
      <div class="info">
        <div class="tag">{{ list.infoSources }}</div>
        <div class="time">{{ list.authorBy }}·{{ list.createTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { ItemListType } from '~/types/itemList'
import { useRouter } from 'vue-router'
const props = defineProps<{
  list: ItemListType
  itemList?: ItemListType[]
  bannerList?: ItemListType[]
  showSwiper?: boolean
  showBossSwiper?: boolean
  showRuleSwiper?: boolean
  type?: string
}>()

const router = useRouter()
let color = ref('')
let backgroundColor = ref('')
watch(
  () => props,
  (newValue, oldValue) => {
    if (newValue.type === 'bossBank') {
      color.value = '#FDAD15'
      backgroundColor.value = '#fff3dc'
    } else if (newValue.type === 'industry') {
      color.value = '#FA5151'
      backgroundColor.value = '#ffeeee'
    } else if (newValue.type === 'policyRule') {
      color.value = '#007AFF'
      backgroundColor.value = '#e6f2ff'
    }
  },
  { immediate: true, deep: true }
)

const toDetail = (item: ItemListType) => {
  router.push({
    name: 'details-id',
    params: { id: item.inforId }
  })
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}
.content-item2 {
  padding: 12px 16px;
}
.text {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: 16px;
  flex: 1;
  .title {
    font-size: 16px;
    line-height: 20px;
    color: #222222;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-top: 5px;
  }
  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tag {
      font-size: 12px;
      color: v-bind('color');
      background-color: v-bind('backgroundColor');
      padding: 0px 8px;
      border-radius: 2px;
    }
    .time {
      font-size: 12px;
      color: rgba($color: #222222, $alpha: 0.5);
      .point {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 5px;
        margin: 0 3px 2px;
        background-color: #c4c4c4;
      }
    }
  }
}
</style>
