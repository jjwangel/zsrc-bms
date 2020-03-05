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
          title: '跟进情况登记',
          key: 'followCondition',
          tooltip: 'true'
        },
        {
          title: '登记日期',
          key: 'createDate',
          tooltip: 'true'
        },
        {
          title: '流程进度',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            const text = (row.approveStatus === 0) ? '流程中' : '结束'

            return h('p', text)
          }
        },
        {
          title: '操作结果',
          key: 'approveStatus',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.approveStatus) {
              case 1: text = '同意'
                break
              case 2: text = '不同意'
                break
              default: text = '待处理'
            }

            return h('p', text)
          }
        },
        {
          title: '意见内容',
          key: 'approveComment',
          tooltip: 'true'
        },
        {
          title: '下一操作人',
          key: 'nodeStatus',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            const text = (row.approveStatus === 0) ? row.approverName : '无'

            return h('p', text)
          }
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
