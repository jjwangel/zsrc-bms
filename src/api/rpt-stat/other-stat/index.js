/*
 * @Author: jjw
 * @Date: 2019-06-14 19:17:40
 * @Description: 其他统计接口
 * @Last Modified by: jjw
 * @Last Modified time: 2019-06-21 14:24:25
 */

import baseAPI from '../../base'

/**
 * @description 获取负债前10数据
 * @param {*} formData
 * @returns
 */
export const getDebtTop10List = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/debttop', params)
}

/**
 * @description 获取失信被执行员工数据
 * @param {*} formData
 * @returns
 */
export const getLostForceList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/forcelist', params)
}

/**
 * @description 获取负债类型统计数据
 * @returns
 */
export const getDebttypeStat = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/debttype', params)
}
