export const mixinInfo = {
  data () {
    return {
      cols: [
        {
          title: '参数编号',
          key: 'paraId',
          tooltip: true
        },
        {
          title: '参数名称',
          key: 'paraNm',
          tooltip: true
        },
        {
          title: '参数值',
          key: 'paraValue',
          tooltip: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ]
    }
  }
}
