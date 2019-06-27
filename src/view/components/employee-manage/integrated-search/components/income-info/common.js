export const mixinInfo = {
  data () {
    return {
      col_income: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '年度',
          key: 'year'
        },
        // {
        //   title: '本行年收入（税后）',
        //   key: 'yearIncoDuty'
        // },
        {
          title: '本行股金现金分红(元，税后)',
          slot: 'capMonDuty',
          key: 'capMonDuty'
        },
        // {
        //   title: '本行收入合计',
        //   key: 'incoBankTotal',
        //   render: (h, params) => {
        //     return h('p', params.row.capMonDuty + params.row.yearIncoDuty)
        //   }
        // },
        {
          title: '行外收入(元)',
          slot: 'incoTol',
          key: 'incoTol'
        },
        {
          title: '行外收入类型',
          key: 'incoType'
        }
        // {
        //   title: '总收入',
        //   key: 'incoAll',
        //   render: (h, params) => {
        //     return h('p', params.row.capMonDuty + params.row.yearIncoDuty + params.row.incoTol)
        //   }
        // }
      ]
    }
  }
}
