export const col_liab = [
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
    title: '负债金额合计(元)',
    key: 'overDeptBal',
    slot: 'overDeptBal',
    tooltip: true
  },
  {
    title: '操作',
    slot: 'action',
    width: 150,
    align: 'center'
  }
]
