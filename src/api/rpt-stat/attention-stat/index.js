/*
 * @Author: jjw
 * @Date: 2019-05-03 18:15:55
 * @Description: 关注人员情况统计表
 * @Last Modified by: jjw
 * @Last Modified time: 2019-06-12 17:38:16
 */

import baseAPI from '../../base'

/**
 * @description 获取关注人员情况列表数据
 * @param {*} formData
 * @returns
 */
export const getAttentionInstRptList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focuspersonstats/page', params)
}

/**
 * @description 获取关注人员情况二级列表数据
 * @param {*} formData
 * @returns
 */
export const getAttentionInst2RptList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focuspersonstats', params)
}

/**
 * @description 获取关注人员情况明细数据
 * @param {*} formData
 * @returns
 */
export const getAttentionDetailRptList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/employees/complex/page', params)
}

/**
 * @description 获取关注人员统计图表数据
 * @param {*} formData
 * @returns
 */
export const getAttentionCharList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focusperson/trend', params)
}
