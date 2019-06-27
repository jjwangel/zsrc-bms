import Main from '@/components/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/system_manage',
    name: 'system_manage',
    meta: {
      icon: 'logo-buffer',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'user_manage',
        name: 'user_manage',
        meta: {
          icon: 'logo-buffer',
          title: '用户管理'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '用户查询',
              hideInMenu: false
            },
            component: () => import('@/view/components/system-manage/user-manage/index.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '用户新增',
              hideInMenu: false
            },
            component: () => import('@/view/components/system-manage/user-manage/index.vue')
          }
        ]
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
