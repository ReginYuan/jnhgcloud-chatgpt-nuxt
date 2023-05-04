<script setup lang="ts">
import { ref, reactive } from 'vue'
import data from './landData.json'
import { type, trans } from '~/types/landType'
import TableIndex from '~/pages/macrograph/components/table.vue'
definePageMeta({ layout: 'macrograph' })

let plotData = ref<type[]>([])
plotData.value = data.data.children.data as type[]

let transacte = reactive<trans>({
  title: '',
  tradeArea: {
    first_level_title: '',
    tabData: []
  },
  businessTradePrice: {
    first_level_title: '',
    tabData: []
  },
  mineralTradePrice: {
    first_level_title: '',
    tabData: []
  }
})
transacte = data.data.children.dealData

// 表格tab高亮
const active = ref(0)
const active1 = ref(0)
const active2 = ref(0)
const handleArea = (item: any, index: number) => {
  active.value = index
}
const handleBusiness = (item: any, index: number) => {
  active1.value = index
}
const handleMineral = (item: any, index: number) => {
  active2.value = index
}

interface tableHeader {
  title: string
  props: string
}
interface tabletype {}
// 表格数据
const headerData = ref<tableHeader[]>([])
const tableData = ref<{ [key: string]: any }[]>([])
headerData.value = [
  {
    title: '指标',
    props: '第一列'
  },
  {
    title: '位置',
    props: '第二列'
  },
  {
    title: '得分',
    props: '第三列'
  },
  {
    title: '省内排名',
    props: '第四列'
  },
  {
    title: '全国排名',
    props: '第五列'
  },
  {
    title: '指标1',
    props: '第六列'
  }
]

tableData.value = [
  {
    第一列: 11,
    第二列: 12,
    第三列: 13,
    第四列: 14,
    第五列: 15,
    第六列: 16
  },
  {
    第四列: 21,
    第二列: 22,
    第三列: 23,
    第一列: 999,
    第五列: 25,
    第六列: 26
  },
  {
    第一列: 31,
    第二列: 32,
    第三列: 33,
    第四列: 34,
    第五列: 35,
    第六列: 36
  },
  {
    第一列: 31,
    第二列: 32,
    第三列: 33,
    第四列: 34,
    第五列: 35,
    第六列: 36
  },
  {
    第一列: 31,
    第二列: 32,
    第三列: 33,
    第四列: 34,
    第五列: 35,
    第六列: 36
  }
]
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="choose_site">
        <div>
          <img src="~/assets/img/position-icon.png" alt="" />
          <span>济南</span>
        </div>
        <div>
          <img src="~/assets/img/close.png" alt="" />
        </div>
      </div>
      <div class="title">
        <img src="~/assets/img/lang-data.png" alt="" />
      </div>
    </div>
    <div class="lang_scale">
      <div class="lang_scale_content" v-for="item in plotData" :key="item.id">
        <div class="title">{{ item.title }}</div>
        <div v-for="ele in item.children" :key="ele.id">
          <div class="first_level">{{ ele.title }}</div>
          <div class="main_content">
            <div v-for="e in ele.paragraph" :key="e.id">
              <div>{{ e.title }}</div>
              <div>{{ e.eachart }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="lang_scale_content">
        <div class="title">{{ transacte.title }}</div>
        <div>
          <div class="first_level">
            {{ transacte.tradeArea.first_level_title }}
          </div>
          <div class="main_table">
            <div class="tab">
              <div
                v-for="(item, index) in transacte.tradeArea.tabData"
                :key="item.id"
                @click="handleArea(item, index)"
                :class="{ highlight: active === index }"
              >
                {{ item.years }}
              </div>
            </div>
            <div>
              <table-index
                :headerData="headerData"
                :tableData="tableData"
              ></table-index>
            </div>
          </div>
        </div>
        <div>
          <div class="first_level">
            {{ transacte.businessTradePrice.first_level_title }}
          </div>
          <div class="main_table">
            <div class="tab">
              <div
                v-for="(item, index) in transacte.businessTradePrice.tabData"
                :key="item.id"
                @click="handleBusiness(item, index)"
                :class="{ highlight: active1 === index }"
              >
                {{ item.years }}
              </div>
            </div>
            <div>
              <table-index
                :headerData="headerData"
                :tableData="tableData"
              ></table-index>
            </div>
          </div>
        </div>
        <div>
          <div class="first_level">
            {{ transacte.mineralTradePrice.first_level_title }}
          </div>
          <div class="main_table">
            <div class="tab">
              <div
                v-for="(item, index) in transacte.mineralTradePrice.tabData"
                :key="item.id"
                @click="handleMineral(item, index)"
                :class="{ highlight: active2 === index }"
              >
                {{ item.years }}
              </div>
            </div>
            <div>表格</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.highlight {
  color: #3772fe;
}
.main {
  background-color: #f5f7fb;
}
.header {
  width: 100%;
  height: 226px;
  position: absolute;
  text-align: center;
  background: url('~/assets/img/land-bg.png');
  .choose_site {
    box-sizing: box-sizing !important;
    width: 90%;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
    position: absolute;
    top: 56px;
    color: #ffffff;
  }
  .title {
    position: absolute;
    top: 104px;
    left: 0;
    right: 0;
  }
}
.lang_scale {
  width: 100%;
  padding-top: 184px;
  position: relative;
  .lang_scale_content {
    background-color: #ffffff;
    padding: 26px 16px 16px;
    margin-bottom: 16px;
    &:first-child {
      border-radius: 20px 20px 0 0;
    }
    .title {
      color: #333333;
      font-size: 16px;
      font-weight: 700;
      position: relative;
      padding-left: 8px;
      &::before {
        content: '';
        width: 4px;
        height: 12px;
        background-color: #2563eb;
        position: absolute;
        left: -5px;
        top: 1px;
        border-radius: 5px;
      }
    }
    .first_level {
      color: #333333;
      font-size: 14px;
      font-weight: 700;
      margin: 26px 0 16px;
    }
    .main_content {
      background-color: #f5f7fb;
      border-radius: 12px;
      color: #666666;
      font-size: 14px;
      padding: 12px;
      line-height: 22px;
    }
    .main_table {
      .tab {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #f5f7fb;
        font-size: 14px;
        color: #999999;
        height: 38px;
        border-radius: 12px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
