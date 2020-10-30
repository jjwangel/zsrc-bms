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
          title: '标题',
          key: 'title',
          tooltip: 'true'
        },
        {
          title: '创建人',
          width: 100,
          key: 'creatorName',
          tooltip: 'true'
        },
        {
          title: '创建日期',
          key: 'createDate',
          width: 150,
          tooltip: 'true'
        },
        {
          title: '审批人',
          key: 'approverName',
          width: 100,
          tooltip: 'true'
        },
        {
          title: '审批日期',
          key: 'approveTime',
          width: 150,
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
