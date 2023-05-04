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
    tabData: [],
    tableData: []
  },
  businessTradePrice: {
    first_level_title: '',
    tabData: [],
    tableData: []
  },
  mineralTradePrice: {
    first_level_title: '',
    tabData: [],
    tableData: []
  }
})
transacte = data.data.children.dealData

// 表格tab高亮
const active = ref(0)
const active1 = ref(0)
const active2 = ref(0)
const handleArea = (item: any, index: number) => {
  active.value = index
  tableData.value = transacte.tradeArea.tableData[index]
  console.log(tableData.value)
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
    title: '土地使用权人',
    props: 'user'
  },
  {
    title: '面积（亩）',
    props: 'area'
  },
  {
    title: '区域',
    props: 'region'
  },
  {
    title: '土地用途',
    props: 'landuse'
  },
  {
    title: '成交价格（万元）',
    props: 'price'
  },
  {
    title: '成交单价（万元/亩）',
    props: 'unitprice'
  }
]
tableData.value = [
  {
    user: '济南弘业房地产开发有限公司',
    area: '549.41',
    region: '天桥区',
    landuse: '文体娱乐用地',
    price: '22526',
    unitprice: '41.0'
  },
  {
    user: '济南弘业房地产开发有限公司',
    area: '549.41',
    region: '天桥区',
    landuse: '文体娱乐用地',
    price: '22526',
    unitprice: '41.0'
  },
  {
    user: '济南弘业房地产开发有限公司',
    area: '549.41',
    region: '天桥区',
    landuse: '文体娱乐用地',
    price: '22526',
    unitprice: '41.0'
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
                :tableScrollWidth="600"
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
