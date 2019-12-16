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
          title: '所属单位',
          key: 'headSubName',
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
          title: '当前关注类别',
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
          title: '开始关注日期',
          key: 'focusDate',
          tooltip: 'true'
        },
        {
          title: '关注时长',
          key: 'focusDuration',
          tooltip: 'true'
        },
        {
          title: '上次跟进日期',
          key: 'lastFollowDate',
          tooltip: 'true'
        },
        {
          title: '是否流程中',
          key: 'existFlow',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            const text = row.existFlow === 1 ? '流程中' : ''

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
