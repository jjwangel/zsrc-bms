export const mixinInfo = {
  data () {
    return {
      col_todo: [
        {
          type: 'index',
          width: 30,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          tooltip: 'true'
        },
        {
          title: '时间',
          width: 120,
          key: 'dt',
          tooltip: 'true'
        }
      ]
    }
  }
}
