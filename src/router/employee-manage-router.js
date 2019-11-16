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
        path: 'chg_att_type',
        name: 'chg_att_type',
        meta: {
          icon: 'md-cloud-download',
          title: '调整关注类别'
        },
        component: parentView,
        children: [
          {
            path: 'launch_chg_att',
            name: 'bms_employeemng_lanuch_change_attention',
            meta: {
              icon: 'ios-copy-outline',
              title: '发起调整',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/chg-attention/sponsor-attention/index.vue')
          },
          {
            path: 'chg_att_sch_search',
            name: 'bms_employeemng_change_attention_schedule_search',
            meta: {
              icon: 'ios-copy-outline',
              title: '调整进度查询',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/chg-attention/schedule-search/index.vue')
          }
        ]
      },
      {
        path: 'att_follow',
        name: 'att_follow',
        meta: {
          icon: 'md-cloud-download',
          title: '关注人员跟进'
        },
        component: parentView,
        children: [
          {
            path: 'launch_follow',
            name: 'bms_employeemng_lanuch_follow',
            meta: {
              icon: 'ios-copy-outline',
              title: '发起跟进',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/att-follow/sponsor-follow/index.vue')
          },
          {
            path: 'follow_sch_search',
            name: 'bms_employeemng_follow_schedule_search',
            meta: {
              icon: 'ios-copy-outline',
              title: '跟进进度查询',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/att-follow/schedule-search/index.vue')
          }
        ]
      },
      {
        path: 'process_manage',
        name: 'process_manage',
        meta: {
          icon: 'md-cloud-download',
          title: '流程管理'
        },
        component: parentView,
        children: [
          {
            path: 'process_pending',
            name: 'bms_employeemng_process_pending',
            meta: {
              icon: 'ios-copy-outline',
              title: '待办流程',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/process-manage/process-pending/index.vue')
          },
          {
            path: 'process_submitted',
            name: 'bms_employeemng_process_submitted',
            meta: {
              icon: 'ios-copy-outline',
              title: '已办流程',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/process-manage/process-submitted/index.vue')
          }
        ]
      },
      {
        path: 'special_archives_manage',
        name: 'special_archives_manage',
        meta: {
          icon: 'ios-people',
          title: '专项排查档案管理',
          hideInMenu: false
        },
        component: () => import('@/view/components/employee-manage/emp-behavior-inspection/inspection-project-manage/index.vue')
      },
      {
        path: 'att_standing_book_search',
        name: 'att_standing_book_search',
        meta: {
          icon: 'ios-people',
          title: '关注台账查询',
          hideInMenu: false
        },
        component: () => import('@/view/components/employee-manage/att-std-book-search/index.vue')
      },
      {
        path: 'emp_behavior_inspection',
        name: 'emp_behavior_inspection',
        meta: {
          icon: 'md-cloud-download',
          title: '员工行为排查'
        },
        component: parentView,
        children: [
          {
            path: 'inspection_project_manage',
            name: 'bms_employeemng_inspection_project_manage',
            meta: {
              icon: 'ios-copy-outline',
              title: '排查项目管理',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/emp-behavior-inspection/inspection-project-manage/index.vue')
          },
          {
            path: 'inspection_input',
            name: 'bms_employeemng_inspection_checkin',
            meta: {
              icon: 'ios-copy-outline',
              title: '排查登记',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/emp-behavior-inspection/inspection-checkin/index.vue')
          },
          {
            path: 'inspection_search',
            name: 'bms_employeemng_inspection_search',
            meta: {
              icon: 'ios-copy-outline',
              title: '排查情况查询',
              hideInMenu: false
            },
            component: () => import('@/view/components/employee-manage/emp-behavior-inspection/inspection-search/index.vue')
          }
        ]
      }
    ]
  }
]
