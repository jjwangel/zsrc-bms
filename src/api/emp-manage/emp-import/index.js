/*
 * @Author: jjw
 * @Date: 2019-04-17 09:09:13
 * @Description: 员工管理-员工信息导入
 * @Last Modified by: jjw
 * @Last Modified time: 2020-07-16 20:30:13
 */

import baseAPI from '../../base'
// import _ from 'lodash'

/**
 * @description 获取导入主表数据
 * @param {*} formData
 * @returns
 */
export const getMainImportList = (formData) => {
  const params = { ...formData }
  if (formData.batNum === '') {
    delete params.batNum
  }

  return baseAPI.getListData('/empimpstaus', params)
}

/**
 * @description 获取员工家访列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpFamilyVisitList = async (formData) => {
  const params = { ...formData }

  if (formData.employeeNo === '') {
    delete params.employeeNo
  }
  if (formData.unconvType === '-1') {
    delete params.unconvType
  }

  const fvData = await baseAPI.getListData('/emphocainfos/page', params)

  return {
    fvData
  }
}

/**
 * @description 删除员工家访数据
 * @param {*} formData
 * @returns
 */
export const deleteEmpFamilyVisit = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/emphocainfo/${formData.id}`)
  return res
}

/**
 * @description 修改员工家访数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpFamilyVisit = async (formData) => {
  const data = { ...formData }
  const res = await baseAPI.modifyData('emphocainfo', data)
  return res
}

/**
 * @description 获取违规积分列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpIllegalIntegralList = async (formData) => {
  const params = { ...formData }

  const iiData = await baseAPI.getListData('/empoutlinegeninfos/page', params)

  return {
    iiData
  }
}

/**
 * @description 删除违规积分数据
 * @param {*} formData
 * @returns
 */
export const deleteEmpIllegalIntegral = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/empoutlinegeninfo/${formData.id}`)
  return res
}

/**
 * @description 修改违规积分数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpIllegalIntegral = async (formData) => {
  const data = { ...formData }
  const res = await baseAPI.modifyData('empoutlinegeninfo', data)
  return res
}

/**
 * @description 获取经济处罚列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpEconomicPunishList = async (formData) => {
  const params = { ...formData }

  const epData = await baseAPI.getListData('/emppushinfos/page', params)

  return {
    epData
  }
}

/**
 * @description 删除经济处罚数据
 * @param {*} formData
 * @returns
 */
export const deleteEmpEconomicPunish = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/emppushinfo/${formData.id}`)
  return res
}

/**
 * @description 修改经济处罚数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpEconomicPunish = async (formData) => {
  const data = { ...formData }
  const res = await baseAPI.modifyData('emppushinfo', data)
  return res
}

/**
 * @description 获取违规违纪列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpDisciplineList = async (formData) => {
  const params = { ...formData }

  const dpData = await baseAPI.getListData('/empoutlinelayinfos/page', params)

  return {
    dpData
  }
}

/**
 * @description 删除违规违纪数据
 * @param {*} formData
 * @returns
 */
export const deleteEmpDiscipline = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/empoutlinelayinfo/${formData.id}`)
  return res
}

/**
 * @description 修改违规违纪数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpDiscipline = async (formData) => {
  const data = { ...formData }
  const res = await baseAPI.modifyData('/empoutlinelayinfo', data)
  return res
}
