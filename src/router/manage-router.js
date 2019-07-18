import Main from '@/components/main'

export default [
  {
    path: '/system_manage',
    name: 'system_manage',
    meta: {
      icon: 'md-cog',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'user_manage',
        name: 'bms_systemmng_usermng',
        meta: {
          icon: 'md-people',
          title: '用户管理',
          hideInMenu: false
        },
        component: () => import('@/view/components/system-manage/user-manage/index.vue')
      },
      {
        path: 'para_manage',
        name: 'para_manage',
        meta: {
          icon: 'logo-buffer',
          title: '参数管理',
          hideInMenu: false
        },
        component: () => import('@/view/components/system-manage/para-manage/index.vue')
      }
    ]
  }
]
