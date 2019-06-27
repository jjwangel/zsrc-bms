export const col_debt = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '负债种类',
    key: 'debtTypeText',
    tooltip: true
  },
  {
    title: '贷款机构全称',
    key: 'overOrgName',
    tooltip: true
  },
  {
    title: '负债笔数/张数',
    key: 'overDeptNum',
    tooltip: true
  },
  {
    title: '负债金额(元)',
    key: 'overDeptBal',
    slot: 'overDeptBal',
    tooltip: true
  }
]

export const col_badrec = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '信用卡逾期账户数',
    key: 'credCardOverdueNum',
    tooltip: true
  },
  {
    title: '是否超过90天逾期(信用卡)',
    key: 'dyaOverdue1Text',
    tooltip: true
  },
  {
    title: '贷款逾期账户数',
    key: 'loanOverdueNum',
    tooltip: true
  },
  {
    title: '是否超90天以上逾期(贷款)',
    key: 'dyaOverdue2Text',
    tooltip: true
  }
]

export const col_assu = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '贷款发放机构',
    key: 'loanOrgName',
    tooltip: true
  },
  {
    title: '担保金额(元)',
    key: 'assuBal',
    slot: 'assuBal',
    tooltip: true
  },
  // {
  //   title: '担保方式',
  //   key: 'assuModeText',
  //   tooltip: true
  // },
  {
    title: '被担保人姓名',
    key: 'assuName',
    tooltip: true
  },
  {
    title: '与本人关系',
    key: 'assuRale',
    tooltip: true
  },
  // {
  //   title: '担保贷款五级分类',
  //   key: 'loan5staText',
  //   tooltip: true
  // },
  {
    title: '担保贷款发放日期',
    key: 'loanOpenDate',
    tooltip: true
  },
  // {
  //   title: '担保贷款到期日期',
  //   key: 'loanEndDate',
  //   tooltip: true
  // },
  {
    title: '担保状态',
    key: 'assuStauText',
    tooltip: true
  }
]

export const col_force = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '执行机构名称',
    key: 'forceOrgName',
    tooltip: true
  },
  {
    title: '执行标的',
    key: 'forceDesc',
    tooltip: true
  },
  {
    title: '执行状态',
    key: 'forceStatuText'
  }
]

export const col_file = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '附件名称',
    key: 'fileName',
    tooltip: true
  },
  {
    title: '上传员工',
    key: 'impName',
    tooltip: true
  },
  {
    title: '上传日期',
    key: 'loadDatetime',
    tooltip: true
  },
  {
    title: '操作',
    slot: 'action',
    width: 100,
    align: 'center'
  }
]
