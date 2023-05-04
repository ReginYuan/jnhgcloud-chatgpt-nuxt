<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  // 表头，props需要和tableData每一个对象里的属性值一样
  headerData: { title: string; props: string }[]
  // 表格数据
  tableData: { [key: string]: any }[]
}>()

// 表头
const firstRow = computed(() => {
  const rows: string[] = []
  props.headerData.forEach((f, i) => {
    rows.push(f.title)
  })
  return rows
})

// 表格内容行（表单内容）
const tableBodyRows = props.tableData

// 表格内容列
const tableBodyCols = props.headerData
</script>
<template>
  <div class="content-table">
    <template v-if="props.tableData.length > 0">
      <div class="right-div">
        <div class="right-div2">
          <table
            class="right-table2"
            :style="{ width: (firstRow.length - 1) * 100 + 'px' }"
          >
            <tr>
              <th
                class="first-row-style"
                v-for="(row, index) in firstRow"
                :key="index"
              >
                {{ row }}
              </th>
            </tr>
            <tr v-for="(body, index) in tableBodyRows" :key="index">
              <td v-for="(col, i) in tableBodyCols" :key="col.props + i">
                {{ body[col.props] }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.content-table {
  box-sizing: border-box;
  // overflow-x: hidden;
  .right-div {
    width: calc(100vw - 32px);
    .right-div2 {
      width: 100%;
      overflow-x: scroll;
      color: #666666;
      font-size: 12px;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #d4d4d7;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: #f5f7fb;
      }
      .right-table2 {
        // overflow: hidden;
        .first-row-style {
          color: #333333;
          font-size: 12px;
          font-weight: 700;
        }
      }
    }
  }
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  border-spacing: 0;
  font-size: 13px;
}
th {
  word-break: break-all;
  word-wrap: break-word;
  height: 30px;
  vertical-align: middle;
  border-left: 1px solid #f5f7fb;
  box-sizing: border-box;
  text-align: left;
  padding-left: 12px;
}
td {
  word-break: break-all;
  word-wrap: break-word;
  vertical-align: middle;
  line-height: 30px;
  border-left: 1px solid #f5f7fb;
  box-sizing: border-box;
  padding-left: 12px;
}
tr {
  border-top: 1px solid #f5f7fb;
  box-sizing: border-box;
}
</style>
