export const mixinInfo = {
  data () {
    return {
      cols: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '排查类型',
          key: 'typeText',
          width: 120,
          tooltip: 'true'
        },
        {
          title: '内容',
          key: 'content',
          tooltip: 'true'
        },
        {
          title: '状态',
          key: 'status',
          width: 80,
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.status) {
              case 1: text = '正常'
                break
              case 2: text = '关闭'
                break
            }

            return h('p', text)
          }
        },
        {
          title: '操作',
          slot: 'action',
          width: 130,
          align: 'center'
        }
      ]
    }
  }
}
