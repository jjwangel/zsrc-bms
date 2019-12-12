/*
 * @Author: jjw
 * @Date: 2019-11-28 16:00:49
 * @Description: 员工行为排查
 * @Last Modified by: jjw
 * @Last Modified time: 2019-12-11 20:08:28
 */

import baseAPI from '../../base'

/**
 * @description 获取排查项目列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCheckProjectList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckprojects', params)
}

/**
 * @description 获取排查项目列表数据(分页)
 * @param {*} formData
 * @returns
 */
export const getEmpCheckProjectListByPage = (formData) => {
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

/**
 * @description 获取员工排查记录列表(发起排查)列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCheckRecordList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckrecords/tocheck/page', params)
}

/**
 * @description 新增员工排查记录
 * @param {*} formData
 * @returns
 */
export const addEmpCheckRecordByBatch = async (formData) => {
  const params = [ ...formData ]
  const res = await baseAPI.insertData('empcheckrecord/batch', params)
  return res
}

/**
 * @description 新增编外员工信息
 * @param {*} formData
 * @returns
 */
export const addOffstaffEmployee = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('offstaffemployee', data)
  return res
}

/**
 * @description 更新编外员工信息
 * @param {*} formData
 * @returns
 */
export const modifyOffstaffEmployee = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('offstaffemployee', data)
  return res
}

/**
 * @description 删除排查项目公共参数
 * @param {*} formData
 * @returns
 */
export const deleteOffStaffEmployee = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/offstaffemployee?idcardNo=${formData.idcardNo}&deptCode=${formData.deptCode}`)
  return res
}

/**
 * @description 获取员工发起调整时详细功能的数据
 * @param {*} formData
 * @returns
 */
export const getOffStaffEmployeeInfo = (formData) => {
  const params = { ...formData }

  return baseAPI.getOneRowData('/offstaffemployee', params)
}

/**
 * @description 获取员工已排查记录列表分页查询列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCheckedRecordList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcheckrecords/page', params)
}

/**
 * @description 删除员工排查记录
 * @param {*} formData
 * @returns
 */
export const deleteEmpCheckRecord = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/empcheckrecord/${formData.id}`)
  return res
}

/**
 * @description 获取员工排查记录明细列表查询的数据
 * @param {*} formData
 * @returns
 */
export const getEmpCheckDetails = (formData) => {
  const params = { ...formData }

  return baseAPI.getOneRowData('/empcheckdetails', params)
}
