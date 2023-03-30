<template>
  <div style="background-color: #f7f7f7; height: 2px"></div>
  <div class="content">
    <div class="title">{{ content.data.title }}</div>
    <div class="infos">
      <div class="info_tag">
        <span>{{ content.data.infoSources }}</span>
      </div>
      <div class="time">
        {{ content.data.authorBy
        }}<i
          class="point"
          v-show="content.data.authorBy && content.data.createTime"
        ></i
        >{{ content.data.createTime.split(' ')[0] }}
      </div>
    </div>
    <div class="text" v-html="content.data.content"></div>
  </div>
  <!-- 标签 -->
  <div class="tag">
    <div v-for="(ele, ind) in content.data.lables" :key="ind">
      <span>{{ ele.lableName }}</span>
    </div>
  </div>
  <!-- 相关文章 -->
  <div style="background-color: #f7f7f7; height: 8px"></div>
  <div class="about">
    <div class="title">相关文章</div>
    <van-list>
      <van-cell v-for="(item, index) in itemList" :key="index">
        <ItemList :list="item"></ItemList>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ItemListType } from '~/types/itemList'
import { getDetail, relatedArticles } from '~/server/api/user'
const route = useRoute()
const router = useRouter()
let content = reactive<{ data: ItemListType }>({
  data: {
    inforId: '',
    title: '',
    levelOne: '',
    levelTwo: '',
    content: '',
    coverLink: '',
    createTime: '',
    infoSources: '',
    lables: []
  }
})
let itemList = ref<ItemListType[]>([])
const getDetails = async () => {
  const { data } = await getDetail({ inforId: route.params.id })
  content.data = data
  const res = await relatedArticles({
    inforId: content.data.inforId,
    levelOne: content.data.levelOne,
    levelTwo: content.data.levelTwo,
    pageSize: 10,
    pageNum: 1
  })
  itemList.value = res.data
}
const onClickLeft = () => {
  console.log(content.data.levelOne)
  if (content.data.levelOne === '1636282443407937538') {
    router.push('/industry')
  } else if (content.data.levelOne === '1636282537209352194') {
    router.push('/bossBank')
  } else if (content.data.levelOne === '1636282673046081537') {
    router.push('/bossBank')
  }
}

onMounted(() => {
  getDetails()
})
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  .van-icon-star-o:before {
    color: #222229;
    font-size: 22px;
  }
}
:deep(.van-icon-star-o:before) {
  color: #222229;
  font-size: 22px;
  margin-right: 20px;
}
:deep(.van-icon-arrow-left) {
  color: #222229;
  font-size: 22px;
}

.content {
  margin-bottom: 16px;
  .title {
    padding: 12px 16px 0;
    font-size: 18px;
    color: #222222;
  }
  .infos {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin: 16px;
    .info_tag {
      span {
        color: #fa5151;
        background-color: rgba($color: #fa5151, $alpha: 0.1);
        padding: 0 8px;
      }
    }
    .time {
      color: rgba($color: #222222, $alpha: 0.5);
      .point {
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 3px;
        margin: 0 3px;
        background-color: #c4c4c4;
      }
    }
  }
  .text {
    box-sizing: border-box;
    padding: 0 16px;
    word-wrap: break-word;
    width: 100%;
    font-size: 16px;
    color: #222222;
    :deep(img) {
      width: 100%;
      margin: 12px 0;
    }
  }
}
.tag {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin-bottom: 16px;
  span {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    margin: 4px 8px;
    padding: 0 12px;
    color: #1f46b6;
    border: 1px solid #1f46b6;
    border-radius: 36px;
  }
}
.about {
  .title {
    font-size: 18px;
    color: #222222;
    padding: 16px;
  }
}
</style>
