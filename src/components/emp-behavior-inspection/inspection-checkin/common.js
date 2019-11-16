export const mixinInfo = {
  data () {
    return {
      cols: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          indexMethod: (row) => {
            return row._index + 1
          }
        },
        {
          title: '类型',
          width: 200,
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '内容',
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '排查情况',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ]
    }
  }
}
