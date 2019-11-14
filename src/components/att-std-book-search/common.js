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
          title: '登记日期',
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '采取措施',
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '跟进情况登记',
          key: 'deptName',
          tooltip: 'true'
        },
        {
          title: '下一步计划',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '经办人',
          key: 'xrzw',
          tooltip: 'true'
        },
        {
          title: '审批人',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: ' 审批意见',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '意见内容',
          key: 'dqgzlb',
          tooltip: 'true'
        },
        {
          title: '审批日期',
          key: 'dqgzlb',
          tooltip: 'true'
        }
      ]
    }
  }
}
