export const mixinInfo = {
  data () {
    return {
      cols: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '排查类型',
          key: 'employeeNo',
          width: 120,
          tooltip: 'true'
        },
        {
          title: '内容',
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '状态',
          key: 'deptName',
          width: 80,
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
