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
          title: '关注类别',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '关注日期',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '解除日期',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '关注时长',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '关注原因描述',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '采取措施',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '跟进情况登记',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '下一步计划',
          key: 'dqgzlb',
          tooltip: 'true'
        }
      ]
    }
  }
}
