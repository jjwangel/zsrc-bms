export const mixinInfoLevel1 = {
  data () {
    return {
      col_fz: [
        {
          type: 'index',
          width: 40,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'employeeName',
          width: 80,
          tooltip: 'true'
        },
        {
          title: '总额(元)',
          key: 'latestDebtTotal',
          slot: 'latestDebtTotal',
          width: 150,
          tooltip: 'true'
        },
        {
          title: '机构',
          key: 'deptName',
          width: 150,
          tooltip: 'true'
        }
      ],
      col_sx: [
        {
          type: 'index',
          width: 40,
          align: 'center'
        },
        {
          title: '机构',
          key: 'deptName',
          tooltip: 'true'
        },
        {
          title: '姓名',
          key: 'employeeName',
          tooltip: 'true'
        }
      ]
    }
  }
}
