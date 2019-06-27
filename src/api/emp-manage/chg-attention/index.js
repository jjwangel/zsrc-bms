/*
 * @Author: jjw
 * @Date: 2019-05-03 10:31:49
 * @Description: 调整员工关注类别
 * @Last Modified by: jjw
 * @Last Modified time: 2019-05-28 17:20:19
 */

import baseAPI from '../../base'

/**
 * @description 获取员工关注类别数据
 * @param {*} formData
 * @returns
 */
export const getEmpAttentionInfo = (formData) => {
  const params = { ...formData }

  return baseAPI.getOneRowData('/focusperson', params)
}

/**
 * @description 修改员工关注类别数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpAttentionInfo = async (formData) => {
  let data = { ...formData }
  const res = await baseAPI.modifyData('focusperson', data)
  return res
}
