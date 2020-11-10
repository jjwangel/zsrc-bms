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
          key: 'postName',
          tooltip: 'true'
        },
        {
          title: '现任职务',
          key: 'duty',
          tooltip: 'true'
        },
        {
          title: '关注类别',
          key: 'focusType',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.focusType) {
              case 1: text = '重点关注'
                break
              case 2: text = '一般关注'
                break
              case 3: text = '正常'
            }

            return h('p', text)
          }
        },
        {
          title: '关注类型',
          key: 'focusItem',
          tooltip: 'true'
        },
        {
          title: '调整日期',
          key: 'focusDate',
          tooltip: 'true'
        },
        // {
        //   title: '解除日期',
        //   key: 'freeDate',
        //   tooltip: 'true'
        // },
        {
          title: '关注时长',
          key: 'focusDuration',
          tooltip: 'true'
        },
        {
          title: '关注(调整)原因描述',
          key: 'focusReason',
          tooltip: 'true'
        },
        {
          title: '采取措施',
          key: 'dispose',
          tooltip: 'true'
        },
        {
          title: '跟进情况登记',
          key: 'followCondition',
          tooltip: 'true'
        },
        {
          title: '下一步计划',
          key: 'nextPlan',
          tooltip: 'true'
        },
        {
          title: '处置建议',
          key: 'disposeAdvise',
          tooltip: 'true'
        }
      ]
    }
  }
}
