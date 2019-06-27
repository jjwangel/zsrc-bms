/*
 * @Author: jjw
 * @Date: 2019-05-03 15:39:40
 * @Description: 风险级别统计报表
 * @Last Modified by: jjw
 * @Last Modified time: 2019-06-14 12:32:05
 */

import baseAPI from '../../base'

/**
 * @description 获取风险级别统计报表列表数据
 * @param {*} formData
 * @returns
 */
export const getRiskLevelRptList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/risklevel', params)
}

/**
 * @description 获取风险人员统计图表数据
 * @param {*} formData
 * @returns
 */
export const getRiskCharList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/risklevel/trend', params)
}
