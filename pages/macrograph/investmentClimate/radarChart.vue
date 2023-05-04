<template>
  <div ref="main" style="width: 95%; height: 300px" class="main"></div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, defineProps, watch } from 'vue'
  const props = defineProps < { indicator: Array } > ()
  //  按需引入 echarts
  import * as echarts from 'echarts'
  const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
  let option = ref({
    legend: {
      data: ['指标得分'],
      bottom: 30,
    },
    radar: {
      radius: 80,
      // shape: 'circle',
      center: ['50%', '40%'],
      indicator: [
      ],
      splitLine: {
        lineStyle: {
          width: 1,
          color: '#E5E5E6'
        }
      },
      name: {
        textStyle: {
          color: '#666666'
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '指标得分'
          }
        ],
        label: {},
        areaStyle: {
          color: '#96B4FA'
        }
      }
    ]
  })
  watch(
    () => props,
    (newValue, oldValue) => {
      if (newValue.indicator.length > 0) {
        option.value.radar.indicator = newValue.indicator
      }

    },
    { immediate: true, deep: true }
  )
  onMounted(() => {
    init()
  })
  function init() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(main.value)
    // 指定图表的配置项和数据

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option.value)
  }
</script>

<style scoped>
  .main {
    margin-top: 20px;
  }
</style>