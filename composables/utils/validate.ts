/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time: string | number | Date, pattern: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = (formatObj as any)[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: { [x: string]: any }) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

import { showToast } from 'vant'
import { userStrore } from '../store/model/userStore'
export const geTokenAll = () => {
  // 判断是ios环境还是安卓的环境
  let us = navigator.userAgent
  let isAndroid = us.indexOf('Android') > -1 || us.indexOf('Linux') > -1
  let isIOS =
    us.indexOf('ios_app') > -1 || !!us.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (process.client) {
    if (isAndroid) {
      var index = us.indexOf('=')
      var token = us.slice(index + 1)
      const user = userStrore()
      user.setToken(token)
      return
    }
    // 如果是在ios环境下就调用对应返回ios登录界面的方法
    if (isIOS) {
      var index = us.indexOf('=')
      var token = us.slice(index + 1)
      const user = userStrore()
      // user.setToken(token)
      return
    }
  }
}

export const hideNav = () => {
  // 判断是ios环境还是安卓的环境
  let us = navigator.userAgent
  let isAndroid = us.indexOf('Android') > -1 || us.indexOf('Linux') > -1
  let isIOS =
    us.indexOf('ios_app') > -1 || !!us.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  if (process.client) {
    // 如果是在ios环境下就调用对应返回ios登录界面的方法
    if (isIOS && (window as any).webkit != undefined) {
      ;(window as any).webkit.messageHandlers.hideNav.postMessage('hideNav')
    }
  }
}

export const closewebView = () => {
  // 判断是ios环境还是安卓的环境
  let us = navigator.userAgent
  let isAndroid = us.indexOf('Android') > -1 || us.indexOf('Linux') > -1
  let isIOS =
    us.indexOf('ios_app') > -1 || !!us.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  if (process.client) {
    // 如果是在ios环境下就调用对应返回ios界面的方法
    if (isIOS && (window as any).webkit != undefined) {
      ;(window as any).webkit.messageHandlers.closeWebView.postMessage(
        'closeWebView'
      )
    }
    // 如果是在安卓环境下就调用对应的返回安卓界面的方法
    // if(isAndroid && (window as any).androidInterface != undefined){
    //   ;(window as any).androidInterface.back()
    // }
    if (isAndroid) {
      console.log('这是安卓')
      // ;(window as any).androidInterface.back()
      ;(window as any).Android.back()
    }
  }
}
