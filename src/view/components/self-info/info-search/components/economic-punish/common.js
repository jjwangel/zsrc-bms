/*
 * @Author: jjw
 * @Date: 2019-04-11 19:58:04
 * @Description: 个人查询-经济处罚查询
 * @Last Modified by: jjw
 * @Last Modified time: 2019-06-17 19:07:07
 */

export const col_ep = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '所在单位',
    key: 'deptType',
    width: 200,
    tooltip: true
  },
  {
    title: '部室/网点',
    key: 'deptName',
    width: 200,
    tooltip: true
  },
  {
    title: '处罚日期',
    key: 'pushDate',
    width: 120,
    tooltip: true
  },
  {
    title: '处罚金额(元)',
    key: 'pushBal',
    slot: 'pushBal',
    width: 150,
    tooltip: true
  },
  {
    title: '具体事项',
    key: 'pushDesc',
    tooltip: true
  },
  {
    title: '处罚依据',
    key: 'pushAcc',
    tooltip: true
  },
  {
    title: '实施处罚机构',
    key: 'pushOrg',
    width: 200,
    tooltip: true
  },
  {
    title: '备注',
    key: 'bz',
    tooltip: true
  }
]
