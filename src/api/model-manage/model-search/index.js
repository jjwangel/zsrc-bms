/*
 * @Author: jjw
 * @Date: 2019-06-22 10:00:07
 * @Description: 模型管理-模型查询
 * @Last Modified by: jjw
 * @Last Modified time: 2019-06-24 16:02:37
 */

import baseAPI from '../../base'

/**
 * @description 获取模型基本信息列表数据
 * @param {*} formData
 * @returns
 */
export const getModelBaseInfoList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/baseriskorgs/page', params)
}

/**
 * @description 获取模型参数信息列表数据
 * @param {*} formData
 * @returns
 */
export const getModelParaList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/pparameters', params)
}
