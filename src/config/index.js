export default {
  /**
   * @description 生产版本号
   */
  bmsVersion: '1.1.7',
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '员工行为管理系统',
  /**
   * @description token在Cookie中存储的天数，默认1天，30分钟这样写：new Date(new Date().getTime() + 30 * 60 * 1000)
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description 3DES加密参数
   */
  TripleDesOption: {
    key: '7a7372632d626d733230313921',
    iv: '12345678'
  },
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://125.0.160.171:9090/', // http://127.0.0.1:3000/test/         或     http://125.0.189.11:9090/   或   http://125.0.160.171:9090/
    // pro: 'http://125.0.160.171:9090/', // http://125.0.168.55:8080/      或     http://125.0.160.171:9090/
    pro: 'http://125.0.168.55:8080/', // http://125.0.168.55:8080/      或     http://125.0.160.171:9090/
    dev_static: 'http://125.0.160.171:9090/', // http://127.0.0.1:3000/    http://125.0.160.172:3000/   http://125.0.160.171:9090/
    // pro_static: 'http://125.0.160.172/' // http://125.0.160.172/    或   http://125.0.168.55/
    pro_static: 'http://125.0.168.55/' // http://125.0.160.172/    或   http://125.0.168.55/
  },

  /**
   * @description
   */
  fileUploadUrl: {
    infoImport: 'file/import', // test/file/import   或   file/import
    creditImport: 'empcredstau/upload'
  },

  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
