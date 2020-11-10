export const mixinInfo = {
  data () {
    return {
      cols: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '标题',
          key: 'name',
          tooltip: 'true'
        },
        {
          title: '',
          key: 'processType',
          align: 'right',
          width: 80,
          render: (h, params) => {
            const row = params.row
            switch (row.processType) {
              case 1: {
                return h('Tag', { props: { color: 'primary' } }, '待办')
              }
              case 2: {
                return h('Tag', { props: { color: 'success' } }, '待阅')
              }
            }
          }
        }
      ]
    }
  }
}
