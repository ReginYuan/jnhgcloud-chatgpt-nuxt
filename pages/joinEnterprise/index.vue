<template>
  <div>
    <div class="top">
      <div class="name">山东诺来房地产开发有限公司</div>
      <div class="title">公司同事都在使用筑数合宝，优质商机等你发现</div>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            label-align="top"
            v-model="form.phone"
            name="手机号"
            label="手机号"
            placeholder="请输入您的手机号"
            required="true"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            label-align="top"
            v-model="form.code"
            name="验证码"
            label="验证码"
            required="true"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <div
                @click="sendCode"
                :class="codeMsg == '获取验证码' ? 'click' : 'click-disable'"
              >
                {{ codeMsg }}
              </div>
            </template>
          </van-field>
          <van-field
            label-align="top"
            v-model="form.name"
            name="真实姓名"
            label="真实姓名"
            placeholder="请输入真实姓名"
            required="true"
            :rules="[{ required: true, message: '请填写真实姓名' }]"
          />
          <van-field
            label-align="top"
            v-model="form.reason"
            name="申请理由"
            label="申请理由"
            placeholder="请输入申请理由"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <NuxtLink to="/joinEnterprise/succeed">
            <van-button block type="primary" native-type="submit">
              提交申请
            </van-button></NuxtLink
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, readonly } from 'vue'
definePageMeta({ layout: false })
const form = reactive({
  phone: undefined,
  code: undefined,
  name: undefined,
  reason: undefined
})
const disabled = ref(false)
const codeMsg = ref('获取验证码')
const codeNum = ref(5)
//提交申请
const onSubmit = values => {
  console.log('submit', values)
  console.log(form, 'form')
}
//发送验证码
const sendCode = () => {
  // 验证手机号格式是否正确
  var Reg = /^[1][34578][0-9]{9}$/
  if (form.phone) {
    if (Reg.test(form.phone)) {
      showSuccessToast('验证码发送成功')
      // 禁用按钮
      disabled.value = true
      // 倒计时
      let timer = setInterval(() => {
        --codeNum.value
        codeMsg.value = `重新发送(${codeNum.value})`
      }, 1000)
      // 判断什么时候停止定时器
      setInterval(() => {
        clearInterval(timer)
        codeNum.value = 5
        disabled.value = false
        codeMsg.value = '获取验证码'
      }, 5000)
    } else {
      showFailToast('手机号格式错误')
    }
  } else {
    showFailToast('请填写手机号')
  }
}
</script>
<style scoped>
.top {
  margin-left: 30px;
  margin-top: 30px;
}
.name {
  width: 286px;
  height: 30px;
  font-size: 22px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #222229;
  line-height: 30px;
}
.title {
  width: 252px;
  height: 16px;
  font-size: 12px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #888889;
  line-height: 16px;
  margin-top: 10px;
}
.content {
  margin-top: 15px;
}
.van-button--primary {
  background-color: #1f46b6;
}
.van-button {
  margin-top: 50px;
}
.click-disable {
  pointer-events: none;
  color: #ccc;
}
.click {
  color: #1f46b6;
}
</style>
