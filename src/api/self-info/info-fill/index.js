/*
 * @Author: jjw
 * @Date: 2019-04-20 18:37:14
 * @Description: 我的信息-个人信息填报
 * @Last Modified by: jjw
 * @Last Modified time: 2019-05-28 19:54:56
 */

import baseAPI from '@/api/base'

/**
 * @description 获取员工其他收入列表数据
 * @param {*} formData
 * @returns
 */
export const getOtherIncomeList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empothinco', params)
}

/**
 * @description 修改员工其他收入数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpOtherIncome = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empothinco', data)
  return res
}

/**
 * @description 新增员工其他收入数据
 * @param {*} formData
 * @returns
 */
export const addEmpOtherIncome = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empothinco', data)
  return res
}

/**
 * @description 获取员工房产列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpHouseList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/emphdinfos', params)
}

/**
 * @description 批量删除员工房产数据
 * @param {*} formData
 * @returns
 */
export const delEmpHouseByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/emphdinfo/batch', formData)
  return res
}

/**
 * @description 修改员工房产数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpHouseInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('emphdinfo', data)
  return res
}

/**
 * @description 新增员工房产数据
 * @param {*} formData
 * @returns
 */
export const addEmpHouseInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('emphdinfo', data)
  return res
}

/**
 * @description 获取员工地产列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpLandList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/emphdinfos', params)
}
/**
 * @description 批量删除员工地产数据
 * @param {*} formData
 * @returns
 */
export const delEmpLandByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/emphdinfo/batch', formData)
  return res
}
/**
 * @description 修改员工地产数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpLandInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('emphdinfo', data)
  return res
}
/**
 * @description 新增员工地产数据
 * @param {*} formData
 * @returns
 */
export const addEmpLandInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('emphdinfo', data)
  return res
}

/**
 * @description 获取员工汽车列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCarList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcarinfos', params)
}
/**
 * @description 批量删除员工汽车数据
 * @param {*} formData
 * @returns
 */
export const delEmpCarByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empcarinfo/batch', formData)
  return res
}
/**
 * @description 修改员工汽车数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpCarInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empcarinfo', data)
  return res
}
/**
 * @description 新增员工汽车数据
 * @param {*} formData
 * @returns
 */
export const addEmpCarInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcarinfo', data)
  return res
}

/**
 * @description 获取员工股金列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpSharesList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcapinfos', params)
}
/**
 * @description 批量删除员工股金数据
 * @param {*} formData
 * @returns
 */
export const delEmpSharesByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empcapinfo/batch', formData)
  return res
}
/**
 * @description 修改员工股金数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpSharesInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empcapinfo', data)
  return res
}
/**
 * @description 新增员工股金数据
 * @param {*} formData
 * @returns
 */
export const addEmpSharesInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcapinfo', data)
  return res
}

/**
 * @description 获取员工投资列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpInveList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcapinfos', params)
}
/**
 * @description 批量删除员工投资数据
 * @param {*} formData
 * @returns
 */
export const delEmpInveByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empcapinfo/batch', formData)
  return res
}
/**
 * @description 修改员工投资数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpInveInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empcapinfo', data)
  return res
}
/**
 * @description 新增员工投资数据
 * @param {*} formData
 * @returns
 */
export const addEmpInveInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcapinfo', data)
  return res
}

/**
 * @description 获取员工银行账号列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpBankList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empacctinfos', params)
}
/**
 * @description 批量删除员工银行账号数据
 * @param {*} formData
 * @returns
 */
export const delEmpBankByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empacctinfo/batch', formData)
  return res
}
/**
 * @description 修改员工银行账号数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpBankInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empacctinfo', data)
  return res
}
/**
 * @description 新增员工银行账号数据
 * @param {*} formData
 * @returns
 */
export const addEmpBankInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empacctinfo', data)
  return res
}

/**
 * @description 获取员工征信报告主表列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpCreditByManualList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empcredstau/summary', params)
}
/**
 * @description 删除员工手工填报征信数据
 * @param {*} formData
 * @returns
 */
export const delCreditByManual = async (formData) => {
  const res = await baseAPI.deleteDataByOne(`/empcredstau/${formData.id}`)
  return res
}
/**
 * @description 新增员工手工填报征信数据
 * @param {*} formData
 * @returns
 */
export const addCreditByManual = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcredstau', data)
  return res
}
/**
 * @description 复制员工手工填报征信数据
 * @param {*} formData
 * @returns
 */
export const copyCreditByManual = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empcredstau/copy', data)
  return res
}

/**
 * @description 获取员工负债信息列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpDebtList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empdebtinfos', params)
}
/**
 * @description 批量删除员工负债信息数据
 * @param {*} formData
 * @returns
 */
export const delEmpDebtByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empdebtinfo/batch', formData)
  return res
}
/**
 * @description 修改员工负债数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpDebtInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empdebtinfo', data)
  return res
}
/**
 * @description 新增员工负债数据
 * @param {*} formData
 * @returns
 */
export const addEmpDebtInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empdebtinfo', data)
  return res
}

/**
 * @description 获取员工不良记录信息列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpBadRecList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empbadrecinfos', params)
}
/**
 * @description 修改员工不良记录数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpBadRecInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empbadrecinfo', data)
  return res
}

/**
 * @description 获取员工对外担保信息列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpAssuList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empassuinfos', params)
}
/**
 * @description 批量删除员工对外担保信息数据
 * @param {*} formData
 * @returns
 */
export const delEmpAssuByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empassuinfo/batch', formData)
  return res
}
/**
 * @description 修改员工对外担保数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpAssuInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empassuinfo', data)
  return res
}
/**
 * @description 新增员工对外担保数据
 * @param {*} formData
 * @returns
 */
export const addEmpAssuInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empassuinfo', data)
  return res
}

/**
 * @description 获取员工被强制执行信息列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpForceList = async (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empforceinfos', params)
}
/**
 * @description 批量删除员工被强制执行信息数据
 * @param {*} formData
 * @returns
 */
export const delEmpForceByBatch = async (formData) => {
  const res = baseAPI.deleteDataByBatch('/empforceinfo/batch', formData)
  return res
}
/**
 * @description 修改员工被强制执行数据
 * @param {*} formData
 * @returns
 */
export const modifyEmpForceInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.modifyData('empforceinfo', data)
  return res
}
/**
 * @description 新增员工被强制执行数据
 * @param {*} formData
 * @returns
 */
export const addEmpForceInfo = async (formData) => {
  let data = { ...formData }

  const res = await baseAPI.insertData('empforceinfo', data)
  return res
}
