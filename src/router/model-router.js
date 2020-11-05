import Main from '@/components/main'

export default [
  {
    path: '/model_manage',
    name: 'model_manage',
    meta: {
      icon: 'logo-buffer',
      title: '模型管理'
    },
    component: Main,
    children: [
      {
        path: 'model_search',
        name: 'bms_modelmng_dataquery',
        meta: {
          icon: 'md-cube',
          title: '模型查询',
          hideInMenu: false
        },
        component: () => import('@/view/components/model-manage/model-search/index.vue')
      },
      {
        path: 'model_para_mng',
        name: 'bms_modelmng_infomng',
        meta: {
          icon: 'md-cube',
          title: '模型信息管理',
          hideInMenu: false
        },
        component: () => import('@/view/components/model-manage/model-para-mng/index.vue')
      },
      {
        path: 'model2',
        name: 'model2',
        meta: {
          icon: 'md-analytics',
          title: '模型2',
          hideInMenu: false
        },
        component: () => import('@/view/components/model-manage/model2/index.vue')
      },
      {
        path: 'model3',
        name: 'model3',
        meta: {
          icon: 'md-analytics',
          title: '模型3',
          hideInMenu: false
        },
        component: () => import('@/view/components/model-manage/model3/index.vue')
      }
    ]
  }
]
