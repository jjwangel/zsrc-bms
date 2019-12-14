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
          title: '员工工号',
          width: 100,
          key: 'employeeNo',
          tooltip: 'true'
        },
        {
          title: '员工姓名',
          width: 100,
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '所属单位',
          key: 'headSubName',
          tooltip: 'true'
        },
        {
          title: '部室/网点',
          key: 'deptName',
          tooltip: 'true'
        },
        {
          title: '其他收入',
          key: 'otherIncomeFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.otherIncomeFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '房产',
          key: 'houseFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.houseFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '纯土地',
          key: 'landFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.landFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '汽车',
          key: 'carFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.carFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '股金',
          key: 'capFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.capFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '证券及投资',
          key: 'investFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.investFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '银行账户',
          key: 'bankAcctFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.bankAcctFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        },
        {
          title: '征信信息',
          key: 'credFill',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            if (row.credFill !== 0) {
              return h('p', '')
            } else {
              return h('Icon', {
                props: {
                  type: 'md-close',
                  color: '#ed4014',
                  size: '20'
                }
              })
            }
          }
        }
      ]
    }
  }
}
