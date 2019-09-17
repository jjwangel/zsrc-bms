export const col_credit = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '征信报告日期',
    key: 'credDate'
  },
  {
    title: '总负债(元)',
    slot: 'debtBal',
    key: 'debtBal'
  },
  {
    title: '逾期是否超90天',
    key: 'overdue'
  },
  {
    title: '总担保余额(元)',
    slot: 'assuBal',
    key: 'assuBal'
  },
  {
    title: '被强制执行状态',
    key: 'forceStatus'
  },
  {
    title: '记录状态',
    key: 'credStatuText'
  },
  {
    title: '操作',
    slot: 'action',
    width: 150,
    align: 'center'
  }
]
