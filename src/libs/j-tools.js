import cryptoJS from 'crypto-js'
import config from '@/config'

/* eslint-disable no-extend-native */
const dateFormat = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return fmt
}

Date.prototype.Format = dateFormat

/**
 * @param {object} selOpt 传入表单选项对像
 * @description 返回格式化后的表单选项
 */
export const formatSelectOption = (selOpt) => {
  let result = []
  Object.keys(selOpt).forEach((key) => {
    result.push({
      'key': Number.parseInt(key),
      'value': selOpt[key]
    })
  })
  return result
}

/**
 * @param {object} selOpt 传入表单选项对像
 * @description 返回格式化后的表单选项
 */
export const formatSelectOptionByDefine = (data, keyName, valueName) => {
  let result = []

  for (const elem of data.values()) {
    let keyValue = {}
    Object.keys(elem).forEach((key) => {
      if (key === keyName) {
        keyValue.key = (typeof elem[key] === 'number' && !isNaN(elem[key]) ? Number.parseInt(elem[key]) : elem[key])
      }
      if (key === valueName) {
        keyValue.value = elem[key]
      }
    })
    if (Object.keys(keyValue).length > 0) {
      result.push(keyValue)
    }
  }
  return result
}

/**
 * @param {object} selOpt 传入表单选项对像
 * @description 返回格式化后的表单选项
 */
export const formatSingleSelectOption = (selOpt) => {
  let result = []
  for (let elem of selOpt.values()) {
    result.push({
      'key': Number.parseInt(elem.value),
      'value': elem.name
    })
  }

  return result
}

/**
 * @param {String} startType 传入'year'则返回年头和年尾的日期字符串数组，否则返回月头和月尾的日期字符串数组
 * @description 返回起始日期与结束日期字符串数组
 */
export const getStartToLastDate = (startType, initDate) => {
  let today = new Date()

  if (initDate && initDate instanceof Date) {
    today = initDate
  }

  const year = today.getFullYear()
  const month = today.getMonth()
  let startDate
  let endDate

  if (startType === 'year') {
    startDate = new Date(year, 0, 1)
    endDate = new Date(year, 11, 31)
  } else {
    today.setDate(1)
    today.setMonth(month + 1)
    today.setDate(today.getDate() - 1)

    startDate = new Date(year, month, 1)
    endDate = today
  }

  return [startDate.Format('yyyy-MM-dd'), endDate.Format('yyyy-MM-dd')]
}

/**
 * @param {String} fmt 传入格式化字符串，如：yyyy-MM-dd
 * @description 返回格式化后的字符串
 */
export const getFormatDate = (fmt) => {
  const today = new Date()
  return today.Format(fmt)
}

/**
 * @param {String} fmt 传入格式化字符串，如：yyyy-MM-dd
 * @description 返回格式化后的字符串
 */
export const vaildForm = (self, formName) => {
  return new Promise((resolve, reject) => {
    self.$refs[formName].validate((valid) => {
      if (valid) {
        resolve()
      } else {
        reject(new Error('校验数据失败！'))
      }
    })
  })
}

export const accAdd = (arg1, arg2) => {
  let r1, r2, m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/* // 除法
function accDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  with(Math){
  r1=Number(arg1.toString().replace(".",""))
  r2=Number(arg2.toString().replace(".",""))
  return accMul((r1/r2),pow(10,t2-t1));
  }
  }
  //乘法
  function accMul(arg1,arg2)
  {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
  }
 //加法
 function accAdd(arg1,arg2){
 var r1,r2,m;
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 m=Math.pow(10,Math.max(r1,r2))
 return (arg1*m+arg2*m)/m
 }
 //减法
 function Subtr(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
 } */

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @param {Array} lst 传入路由数组
 * @param {Array} menuAccess 传入菜单权限数组
 * @description 跟据菜单权限更改路由可见
 */
export const setHideMenuByRule = function (lst, menuAccess) {
  for (let val of lst.values()) {
    if (val.children) {
      setHideMenuByRule(val.children, menuAccess)
      val.meta.hideInMenu = (val.children.findIndex((item) => { return item.meta.hideInMenu === false }) === -1)
    } else {
      val.meta.hideInMenu = (menuAccess.findIndex((item) => { return item === val.name }) === -1)
    }
  }
}

/**
 * @param {String} val 传入要加密的字符串
 * @description 加密字符串
 */
export const encryptStr = function (val) {
  const key = cryptoJS.enc.Utf8.parse(config.TripleDesOption.key)
  const iv = cryptoJS.enc.Utf8.parse(config.TripleDesOption.iv)
  return cryptoJS.TripleDES.encrypt(val, key, { iv }).ciphertext.toString()
}
