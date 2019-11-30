/*
 * @Author: jjw
 * @Date: 2019-11-28 16:00:49
 * @Description: 员工行为排查
 * @Last Modified by: jjw
 * @Last Modified time: 2019-11-29 18:49:53
 */

import baseAPI from '../../base'

/**
 * @description 获取排查项目列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCheckProjectList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckprojects/page', params)
}

/**
 * @description 新增排查项目
 * @param {*} formData
 * @returns
 */
export const addEmpCheckProject = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcheckproject', data)
  return res
}

/**
 * @description 更新排查项目
 * @param {*} formData
 * @returns
 */
export const modifyEmpCheckProject = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empcheckproject', data)
  return res
}

/**
 * @description 删除删除排查项目
 * @param {*} formData
 * @returns
 */
export const deleteEmpCheckProject = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/empcheckproject/${formData.id}`)
  return res
}

/**
 * @description 获取排查项目公共参数列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCheckPublicParamsList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckpublicparams/page', params)
}

/**
 * @description 排查项目公共参数列表查询（不带id查）
 * @param {*} formData
 * @returns
 */
export const getEmpCheckPublicParamsNoId = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckpublicparams', params)
}

/**
 * @description 排查项目类型列表查询（带id查）
 * @param {*} formData
 * @returns
 */
export const getEmpCheckProjectTypesById = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckprojecttypes', params)
}

/**
 * @description 新增排查项目公共参数
 * @param {*} formData
 * @returns
 */
export const addEmpCheckPublicParam = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcheckpublicparam', data)
  return res
}

/**
 * @description 删除排查项目公共参数
 * @param {*} formData
 * @returns
 */
export const deleteEmpCheckPublicParam = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/empcheckpublicparam/${formData.id}`)
  return res
}

/**
 * @description 更新排查项目公共参数
 * @param {*} formData
 * @returns
 */
export const modifyEmpCheckPublicParam = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empcheckpublicparam', data)
  return res
}
