export const mixinInfo = {
  data () {
    return {
      col_main: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '管理机构',
          key: 'deptName',
          width: 500,
          tooltip: true
        },
        {
          title: '重点关注人员',
          key: 'emphasisCount',
          tooltip: true
        },
        {
          title: '一般关注人员',
          key: 'commonCount',
          tooltip: true
        }
      ],
      col_detail: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageDetail.size * this.pageDetail.current) - this.pageDetail.size
          }
        },
        {
          title: '员工工号',
          key: 'employeeNo',
          tooltip: true
        },
        {
          title: '员工姓名',
          key: 'employeeName',
          tooltip: true
        },
        {
          title: '所属单位',
          key: 'headSubName',
          tooltip: true
        },
        {
          title: '部门/网点',
          key: 'deptName',
          tooltip: true
        },
        {
          title: '关注类别',
          key: 'focusTypeText',
          tooltip: true
        },
        {
          title: '关注原因',
          key: 'focusReason',
          tooltip: true
        },
        {
          title: '年度累计轻微违规积分',
          key: 'yearCentToal',
          tooltip: true
        },
        {
          title: '年度严重违规(次)',
          key: 'yearOutlineCnt',
          tooltip: true
        },
        {
          title: '年度累计经济处罚(元)',
          key: 'yearEcnoPushTotal',
          slot: 'yearEcnoPushTotal',
          tooltip: true
        },
        {
          title: '最近已审核的征信负债(元)',
          key: 'latestDebtTotal',
          slot: 'latestDebtTotal',
          tooltip: true
        },
        {
          title: '对外担保(元)',
          key: 'yearAssuBal',
          slot: 'yearAssuBal',
          tooltip: true
        },
        {
          title: '经商',
          key: 'isBuss',
          tooltip: true
        },
        {
          title: '涉诉',
          key: 'isLawsuit',
          tooltip: true
        }
      ]
    }
  }
}

export const charOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100
  }],
  legend: {
    data: ['重点关注人员', '一般关注人员']
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '重点关注人员',
      type: 'bar',
      stack: 'attention',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: []
    },
    {
      name: '一般关注人员',
      type: 'bar',
      stack: 'attention',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: []
    }
  ]
}
