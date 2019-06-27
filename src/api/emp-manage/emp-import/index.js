/*
 * @Author: jjw
 * @Date: 2019-04-17 09:09:13
 * @Description: 员工管理-员工信息导入
 * @Last Modified by: jjw
 * @Last Modified time: 2019-06-18 18:27:57
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
