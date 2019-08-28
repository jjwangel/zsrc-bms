import Main from '@/components/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/emp_manage',
    name: 'emp_manage',
    meta: {
      icon: 'md-contacts',
      title: '员工管理'
    },
    component: Main,
    children: [
      {
        path: 'emp_info_sync',
        name: 'bms_employeemng_infoimport_empsync',
        meta: {
          icon: 'md-cloud-download',
          title: '员工信息同步',
          hideInMenu: true
        },
        component: () => import('@/view/components/employee-manage/info-sync/index.vue')
      },
      {
        path: 'emp_info_import',
        name: 'emp_info_import',
        meta: {
          icon: 'md-cloud-download',
          title: '员工信息导入'
        },
        component: parentView,
        children: [
          {
            path: 'bank_income',
            name: 'bms_employeemng_infoimport_annualincome',
            meta: {
              icon: 'ios-copy-outline',
              title: '本行的年收入',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/bank-income/index.vue')
          },
          {
            path: 'illegal_integral',
            name: 'bms_employeemng_infoimport_outlinepoint',
            meta: {
              icon: 'ios-copy-outline',
              title: '违规积分信息',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/illegal-integral/index.vue')
          },
          {
            path: 'discipline',
            name: 'bms_employeemng_infoimport_weightyoutline',
            meta: {
              icon: 'ios-copy-outline',
              title: '违规违纪信息',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/discipline/index.vue')
          },
          {
            path: 'business',
            name: 'bms_employeemng_infoimport_bussinfo',
            meta: {
              icon: 'ios-copy-outline',
              title: '经商信息',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/business/index.vue')
          },
          {
            path: 'lawsuit',
            name: 'bms_employeemng_infoimport_suspectlawsuit',
            meta: {
              icon: 'ios-copy-outline',
              title: '涉诉信息',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/lawsuit/index.vue')
          },
          {
            path: 'family_visit',
            name: 'bms_employeemng_infoimport_homevisit',
            meta: {
              icon: 'ios-copy-outline',
              title: '家访信息',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/family-visit/index.vue')
          },
          {
            path: 'economic_punish',
            name: 'bms_employeemng_infoimport_economicpunish',
            meta: {
              icon: 'ios-copy-outline',
              title: '经济处罚',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/info-import/economic-punish/index.vue')
          }
        ]
      },
      {
        path: 'credit_verify',
        name: 'bms_employeemng_credconfirm',
        meta: {
          icon: 'md-checkmark-circle-outline',
          title: '征信信息确认',
          hideInMenu: false
        },
        component: () => import('@/view/components/employee-manage/credit-verify/index.vue')
      },
      {
        path: 'integrated_search',
        name: 'bms_employeemng_infoquery',
        meta: {
          icon: 'ios-people',
          title: '员工信息查询',
          hideInMenu: false
        },
        component: () => import('@/view/components/employee-manage/integrated-search/index.vue')
      },
      {
        path: 'emp_chg_atte',
        name: 'bms_employeemng_focusadjust',
        meta: {
          icon: 'md-ribbon',
          title: '调整关注类别',
          hideInMenu: false
        },
        component: () => import('@/view/components/employee-manage/chg-attention/index.vue')
      }
    ]
  }
]
