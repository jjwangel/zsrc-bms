export const mixinInfo = {
  data () {
    return {
      col_list: [
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
          width: 90,
          key: 'employeeName',
          tooltip: 'true'
        },
        {
          title: '员工类别',
          width: 100,
          key: 'employeeType',
          tooltip: 'true'
        },
        // {
        //   title: '所属单位',
        //   key: 'headSubName',
        //   width: 100,
        //   tooltip: 'true'
        // },
        {
          title: '部室/网点',
          key: 'deptName',
          width: 130,
          tooltip: 'true'
        },
        {
          title: '关注类别',
          key: 'focusTypeText',
          width: 100,
          tooltip: 'true'
        },
        {
          title: '关注原因',
          key: 'focusReason',
          width: 100,
          tooltip: 'true'
        },
        {
          title: '违规年度累计',
          align: 'center',
          children: [
            {
              title: '轻微违规积分',
              key: 'yearCentToal',
              tooltip: 'true'
            },
            {
              title: '严重违规(次)',
              key: 'yearOutlineCnt',
              tooltip: 'true'
            },
            {
              title: '经济处罚(元)',
              key: 'yearEcnoPushTotal',
              slot: 'yearEcnoPushTotal',
              tooltip: 'true'
            }
          ]
        },
        {
          title: '征信负债(元)',
          key: 'latestDebtTotal',
          slot: 'latestDebtTotal',
          width: 140,
          tooltip: 'true'
        },
        {
          title: '担保金额(元)',
          key: 'yearAssuBal',
          slot: 'yearAssuBal',
          tooltip: 'true'
        },
        {
          title: '经商',
          width: 70,
          key: 'isBuss',
          tooltip: 'true'
        },
        {
          title: '涉诉',
          width: 70,
          key: 'isLawsuit',
          tooltip: 'true'
        }
      ]
    }
  }
}
