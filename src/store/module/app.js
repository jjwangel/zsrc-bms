import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import { setHideMenuByRule } from '@/libs/j-tools'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    errorCount: state => state.errorList.length
  },
  mutations: {
    setHideMenu (state, menuAccess) {
      setHideMenuByRule(routers, menuAccess)

      // routers[2].children[0].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_empsync' }) === -1) // "员工信息同步"
      // routers[2].children[1].children[0].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_annualincome' }) === -1) // "本行的年收入"
      // routers[2].children[1].children[1].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_outlinepoint' }) === -1) // "违规积分信息"
      // routers[2].children[1].children[2].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_weightyoutline' }) === -1) // "严重违规信息"
      // routers[2].children[1].children[3].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_bussinfo' }) === -1) // "经商信息"
      // routers[2].children[1].children[4].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_suspectlawsuit' }) === -1) // "涉诉信息"
      // routers[2].children[1].children[5].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_homevisit' }) === -1) // "家访信息"
      // routers[2].children[1].children[6].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoimport_economicpunish' }) === -1) // "经济处罚"

      // routers[2].children[2].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_credconfirm' }) === -1) // "征信信息确认"
      // routers[2].children[3].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_infoquery' }) === -1) // "员工信息查询"
      // routers[2].children[4].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_employeemng_focusadjust' }) === -1) // "调整关注类别"

      // routers[3].children[0].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_myinfo_personalfill' }) === -1) // "个人信息填报"
      // routers[3].children[1].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_myinfo_personalquery' }) === -1) // "个人信息查询"

      // routers[4].children[0].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_statquery_risklevel' }) === -1) // "风险级别统计"
      // routers[4].children[1].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_statquery_toauditcred' }) === -1) // "待审核征信统计"
      // routers[4].children[2].meta.hideInMenu = (menuAccess.findIndex((val) => { return val === 'bms_statquery_focusperson' }) === -1) // "关注人员情况统计"

      // // 设置父级菜单是否隐藏
      // routers[2].children[1].meta.hideInMenu = (routers[2].children[1].children.findIndex((val) => { return val.meta.hideInMenu === false }) === -1)
      // routers[2].meta.hideInMenu = (routers[2].children.findIndex((val) => { return val.meta.hideInMenu === false }) === -1)

      // routers[3].meta.hideInMenu = (routers[3].children.findIndex((val) => { return val.meta.hideInMenu === false }) === -1)

      // routers[4].meta.hideInMenu = (routers[4].children.findIndex((val) => { return val.meta.hideInMenu === false }) === -1)
    },
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    }
  }
}
