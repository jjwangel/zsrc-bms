/*
 * @Author: jjw
 * @Date: 2019-11-26 18:31:49
 * @Description: 关注台账查询
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-27 10:51:18
 */

import baseAPI from '../../base'

/**
 * @description 获取关注台账列表数据
 * @param {*} formData
 * @returns
 */
export const getFocusBooksList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focusbooks/page', params)
}

/**
 * @description 获取关注台账个人明细列表数据
 * @param {*} formData
 * @returns
 */
export const getFocusBooksRecords = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/focusbookrecords', params)
}
