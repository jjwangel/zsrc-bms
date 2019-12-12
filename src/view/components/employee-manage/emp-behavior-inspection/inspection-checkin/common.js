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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '工号',
          width: 100,
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '姓名',
          width: 100,
          key: 'name',
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
          title: '排查次数 ',
          key: 'checkCount',
          tooltip: 'true'
        },
        {
          title: '排查状态',
          key: 'checkStatus',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.checkStatus) {
              case 0: text = '待排查'
                break
              case 1: text = '已排查'
                break
            }

            return h('p', text)
          }
        },
        {
          title: '编外人员操作',
          slot: 'action',
          width: 120,
          align: 'center'
        }
      ]
    }
  }
}
