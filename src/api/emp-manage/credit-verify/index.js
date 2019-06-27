/*
 * @Author: jjw
 * @Date: 2019-04-29 17:21:36
 * @Description: 员工征信报告确认
 * @Last Modified by: jjw
 * @Last Modified time: 2019-05-28 17:23:16
 */

import baseAPI from '../../base'

/**
 * @description 获取员工征信报告表数据
 * @param {*} formData
 * @returns
 */
export const getCreditByVerify = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcredstaus/page', params)
}

/**
 * @description 获取员工征信详细数据
 * @param {*} formData
 * @returns
 */
export const getEmpCreditDetailInfo = async (formData) => {
  const params = { ...formData }
  const debtData = await baseAPI.getListData('/empdebtinfos', params)
  const badrecData = await baseAPI.getListData('/empbadrecinfos', params)
  const assuData = await baseAPI.getListData('/empassuinfos', params)
  const forceData = await baseAPI.getListData('/empforceinfos', params)

  return {
    debtData,
    badrecData,
    assuData,
    forceData
  }
}

/**
 * @description 获取员工征信报告文件数据
 * @param {*} formData
 * @returns
 */
export const getCreditFile = async (formData) => {
  const url = `/empcredstau/${formData.id}`

  return baseAPI.getOneRowData(url)
}
