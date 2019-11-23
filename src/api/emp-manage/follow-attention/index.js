/*
 * @Author: jjw
 * @Date: 2019-11-23 11:00:49
 * @Description: 关注人员跟进情况登记
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-23 16:11:10
 */

import baseAPI from '../../base'

/**
 * @description 获取关注人员跟进登记列表数据
 * @param {*} formData
 * @returns
 */
export const getFocusPersonFollowsList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focuspersonadjustflows/tofollows/page', params)
}

/**
 * @description 获取关注人员发起跟进登记详情查询
 * @param {*} formData
 * @returns
 */
export const getFocusPersonAdjustFlowDetail = (formData) => {
  const url = `/focuspersonadjustflow/tofollowdetail/${formData.id}`

  return baseAPI.getOneRowData(url)
}

/**
 * @description 新增关注人员跟进登记
 * @param {*} formData
 * @returns
 */
export const addFocusPersonFollow = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('focuspersonfollow', data)
  return res
}
