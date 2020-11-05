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
          title: '模型启用日期',
          key: 'freq',
          tooltip: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ]
    }
  }
}
