import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import ViewUI from 'view-design'
import { setToken, getToken, setTitle } from '@/libs/util'
import config from '@/config'

const { homeName } = config
const LOGIN_PAGE_NAME = 'login'
const whiteRountName = [
  'login',
  'home',
  '_home',
  'error_401',
  'error_500',
  'error_404'
] // 路由白名单，不需要鉴权

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history' // history || hash
})

const turnTo = (to, access, next) => {
  if (whiteRountName.some((val) => {
    return val === to.name
  })) next() // 白名单，放行
  else if (access.some((val) => {
    return val === to.name
  })) next() // 有权限，放行
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.menuAccess, next)
    } else {
      // console.log(to.name)
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, store.state.user.menuAccess, next)
      }).catch(() => {
        setToken('')
        next({
          name: LOGIN_PAGE_NAME
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
