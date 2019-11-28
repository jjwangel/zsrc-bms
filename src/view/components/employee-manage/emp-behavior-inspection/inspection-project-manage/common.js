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
          title: '项目名称',
          width: 200,
          key: 'describe',
          tooltip: 'true'
        },
        {
          title: '年度',
          key: 'year',
          tooltip: 'true'
        },
        {
          title: '开始时间',
          key: 'startTime',
          tooltip: 'true'
        },
        {
          title: '结束时间',
          key: 'endTime',
          tooltip: 'true'
        },
        {
          title: '启动时间 ',
          key: 'projectStartTime',
          tooltip: 'true'
        },
        {
          title: '关闭时间',
          key: 'projectCloseTime',
          tooltip: 'true'
        },
        {
          title: '状态',
          key: 'status',
          tooltip: 'true',
          render: (h, params) => {
            const row = params.row
            let text = ''
            switch (row.status) {
              case 0: text = '待启动'
                break
              case 1: text = '正常'
                break
              case 2: text = '关闭'
            }

            return h('p', text)
          }
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
