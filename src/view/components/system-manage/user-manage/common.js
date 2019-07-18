export const mixinInfo = {
  data () {
    return {
      col_list: [
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
          title: '员工工号',
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '员工姓名',
          key: 'name',
          tooltip: 'true'
        },
        {
          title: '员工类别',
          key: 'employeeType',
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
        }
      ]
    }
  }
}
