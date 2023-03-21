<template>
  <!-- 产业头条 -->
  <div class="industry_recommend" v-if="props.showSwiper">
    <swiper-side :swiperList="props.bannerList"></swiper-side>
  </div>
  <!-- 政策法规 -->
  <div class="policyRule" v-if="props.showRuleSwiper">
    <van-swipe class="my-swipe" :show-indicators="false" lazy-render>
      <van-swipe-item v-for="(item, index) in props.bannerList" :key="index">
        <van-image :src="item.coverLink" />
        <div class="swipe_title">{{ item.title }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- 老板智库 -->
  <div class="bossBank" v-if="props.showBossSwiper">
    <swipers :swiperList="props.bannerList"></swipers>
  </div>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    v-show="props.itemList?.length > 0"
  >
    <van-cell v-for="(item, index) in itemLists" :key="index">
      <div class="content">
        <!-- 一张图片 -->
        <div
          class="content-item"
          v-if="item?.coverLink"
          @click="toDetail(item)"
        >
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <div class="tag">
                {{ item.infoSources }}
              </div>
              <div class="time">
                {{ item.authorBy }}<i class="point"></i
                >{{ item.createTime.split(' ')[0] }}
              </div>
            </div>
          </div>
          <van-image
            width="80"
            height="80"
            fit="contain"
            radius="10"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
        </div>
        <!-- 无图片 -->
        <div class="content-item2" v-else>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <div class="tag">{{ item.infoSources }}</div>
              <div class="time">{{ item.authorBy }}·{{ item.createTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-cell>
  </van-list>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { ItemListType } from '~/types/itemList'
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'

const emit = defineEmits(['goNextpage'])
const props = defineProps<{
  itemList: ItemListType[]
  bannerList?: ItemListType[]
  showSwiper?: boolean
  showBossSwiper?: boolean
  showRuleSwiper?: boolean
}>()
const loading = ref(false)
const finished = ref(false)
const itemLists = ref<ItemListType[]>([])
const router = useRouter()
let color = ref('')
let backgroundColor = ref('')
let page = ref(1)
watch(
  () => props,
  (newValue, oldValue) => {
    if (newValue.showBossSwiper) {
      color.value = '#FDAD15'
      backgroundColor.value = '#fff3dc'
    } else if (props.showSwiper === true) {
      color.value = '#FA5151'
      backgroundColor.value = '#ffeeee'
    } else if (props.showRuleSwiper === true) {
      color.value = '#007AFF'
      backgroundColor.value = '#e6f2ff'
    }
    console.log(newValue)
    itemLists.value = newValue.itemList
    // itemLists.value = itemLists.value.concat(newValue.itemList)
  },
  { immediate: true, deep: true }
)

const onLoad = async () => {
  if (props.itemList.length < 5) {
    finished.value = true
  } else {
    page.value++
    emit('goNextpage', page.value)
    loading.value = false
  }
}

const toDetail = (item: ItemListType) => {
  router.push(`/details/${item.inforId}`)
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.content {
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
}

:deep(.van-cell__value) {
  text-align: left;
}
// 政策法规
.policyRule {
  padding: 10px 20px;
  :deep(.van-swipe-item) {
    box-sizing: border-box;
    width: 335px;
    height: 179px;
    padding: 0 5px;
    position: relative;
    .van-image {
      width: 100%;
      height: 100%;
      .van-image__img {
        border-radius: 10px;
      }
    }
    .swipe_title {
      position: absolute;
      bottom: 8px;
      left: 5px;
      line-height: 24px;
      padding: 8px 12px 0;
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
