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
          title: '项目名称',
          width: 200,
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '年度',
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '开始时间',
          key: 'deptName',
          tooltip: 'true'
        },
        {
          title: '结束时间',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '启动时间 ',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '关闭时间',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '状态',
          key: 'gw',
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
