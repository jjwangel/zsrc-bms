import axios from 'axios'
import router from '@/router'
import { setToken } from '@/libs/util'
import { Message } from 'view-design'

const noMsgCode = [
  '003304',
  '003903',
  '003901',
  '003904',
  '003910'
]
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    // this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  interceptors (instance) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 前端接口请求设置一下ajax的withCrendetails属性试试，跨域默认不让操作cookie的，补充上这个属性应该就好了
      config.withCredentials = true
      // config.headers['Sso-Token'] = getSysToken()
      // if (config.method === 'post') { // 增加时间戳，解决IE 默认从缓存中获取了数据，而没有重新发请求
      //   config.data = {
      //     ...config.data,
      //     t: Date.parse(new Date()) / 1000
      //   }
      // } else if (config.method === 'get') {
      //   config.params = {
      //     t: Date.parse(new Date()) / 1000,
      //     ...config.params
      //   }
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      let { data, status } = res

      if (data.code !== '000000') {
        if (data.code === '003101') {
          Message.warning({
            content: '登录超时，请重新登录',
            duration: 5
          })
          setToken('')
          router.push({
            name: 'login'
          })
        } else {
          if (data.code === '003905') {
            Message.warning({
              content: `${data.message}(${data.code})`,
              duration: 5
            })
          } else {
            if (!noMsgCode.includes(data.code)) {
              Message.error({
                content: `有错误产生：${data.message}(${data.code})`,
                duration: 5
              })
            }
          }
        }
      }
      data.data = data.data || {}
      return { data, status }
    }, error => {
      Message.error({
        content: '有异常产生！',
        duration: 5
      })
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
