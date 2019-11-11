export const mixinInfo = {
  data () {
    return {
      cols: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '员工工号',
          width: 100,
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '员工姓名',
          width: 100,
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '部室/网点',
          key: 'deptName',
          tooltip: 'true'
        },
        {
          title: '岗位',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '现任职务',
          key: 'xrzw',
          tooltip: 'true'
        },
        {
          title: '调整前关注类别',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '调整后关注类别',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '流程状态',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '流程进度',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '操作结果',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '操作',
          slot: 'action',
          width: 100,
          align: 'center'
        }
      ]
    }
  }
}
