/*
 * @Author: jjw
 * @Date: 2019-11-21 09:20:49
 * @Description: 流程管理
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-26 14:36:35
 */

import baseAPI from '../../base'

/**
 * @description 获取流程列表数据
 * @param {*} formData
 * @returns
 */
export const getFlowsList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/flows/page', params)
}
