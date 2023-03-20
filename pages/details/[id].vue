<template>
  <van-nav-bar left-arrow @click-left="onClickLeft">
    <template #right>
      <van-icon name="star-o" />
      <img src="~/assets/img/icon-send.png" alt="" />
    </template>
  </van-nav-bar>
  <div style="background-color: #f7f7f7; height: 2px"></div>
  <div class="content">
    <div class="title">{{ content.data.title }}</div>
    <div class="infos">
      <div class="info_tag">
        <span>{{ content.data.infoSources }}</span>
      </div>
      <div class="time">
        {{ content.data.authorBy }}·{{ content.data.createTime.split(' ')[0] }}
      </div>
    </div>
    <div class="text" v-html="content.data.content"></div>
    <div class="pic">
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="" />
    </div>
  </div>
  <!-- 标签 -->
  <div class="tag">
    <div v-for="(ele, ind) in content.data.lables">
      <span>{{ ele.lableName }}</span>
    </div>
  </div>
  <!-- 相关文章 -->
  <div style="background-color: #f7f7f7; height: 8px"></div>
  <div class="about">
    <div class="title">相关文章</div>
    <ItemList :itemList="itemList"></ItemList>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ItemListType } from '~/types/itemList'
import { getDetail, relatedArticles } from '~/server/api/user'
const route = useRoute()
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
    pageSize: 5,
    pageNum: 1
  })
  itemList.value = res.data
}
const onClickLeft = () => history.back()

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
      }
    }
    .time {
      color: rgba($color: #222222, $alpha: 0.5);
    }
  }
  .text {
    box-sizing: border-box;
    padding: 0 16px;
    word-wrap: break-word;
  }
}
.pic {
  padding: 12px 16px 0;
  width: 90%;
  height: 173px;
  img {
    width: 100%;
    height: 100%;
  }
}
.tag {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin: 16px 0;
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
