/*
 * @Author: jjw
 * @Date: 2019-05-03 17:20:07
 * @Description: 待审核征信统计报表
 * @Last Modified by: jjw
 * @Last Modified time: 2019-05-23 18:52:36
 */

import baseAPI from '../../base'

/**
 * @description 获取待审核征信机构统计列表数据
 * @param {*} formData
 * @returns
 */
export const getAwaitCreditRptList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcredstaus/deptstats/page', params)
}

/**
 * @description 获取待审核征信明细列表数据
 * @param {*} formData
 * @returns
 */
export const getAwaitCreditDetailRptList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcredstaus/page', params)
}
