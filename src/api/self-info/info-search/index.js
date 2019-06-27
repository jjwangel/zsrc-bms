/*
 * @Author: jjw
 * @Date: 2019-04-10 19:22:37
 * @Description: 我的信息-个人信息查询
 * @Last Modified by: jjw
 * @Last Modified time: 2019-05-28 19:59:11
 */
import baseAPI from '../../base'

/**
 * @description 获取违规积分列表数据
 * @param {*} formData
 * @returns
 */
export const getIntegralList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empoutlinegeninfos', params)
}

/**
 * @description 获取违规违纪列表数据
 * @param {*} formData
 * @returns
 */
export const getDisciplineList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empoutlinelayinfos', params)
}

/**
 * @description 获取经济处罚列表数据
 * @param {*} formData
 * @returns
 */
export const getEconomicList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/emppushinfos', params)
}
