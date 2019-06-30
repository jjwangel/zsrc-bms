import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    token: getToken(),
    employeeNo: '',
    userName: '',
    gender: '男',
    rolesCode: [],
    rolesCodeShort: [],
    rolesName: [],
    menuAccess: [],
    avatarImgPath: '',
    hasGetInfo: false // 判断当页面刷新后，要重新获取用户信息
  },
  mutations: {
    setEmployeeNo (state, employeeNo) {
      state.employeeNo = employeeNo
    },
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserName (state, userName) {
      state.userName = userName
    },
    setGender (state, gender) {
      state.gender = gender
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setRolesName (state, rolesName) {
      state.rolesName = rolesName
    },
    setRolesCode (state, rolesCode) {
      state.rolesCode = rolesCode
    },
    setRolesCodeShort (state, rolesCodeShort) {
      state.rolesCodeShort = rolesCodeShort
    },
    setMenuAccess (state, menuAccess) {
      state.menuAccess = menuAccess
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  getters: {
    employeeNo: state => state.employeeNo,
    userName: state => state.userName,
    gender: state => state.gender,
    token: state => state.token,
    rolesCode: state => state.rolesCode,
    rolesCodeShort: state => state.rolesCodeShort,
    rolesName: state => state.rolesName,
    menuAccess: state => state.menuAccess,
    userInfo: state => `${state.userName}（${state.employeeNo}）`
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      commit('setHasGetInfo', false)
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      commit('setToken', '')
      return new Promise((resolve, reject) => {
        logout().then(() => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            const data = res.data
            commit('setMenuAccess', data.data.purview.map((val) => { return val.code }))
            commit('setHideMenu', state.menuAccess)
            commit('setEmployeeNo', data.data.staff.staffNumber)
            commit('setAvatar', '')
            commit('setUserName', data.data.staff.name)
            commit('setGender', data.data.staff.gender)
            commit('setRolesName', data.data.roles.map((val) => { return val.name }))
            commit('setRolesCode', data.data.roles.map((val) => { return val.code }))
            commit('setRolesCodeShort', data.data.roles.map((val) => { return (val.code === 'bms_admin' ? val.code : val.code.substring(0, 6)) }))
            commit('setHasGetInfo', true)
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
