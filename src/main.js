// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 最终去掉 i18n,v-org-tree,tree-table-vue
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
// import installPlugin from '@/plugin'
import './index.less'
// import '@/assets/icons/iconfont.css'

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

// 全局设置
Vue.use(iView, {
  transfer: true,
  size: 'default'
})

/**
 * @description 注册admin内置插件
 */
// installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

// /**
//  * 全局定义过滤器
// */
// Vue.filter('TrimForText', function (value) {
//
// })

// /**
//  * 全局定义方法
// */
/* eslint-disable no-new */
Vue.prototype.trimForText = function (value) {
  return (!value ? '' : value.replace(/(^\s*)|(\s*$)/g, ""))
};

Vue.prototype.formatMoney = function (val) {
  if (typeof (val) !== 'number' || val === 0) return val

  let newVal = ''
  const xsd = val.toString().split('.')
  switch (xsd.length) {
    case 1: {
      newVal = val.toString() + '.00'
      return newVal
    }
    case 2: {
      if (xsd[1].length < 2) {
        newVal = val.toString() + '0'
        return newVal
      } else {
        return val
      }
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
