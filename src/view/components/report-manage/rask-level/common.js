export const col_rl = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '管理机构',
    key: 'name',
    align: 'center',
    width: 200,
    tooltip: true
  },
  {
    title: '风险级别',
    align: 'center',
    children: [
      {
        title: '高级',
        key: 'highCnt',
        align: 'center',
        tooltip: true
      },
      {
        title: '中级',
        key: 'middleCnt',
        align: 'center',
        tooltip: true
      },
      {
        title: '低级',
        key: 'lowCnt',
        align: 'center',
        tooltip: true
      },
      {
        title: '汇总',
        key: 'totalCnt',
        align: 'center',
        tooltip: true
      }
    ]
  }
]
