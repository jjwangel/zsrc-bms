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
          title: '流程类型',
          width: 180,
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.type) {
              case 1: text = '关注人员调整'
                break
              case 2: text = '关注人员情况跟进登记'
                break
            }

            return h('p', text)
          }
        },
        {
          title: '标题',
          key: 'name',
          tooltip: 'true'
        },
        {
          title: '创建人',
          key: 'createUserName',
          width: 100,
          tooltip: 'true'
        },
        {
          title: '接收时间',
          key: 'receiveTime',
          width: 200,
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
