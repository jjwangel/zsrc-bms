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
          title: '登记日期',
          key: 'createDate',
          width: 110,
          tooltip: 'true'
        },
        {
          title: '采取措施',
          key: 'dispose',
          tooltip: 'true'
        },
        {
          title: '跟进情况登记',
          key: 'followCondition'
        },
        {
          title: '下一步计划',
          key: 'nextPlan',
          tooltip: 'true'
        },
        // {
        //   title: '经办人',
        //   key: 'creatorName',
        //   tooltip: 'true'
        // },
        // {
        //   title: '审批人',
        //   key: 'approverName',
        //   tooltip: 'true'
        // },
        // {
        //   title: ' 审批意见',
        //   key: 'approveStatus',
        //   tooltip: 'true',
        //   render: (h, params) => {
        //     const row = params.row
        //     let text = ''
        //     switch (row.approveStatus) {
        //       case 1: text = '同意'
        //         break
        //       case 2: text = '不同意'
        //         break
        //     }

        //     return h('p', text)
        //   }
        // },
        // {
        //   title: '意见内容',
        //   key: 'approveComment',
        //   tooltip: 'true'
        // },
        {
          title: '审批日期',
          key: 'approveDate',
          width: 110,
          tooltip: 'true'
        }
      ]
    }
  }
}
