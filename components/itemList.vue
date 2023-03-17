<template>
  <!-- 产业头条 -->
  <div class="industry_recommend" v-if="show === true">
    <swiper-side :bannerList="bannerList"></swiper-side>
  </div>
  <!-- 政策法规 -->
  <div class="policyRule" v-if="false">
    <van-swipe class="my-swipe" :show-indicators="false" lazy-render>
      <van-swipe-item v-for="(item, index) in 5" :key="index">
        <van-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="swipe_title">
          俄乌谈判乌方代表：乌方不再致力于申请加入北约
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- 老板智库 -->
  <div class="bossBank" v-if="false">
    <swiper></swiper>
  </div>

  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in itemList"
      :key="index"
      @click="toDetail(item)"
    >
      <div class="content">
        <!-- 一张图片 -->
        <div class="content-item" v-if="item.coverLink">
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <div class="tag">
                <span v-for="(ele, ind) in item.lables">{{
                  ele.lableName
                }}</span>
              </div>
              <div class="time">
                {{ item.infoSources }}·{{ item.createTime.split(' ')[0] }}
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
              <div class="tag">
                <span v-for="(ele, ind) in item.lables">{{
                  ele.lableName
                }}</span>
              </div>
              <div class="time">
                {{ item.infoSources }}·{{ item.createTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-cell>
  </van-list>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Tabtype, ItemListType } from '~/types/itemList'
import { informationList, bannerInfo, relatedArticles } from '~/server/api/user'
import { useRouter } from 'vue-router'

const props = defineProps<{
  tabItem?: Tabtype
  type?: string
  Id?: string
}>()
const show = ref(true)
const loading = ref(false)
const finished = ref(false)
let itemList = ref<ItemListType[]>([])
let bannerList = ref<ItemListType[]>([])
const router = useRouter()
watch(
  () => props.tabItem,
  (newValue, oldValue) => {
    show.value = newValue?.inforTypeId === '' ? true : false
    // onLoad(newValue.tabItem)
  },
  { immediate: true, deep: true }
)
const onLoad = async () => {
  if (props.tabItem?.inforTypeId === '') {
    // 推荐首页
    const { data } = await bannerInfo({
      levelOne: props.tabItem.parentId,
      levelTwo: props.tabItem.inforTypeId,
      pageSize: 5,
      pageNum: 1
    })
    bannerList.value = data.slice(0, 3)
    itemList.value = data
  } else if (props.tabItem?.inforTypeId) {
    // 其他
    const { data } = await informationList({
      levelOne: props.tabItem?.parentId,
      levelTwo: props.tabItem?.inforTypeId,
      pageSize: 5,
      pageNum: 1
    })
    itemList.value = data.records
    console.log('其他', itemList.value)
  } else {
    // 相关文章
    const { data } = await relatedArticles({
      inforId: props.Id,
      pageSize: 5,
      pageNum: 1
    })
    itemList.value = data.records
    console.log('相关文章', itemList.value)
  }

  loading.value = false
  finished.value = true
  // console.log('触底了')
}

const toDetail = (item: ItemListType) => {
  router.push(`/details/${item.inforId}`)
}

let color = ref('')
let backgroundColor = ref('')
// if (props.type === 'bossBank') {
//   color.value = '#FDAD15'
//   backgroundColor.value = '#fff3dc'
// } else if (props.type === 'industry') {
//   color.value = '#FA5151'
//   backgroundColor.value = '#ffeeee'
// } else if (props.type === 'policyRule') {
//   color.value = '#007AFF'
//   backgroundColor.value = '#e6f2ff'
// }
// onMounted(() => {
//   getList()
// })
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
        span {
          background-color: v-bind('backgroundColor');
          padding: 2px 10px;
          margin: 0 20px;
          border-radius: 2px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .time {
        font-size: 12px;
        color: rgba($color: #222222, $alpha: 0.5);
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
