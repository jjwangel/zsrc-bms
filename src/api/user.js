import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: 'loginuser',
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: 'logout',
    method: 'get'
  })
}

export const getUserHeadImage = (params) => {
  return axios.request({
    url: 'employee/headimage',
    params,
    method: 'get'
  })
}
