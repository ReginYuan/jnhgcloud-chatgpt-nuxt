<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { PdfOperateInfoType } from '@pzy915/pdf-preview'
import { baseUrl, loadPdfDocOperateInfo } from '@/composables/utils/PdfUtil'

const pdfPreviewRef = ref<HTMLDivElement>()
const goPageNum = ref<string>('1')
const pdfUrl = `${baseUrl}tushu.pdf`
const pdfOperator = ref<PdfOperateInfoType>()
const widthoff = ref<number>(200)
let avtive = ref(0)
if (process.client) {
  widthoff.value = (document as any).body.offsetWidth - 40
}

async function pdfOperatorInit() {
  if (!pdfPreviewRef.value) return
  pdfOperator.value = await loadPdfDocOperateInfo({
    pdfUrl,
    width: widthoff.value,
    pdfRenderContainerDom: pdfPreviewRef.value
  })
}
function onGoPage() {
  if (!pdfOperator.value) return
  if (Number(goPageNum.value) > pdfOperator?.value.totalPage) {
    showToast({
      message: '请输入正确的页码'
    })
  } else {
    pdfOperator.value.renderPage(parseInt(goPageNum.value))
    if (Number(goPageNum.value) === pdfOperator?.value.totalPage) {
      avtive.value = 3
    } else if (Number(goPageNum.value) === 1) {
      avtive.value = 0
    } else {
      avtive.value = -1
    }
  }
}
function onNextPage() {
  if (!pdfOperator.value) return
  goPageNum.value = '' + pdfOperator.value.renderNextPage()
  avtive.value = 2
  if (
    !pdfOperator.value ||
    Number(goPageNum.value) >= pdfOperator?.value.totalPage
  )
    return (avtive.value = 3)
}
function onPrevPage() {
  if (!pdfOperator.value) return
  goPageNum.value = '' + pdfOperator.value.renderPrevPage()
  avtive.value = 1
  if (!pdfOperator.value || Number(goPageNum.value) === 1) {
    avtive.value = 0
  }
}
function onFirstPage() {
  if (!pdfOperator.value) return
  goPageNum.value = '' + pdfOperator.value.renderPage(1)
  avtive.value = 0
}
function onLastPage() {
  if (!pdfOperator.value) return
  goPageNum.value =
    '' + pdfOperator.value.renderPage(pdfOperator.value.totalPage)
  avtive.value = 3
}

onMounted(() => {
  pdfOperatorInit()
})
</script>

<template>
  <div class="tabbar">
    <div class="tabbtn">
      <div :class="{ active: avtive === 0 }" @click="onFirstPage">首页</div>
      <div :class="{ active: avtive === 1 }" @click="onPrevPage">上一页</div>
      <div :class="{ active: avtive === 2 }" @click="onNextPage">下一页</div>
      <div :class="{ active: avtive === 3 }" @click="onLastPage">尾页</div>
    </div>
    <div class="input">
      转到
      <van-field
        v-model.number="goPageNum"
        input-align="right"
        @blur="onGoPage"
      />
      <span class="num">/{{ pdfOperator?.totalPage }}</span>
      <span>页</span>
    </div>
  </div>
  <div class="pdfPreview">
    <div class="centerPanel">
      <div ref="pdfPreviewRef" class="pdfPreviewCanvas"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  color: #1f46b6;
}
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #ffffff;
  .tabbtn {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #888888;
    div {
      margin: 0 8px;
    }
  }
  .input {
    display: flex;
    font-size: 14px;
    color: #888888;
    line-height: 28px;
    :deep(.van-cell) {
      width: 43px;
      height: 24px;
      border: 1px solid #ededed;
      border-radius: 2px;
      margin-left: 5px;
      padding: 0 5px;
    }
    .num {
      line-height: 28px;
      letter-spacing: 2px;
      font-size: 14px;
      color: #888888;
      margin-left: 3px;
    }
  }
}
.pdfPreview {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  padding: 0 20px;
  box-sizing: border-box;
  .centerPanel {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }

  .pdfPreviewCanvas {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
.pagePdf {
  margin-bottom: 10px;
}
</style>
