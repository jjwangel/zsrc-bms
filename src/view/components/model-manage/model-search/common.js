export const mixinInfo = {
  data () {
    return {
      col_model_main: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          indexMethod: (row) => {
            return (row._index + 1) + (this.pageData.size * this.pageData.current) - this.pageData.size
          }
        },
        {
          title: '模型编号',
          key: 'vriskid',
          width: 200,
          tooltip: true
        },
        {
          title: '模型名称',
          key: 'riskNm',
          tooltip: true
        },
        {
          title: '运行频率',
          key: 'freq',
          tooltip: true
        },
        {
          title: '风险级别',
          key: 'riskLvlText',
          tooltip: true
        }
      ],
      col_model_para: [
        {
          title: '参数编号',
          key: 'paraId',
          tooltip: true
        },
        {
          title: '参数名称',
          key: 'paraNm',
          tooltip: true
        },
        {
          title: '参数值',
          key: 'paraValue',
          tooltip: true
        }
      ]
    }
  }
}
