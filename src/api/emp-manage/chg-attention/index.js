/*
 * @Author: jjw
 * @Date: 2019-05-03 10:31:49
 * @Description: 调整员工关注类别
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-20 19:13:41
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
