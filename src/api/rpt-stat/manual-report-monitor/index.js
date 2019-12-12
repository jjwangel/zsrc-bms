/*
 * @Author: jjw
 * @Date: 2019-12-11 08:31:49
 * @Description: 员工信息填报监测报表
 * @Last Modified by: jjw
 * @Last Modified time: 2019-12-11 08:38:25
 */

import baseAPI from '../../base'

/**
 * @description 获取员工信息填报监测查询(分页)列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpInfoFillList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/infofills/page', params)
}
