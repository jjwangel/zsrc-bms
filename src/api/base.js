import axios from '@/libs/api.request'

export const getListData = (url, params) => {
  return axios.request({
    url,
    params,
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

export const getPurviewCtrlList = (menuCode) => {
  let url = '/purview/controls'
  const params = { menuCode }
  return axios.request({
    url,
    params,
    method: 'get'
  })
}

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
  changeLoginPwd
}
