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
          width: 120,
          key: 'typeText',
          tooltip: 'true'
        },
        {
          title: '内容',
          key: 'typeContent'
        },
        {
          title: '排查情况',
          slot: 'action',
          width: 220,
          align: 'center'
        }
      ]
    }
  }
}
