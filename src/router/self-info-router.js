import Main from '@/components/main'

export default [
  {
    path: '/self_info',
    name: 'self_info',
    meta: {
      icon: 'md-contact',
      title: '个人填报与查询'
    },
    component: Main,
    children: [
      {
        path: 'manual_reported',
        name: 'bms_myinfo_personalfill',
        meta: {
          icon: 'logo-yen',
          title: '个人信息填报',
          hideInMenu: false
        },
        component: () => import('@/view/components/self-info/manual-reported/index.vue')
      },
      {
        path: 'self_search',
        name: 'bms_myinfo_personalquery',
        meta: {
          icon: 'ios-man',
          title: '个人其他查询',
          hideInMenu: false
        },
        component: () => import('@/view/components/self-info/info-search/index.vue')
      }
    ]
  }
]
