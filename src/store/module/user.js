import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

// import routers from '@/router/routers'

// routers[3].children[1].meta.hideInMenu = true

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
    hasGetInfo: false, // 判断当页面刷新后，要重新获取用户信息
    access: '', // 没用
    userId: '', // 没用
    unreadCount: 0, // 没用
    messageUnreadList: [], // 没用
    messageReadedList: [], // 没用
    messageTrashList: [], // 没用
    messageContentStore: {} // 没用
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
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    setUserId (state, id) {
      state.userId = id
    },
    setAccess (state, access) {
      state.access = access
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
    userInfo: state => `${state.userName}（${state.employeeNo}）`,
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
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
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
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
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
