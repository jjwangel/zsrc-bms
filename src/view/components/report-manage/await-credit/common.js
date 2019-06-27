export const mixinInfo = {
  data () {
    return {
      col_ac_inst: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '管理机构',
          key: 'deptName',
          width: 200,
          tooltip: true
        },
        {
          title: '待审核征信（条)',
          key: 'total',
          tooltip: true
        }
      ],
      col_ac_detail: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageDetail.size * this.pageDetail.current) - this.pageDetail.size
          }
        },
        {
          title: '员工工号',
          key: 'employeeNo',
          tooltip: true
        },
        {
          title: '员工姓名',
          key: 'name',
          tooltip: true
        },
        {
          title: '所属单位',
          key: 'headSubName',
          tooltip: true
        },
        {
          title: '部门/网点',
          key: 'deptName',
          tooltip: true
        },
        {
          title: '征信报告日期',
          key: 'credDate',
          tooltip: true
        }
      ]
    }
  }
}
