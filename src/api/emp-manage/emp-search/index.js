/*
 * @Author: jjw
 * @Date: 2019-04-12 16:24:19
 * @Description: 员工管理-员工信息查询
 * @Last Modified by: jjw
 * @Last Modified time: 2019-07-18 17:29:03
 */

import baseAPI from '../../base'

/**
 * @description 获取员工综合信息列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpIntegratedList = (formData) => {
  const params = { ...formData }
  if (formData.employeeNo === '') {
    delete params.employeeNo
  }
  if (formData.name === '') {
    delete params.name
  }
  if (formData.focusType === '-1') {
    delete params.focusType
  }
  if (formData.deptCode.length > 0) {
    params.deptCode = formData.deptCode[formData.deptCode.length - 1]
  } else {
    delete params.deptCode
  }

  return baseAPI.getListData('employees/complex/page', params)
}

/**
 * @description 获取员工在本信息数据
 * @param {*} formData
 * @returns
 */
export const getEmpBaseInfo = (formData) => {
  const url = `/employee/${formData.id}`

  return baseAPI.getOneRowData(url)
}

/**
 * @description 获取员工亲属关系列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpKinsfolkList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empconinfos', params)
}

/**
 * @description 获取员工出入境列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpEEList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empinoucoms', params)
}

/**
 * @description 获取员工亲属关系列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpYearIncomeStat = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/stat/yearincomestat', params)
}

/**
 * @description 获取员工银行账号列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpBankAcctList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empacctinfos', params)
}

/**
 * @description 获取员工经商列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpBusinessList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empbussinfos', params)
}

/**
 * @description 获取员工涉诉列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpLitigationList = (formData) => {
  const params = { ...formData }

  return baseAPI.getListData('/empwadeinfos', params)
}

/**
 * @description 获取员工财产数据
 * @param {*} formData
 * @returns
 */
export const getEmpPropertyInfo = async (formData) => {
  const params = { ...formData }

  const carData = await baseAPI.getListData('/empcarinfos', params)
  const houseData = await baseAPI.getListData('/emphdinfos', Object.assign({}, params,
    { hdAssType: 1
    }))
  const landData = await baseAPI.getListData('/emphdinfos', Object.assign({}, params,
    { hdAssType: 2
    }))

  return {
    houseData,
    landData,
    carData
  }
}

/**
 * @description 获取员工投资数据
 * @param {*} formData
 * @returns
 */
export const getEmpInvestInfo = async (formData) => {
  const params = { ...formData }

  const capData = await baseAPI.getListData('/empcapinfos', Object.assign({}, params,
    { capType: 1
    }))

  const invData = await baseAPI.getListData('/empcapinfos', Object.assign({}, params,
    { capType: 2
    }))

  return {
    capData,
    invData
  }
}

/**
 * @description 获取员工违规数据
 * @param {*} formData
 * @returns
 */
export const getEmpIllegalInfo = async (formData) => {
  const params1 = {
    employeeNo: formData.employeeNo,
    orderBy: 'inte_date',
    orderType: 'desc'
  }

  const params2 = {
    employeeNo: formData.employeeNo,
    orderBy: 'push_date',
    orderType: 'desc'
  }

  const params3 = {
    employeeNo: formData.employeeNo,
    orderBy: 'push_date',
    orderType: 'desc'
  }

  if (formData.date_value) {

  }
  const inteData = await baseAPI.getListData('/empoutlinegeninfos', formData.date_value ? Object.assign({}, params1,
    { inteDateStart: formData.date_value[0],
      inteDateEnd: formData.date_value[1]
    }) : params1) // 积分

  const illeData = await baseAPI.getListData('/empoutlinelayinfos', formData.date_value ? Object.assign({}, params2,
    { pushDateStart: formData.date_value[0],
      pushDateEnd: formData.date_value[1]
    }) : params2) // 严重违规

  const punishData = await baseAPI.getListData('/emppushinfos', formData.date_value ? Object.assign({}, params3,
    { pushDateStart: formData.date_value[0],
      pushDateEnd: formData.date_value[1]
    }) : params3) // 处罚

  return {
    inteData,
    illeData,
    punishData
  }
}

/**
 * @description 获取员工征信数据
 * @param {*} formData
 * @returns
 */
export const getEmpCreditInfo = async (formData) => {
  const params = {
    employeeNo: formData.employeeNo
  }

  // 获取所选年度中最新已审核的征信主表数据
  try {
    const creditData = await baseAPI.getListData('/empcredstaus/page', Object.assign({}, params,
      { credDateStart: formData.date_value[0],
        credDateEnd: formData.date_value[1],
        credStatu: 2,
        orderBy: 'load_datetime',
        orderType: 'desc',
        page: 1,
        pageSize: 1
      }))
    const credit = creditData.data
    if (credit.code === '000000') {
      if (credit.data.rows.length > 0) {
        params.credDate = credit.data.rows[0].credDate
        const debtData = await baseAPI.getListData('/empdebtinfos', Object.assign({}, params, { orderBy: 'debt_type,over_org_name' }))
        const badrecData = await baseAPI.getListData('/empbadrecinfos', params)
        const assuData = await baseAPI.getListData('/empassuinfos', Object.assign({}, params, { orderBy: 'loan_org_name' }))
        const forceData = await baseAPI.getListData('/empforceinfos', Object.assign({}, params, { orderBy: 'force_org_name' }))

        return {
          credit,
          debtData,
          badrecData,
          assuData,
          forceData
        }
      } else {
        return { credit }
      }
    } else {
      throw new Error('获取征信报告主表数据时产生错误！')
    }
  } catch (err) {
    throw err
  }
}

/**
 * @description 获取员工家访列表数据
 * @param {*} formData
 * @returns
 */
export const getEmpFamilyVisitList = async (formData) => {
  const params = { ...formData }

  const fvData = await baseAPI.getListData('/emphocainfos', params)

  return {
    fvData
  }
}
