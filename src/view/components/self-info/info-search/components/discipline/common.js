/*
 * @Author: jjw
 * @Date: 2019-04-11 09:50:34
 * @Description: 个人查询-违规违纪查询
 * @Last Modified by: jjw
 * @Last Modified time: 2019-05-14 19:31:29
 */

export const col_discipline = [
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
    title: '违规问题',
    key: 'ouquQues',
    tooltip: true
  },
  {
    title: '是否解除',
    key: 'isFreeText',
    width: 100,
    tooltip: true
  },
  {
    title: '解除日期',
    key: 'freeDate',
    width: 120,
    tooltip: true
  }
]
