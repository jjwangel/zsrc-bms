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
          title: '调整前关注类别',
          key: 'focusTypeBefore',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.focusTypeBefore) {
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
          title: '调整后关注类别',
          key: 'focusTypeAfter',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.focusTypeAfter) {
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
          title: '发起调整日期',
          key: 'createTime',
          tooltip: 'true',
          render: (h, params) => {
            return h('p', params.row.createTime.split(' ')[0])
          }
        },
        {
          title: '流程状态',
          key: 'flowNode',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.flowNode) {
              case 1: text = '复核'
                break
              case 2: text = '审核'
                break
              case 3: text = '审批'
            }

            return h('p', text)
          }
        },
        {
          title: '流程进度',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            const text = (row.nodeStatus === 1 || row.nodeStatus === 2) ? '结束' : '流程中'

            return h('p', text)
          }
        },
        {
          title: '操作结果',
          key: 'nodeStatus',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.nodeStatus) {
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
          title: '操作',
          slot: 'action',
          width: 100,
          align: 'center'
        }
      ]
    }
  }
}
