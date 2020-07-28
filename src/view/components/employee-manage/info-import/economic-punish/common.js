export const mixinInfo = {
  data () {
    return {
      col_ep_rd: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '员工工号',
          key: 'employeeNo',
          tooltip: true
        },
        {
          title: '姓名',
          key: 'name',
          tooltip: true
        },
        {
          title: '所在单位',
          key: 'deptType',
          tooltip: true
        },
        {
          title: '部室/网点',
          key: 'deptName',
          tooltip: true
        },
        {
          title: '处罚日期',
          key: 'pushDate',
          tooltip: true
        },
        {
          title: '处罚金额',
          key: 'pushBal',
          tooltip: true
        },
        {
          title: '具体事项',
          key: 'pushDesc',
          tooltip: true
        },
        {
          title: '实施处罚机构',
          key: 'pushOrg',
          tooltip: true
        },
        {
          title: '导入员工工号',
          key: 'impName',
          tooltip: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  }
}

export const col_economic = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '批次号（员工经济处罚）',
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
  {
    title: '导入结果',
    key: 'impRemark',
    tooltip: 'true'
  },
  {
    title: '失败清单',
    slot: 'action',
    width: 100,
    align: 'center'
  }
]
