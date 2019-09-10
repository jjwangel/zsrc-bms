export const mixinInfo = {
  data () {
    return {
      col_family_rd: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '家访日期',
          key: 'hocaDate',
          tooltip: true
        },
        {
          title: '员工工号',
          key: 'employeeNo',
          tooltip: true
        },
        {
          title: '员工姓名',
          key: 'name',
          tooltip: true
        },
        // {
        //   title: '所在单位',
        //   key: 'deptType',
        //   tooltip: true
        // },
        // {
        //   title: '部室/网点',
        //   key: 'deptName',
        //   tooltip: true
        // },
        {
          title: '是否异常',
          key: 'unconvTypeText',
          tooltip: true
        },
        {
          title: '异常情况描述',
          key: 'unconvDesc',
          tooltip: true
        },
        {
          title: '采取措施',
          key: 'takeSept',
          tooltip: true
        },
        {
          title: '目前跟进情况',
          key: 'recnCom',
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

export const col_family_imp = [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '批次号（员工家访信息）',
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
