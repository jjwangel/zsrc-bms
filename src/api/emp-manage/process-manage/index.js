/*
 * @Author: jjw
 * @Date: 2019-11-21 09:20:49
 * @Description: 流程管理
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-21 18:58:18
 */

import baseAPI from '../../base'

/**
 * @description 获取关注人员列表数据
 * @param {*} formData
 * @returns
 */
export const getFlowsList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/flows/page', params)
}
