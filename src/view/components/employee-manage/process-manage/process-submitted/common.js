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
          title: '流程类型',
          width: 100,
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '标题',
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '创建人',
          key: 'deptName',
          width: 100,
          tooltip: 'true'
        },
        {
          title: '处理环节',
          key: 'deptName',
          width: 100,
          tooltip: 'true'
        },
        {
          title: '接收时间',
          key: 'gw',
          width: 200,
          tooltip: 'true'
        },
        {
          title: '办理时间',
          key: 'deptName',
          width: 200,
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
