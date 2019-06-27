import Main from '@/components/main'

export default [
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      icon: 'ios-stats',
      title: '统计查询'
    },
    component: Main,
    children: [
      {
        path: 'rpt-rask-level',
        name: 'bms_statquery_risklevel',
        meta: {
          icon: 'md-code',
          title: '风险模型级别统计'
        },
        component: () => import('@/view/components/report-manage/rask-level/index.vue')
      },
      {
        path: 'rpt-await-credit',
        name: 'bms_statquery_toauditcred',
        meta: {
          icon: 'md-code',
          title: '待审核征信统计'
        },
        component: () => import('@/view/components/report-manage/await-credit/index.vue')
      },
      {
        path: 'rpt-attention-stat',
        name: 'bms_statquery_focusperson',
        meta: {
          icon: 'md-code',
          title: '关注人员情况统计'
        },
        component: () => import('@/view/components/report-manage/attention-stat/index.vue')
      }
    ]
  }
]
