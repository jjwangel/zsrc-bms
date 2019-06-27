<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'attention-line',
  props: [
    'charData'
  ],
  data () {
    return {
      dom: null,
      option: {
        title: {
          text: '关注人员',
          x: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }],
        legend: {
          data: ['重点关注', '一般关注']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '重点关注',
            type: 'line',
            stack: '总数',
            data: []
          },
          {
            name: '一般关注',
            type: 'line',
            stack: '总数',
            data: []
          }
        ]
      }
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  watch: {
    charData (val) {
      this.option.xAxis.data = val.map((currVal) => { return currVal.yearMonth })
      this.option.series[0].data = val.map((currVal) => { return currVal.emphasisCount })
      this.option.series[1].data = val.map((currVal) => { return currVal.commonCount })
      this.dom.setOption(this.option)
      this.dom.resize()
    }
  },
  mounted () {
    this.dom = echarts.init(this.$refs.dom)
    on(window, 'resize', this.resize)
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
