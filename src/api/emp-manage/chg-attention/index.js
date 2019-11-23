/*
 * @Author: jjw
 * @Date: 2019-05-03 10:31:49
 * @Description: 调整员工关注类别
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-22 17:01:39
 */

import baseAPI from '../../base'

// 旧接口
// /**
//  * @description 获取员工关注类别数据
//  * @param {*} formData
//  * @returns
//  */
// export const getEmpAttentionInfo = (formData) => {
//   const params = { ...formData }

//   return baseAPI.getOneRowData('/focusperson', params)
// }

// /**
//  * @description 修改员工关注类别数据
//  * @param {*} formData
//  * @returns
//  */
// export const modifyEmpAttentionInfo = async (formData) => {
//   let data = { ...formData }
//   const res = await baseAPI.modifyData('focusperson', data)
//   return res
// }

/**
 * @description 获取关注人员列表数据
 * @param {*} formData
 * @returns
 */
export const getFocuspersonsList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focuspersons/page', params)
}

/**
 * @description 新增关注人员调整流程
 * @param {*} formData
 * @returns
 */
export const addFocusPersonAdjustFlow = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('focuspersonadjustflow', data)
  return res
}

/**
 * @description 获取调整进度列表数据
 * @param {*} formData
 * @returns
 */
export const getFocusPersonAdjustFlowsList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focuspersonadjustflows/page', params)
}

/**
 * @description 获取员工发起调整时详细功能的数据
 * @param {*} formData
 * @returns
 */
export const getFocusPersonDetail = (formData) => {
  const params = { ...formData }
  const url = '/focusperson/detail'

  return baseAPI.getOneRowData(url, params)
}

/**
 * @description 获取关注人员调整流程数据
 * @param {*} formData
 * @returns
 */
export const getFocusPersonAdjustFlowData = (formData) => {
  const url = `/focuspersonadjustflow/${formData.id}`

  return baseAPI.getOneRowData(url)
}

/**
 * @description 更新关注人员调整流程
 * @param {*} formData
 * @returns
 */
export const verifyFocusPersonAdjustFlow = async (formData) => {
  let data = { ...formData }
  const res = await baseAPI.modifyData('/focuspersonadjustflow', data)
  return res
}

/**
 * @description 删除关注人员调整流程
 * @param {*} formData
 * @returns
 */
export const deleteFocusPersonAdjustFlow = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/focuspersonadjustflow/${formData.id}`)
  return res
}

/**
 * @description 关注人员调整日志列表查询
 * @param {*} formData
 * @returns
 */
export const getFocusPersonAdjustFlowlogs = (formData) => {
  const params = { ...formData }
  const url = '/focuspersonadjustflowlogs'

  return baseAPI.getOneRowData(url, params)
}
