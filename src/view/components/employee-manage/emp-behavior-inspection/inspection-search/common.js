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
          title: '排查项目',
          key: 'employeeNo',
          tooltip: 'true'
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
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '所属单位',
          key: 'deptName',
          tooltip: 'true'
        },
        {
          title: '部室/网点',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '排查日期 ',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '排查人',
          key: 'gw',
          tooltip: 'true'
        },
        {
          title: '排查情况',
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
