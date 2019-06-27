export const col_discipline = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '批次号（员工严重违规信息）',
    key: 'batNum',
    tooltip: 'true'
  },
  {
    title: '导入日期',
    key: 'impDate',
    tooltip: 'true'
  },
  {
    title: '导入人员姓名',
    key: 'impName',
    tooltip: 'true'
  },
  {
    title: '导入总数',
    key: 'totalRecord',
    tooltip: 'true'
  },
  {
    title: '成功数',
    key: 'successRecord',
    tooltip: 'true'
  },
  {
    title: '失败数',
    key: 'errorRecord',
    tooltip: 'true'
  },
  // {
  //   title: '导入结果',
  //   key: 'impStatusText',
  //   tooltip: 'true'
  // },
  {
    title: '失败清单',
    slot: 'action',
    width: 100,
    align: 'center'
  }
]
