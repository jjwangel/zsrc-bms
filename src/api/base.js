import axios from '@/libs/api.request'
import qs from 'qs'

export const getListData = (url, params) => {
  return axios.request({
    url,
    params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    method: 'get'
  })
}

export const getOneRowData = (url, params) => {
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

export const insertData = (url, data) => {
  return axios.request({
    url,
    data,
    method: 'post'
  })
}

export const modifyData = (url, data) => {
  return axios.request({
    url,
    data,
    method: 'put'
  })
}

export const deleteDataByOne = (url) => {
  let data = {}
  return axios.request({
    url,
    data,
    method: 'delete'
  })
}

export const deleteDataByBatch = (url, data) => {
  return axios.request({
    url,
    data,
    method: 'delete'
  })
}

export const getSelectOptionData = (params) => {
  let url = '/menum/multi'
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

export const getSingleSelectOptionData = (params) => {
  let url = '/menums'
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

export const getInstEmpList = (data) => {
  let url = '/deptemployee/tree'
  const params = { employee: data.employee }
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

export const getInstList = (data) => {
  let url = '/dept/tree'
  return axios.request({
    url,
    method: 'get'
  })
}

export const changeLoginPwd = (data) => {
  let url = '/account/password'
  return axios.request({
    url,
    data,
    method: 'put'
  })
}

export const resetLoginPwd = (data) => {
  let url = '/account/password/reset'
  return axios.request({
    url,
    data,
    method: 'put'
  })
}

export const getPurviewCtrlList = (menuCode) => {
  let url = '/purview/controls'
  const params = { menuCode }
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

/**
 * @description 获取人员详细数据
 * @param {*} formData
 * @returns
 */
export const getEmployeesDetail = (formData) => {
  let url = '/employees/page'
  const params = { ...formData }
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

/**
 * @description 获取用户操作权限
 * @param {*} formData
 * @returns
 */
export const getUserOperationAuth = (formData) => {
  let url = '/purview/controls'
  const params = { ...formData }
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

export const verifyToken = (data) => {
  let url = '/verify'
  return axios.request({
    url,
    data,
    method: 'post'
  })
}

export const finishFlow = (data) => {
  return axios.request({
    url: '/flow/finish',
    data,
    method: 'put'
  })
}

// /**
//  * @description 下载上传文件
//  * @param {*} formData
//  * @returns
//  */
// export const getDownloadFile = (formData) => {
//   let url = `/uploadfile/download/${formData.id}`
//   const params = {}
//   return axios.request({
//     url,
//     params,
//     method: 'get'
//   })
// }

export default {
  getListData,
  getOneRowData,
  insertData,
  modifyData,
  deleteDataByOne,
  deleteDataByBatch,
  getSelectOptionData,
  getInstEmpList,
  getInstList,
  changeLoginPwd,
  resetLoginPwd,
  getEmployeesDetail,
  getUserOperationAuth,
  verifyToken,
  finishFlow
  // getDownloadFile
}
