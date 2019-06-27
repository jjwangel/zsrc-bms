<template>
  <div>
    <Card dis-hover>
      <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_main" :data="data_main"
        :loading="this.main_search"
        height=300
        @on-row-dblclick="handleSearchInst2">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current"
            @on-change="searchMain"
            @on-page-size-change="handleChgPageMainSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>
    <Card dis-hover>
      <div ref="charAtt" style="height:300px"></div>
    </Card>
    <Card dis-hover>
      <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_detail" :data="data_detail"
      :loading="this.detail_search" height=600>

      <template slot-scope="{ row, index }" slot="yearEcnoPushTotal">
        <span>{{ formatMoney(row.yearEcnoPushTotal) }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="latestDebtTotal">
        <span>{{ formatMoney(row.latestDebtTotal) }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="yearAssuBal">
        <span>{{ formatMoney(row.yearAssuBal) }}</span>
      </template>
      <div slot="footer" style="width:100%;text-align: center">
        <Page :total="pageDetail.total" :current.sync="pageDetail.current"
          @on-change="searchDetail"
          @on-page-size-change="handleChgPageDetailSize"
          size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getAttentionInstRptList, getAttentionInst2RptList, getAttentionDetailRptList } from '@/api/rpt-stat/attention-stat'
import { on, off, getStartToLastDate } from '@/libs/j-tools.js'
import { mixinInfo, charOption } from './common.js'
import tdTheme from './theme.json'
echarts.registerTheme('tdTheme', tdTheme)

export default {
  mixins: [mixinInfo],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      pageDetail: {
        total: 0,
        current: 1,
        size: 10
      },
      date_value: [],
      current_deptCode: undefined,
      current_focusType: undefined,
      charAtt: null,
      main_search: false,
      char_search: false,
      detail_search: false,
      data_main: [],
      data_detail: []
    }
  },
  methods: {
    handleChgPageMainSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchMain()
      })
    },
    handleSearchMain () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchMain()
      })
    },
    searchMain () {
      if (this.main_search) return
      this.main_search = true
      this.data_detail = []
      this.data_main = []
      this.charAtt.showLoading()
      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size
      }

      getAttentionInstRptList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_main = res.data.data.rows
          this.pageData.total = res.data.data.total
          // if (this.data_main.length > 0) {
          //   this.refreshChar(this.data_main.slice(1, this.data_main.length)) // 忽略第一条汇总数据
          // } else {
          //   this.refreshChar(this.data_main)
          // }
          this.handleSearchInst2({ deptCode: '01' })
        }
        this.charAtt.hideLoading()
        this.main_search = false
      }).catch(() => {
        this.refreshChar([])
        this.charAtt.hideLoading()
        this.main_search = false
      })
    },
    handleChartClick (charVal) {
      this.searchDetail(charVal)
    },
    refreshChar (charData) {
      charOption.xAxis[0].data = []
      charOption.series[0].data = []
      charOption.series[1].data = []

      for (let item of charData.values()) {
        charOption.xAxis[0].data.push(item.deptName)
        charOption.series[0].data.push({ value: item.emphasisCount, deptCode: item.deptCode, focusType: 1 })
        charOption.series[1].data.push({ value: item.commonCount, deptCode: item.deptCode, focusType: 2 })
      }
      this.charAtt.setOption(charOption)
      this.resize()
    },
    handleSearchInst2 (row, index) {
      this.charAtt.showLoading()
      this.data_detail = []
      const condition = {}
      if (row.deptCode !== '01') {
        condition.parentCode = row.deptCode
      }

      getAttentionInst2RptList(condition).then(res => {
        if (res.data.code === '000000') {
          if (row.deptCode === '01') {
            this.refreshChar(res.data.data.slice(1, res.data.data.length)) // 忽略第一条汇总数据
          } else {
            if (res.data.data.length !== 0) {
              this.refreshChar(res.data.data)
            } else {
              this.refreshChar([{
                commonCount: row.commonCount,
                deptCode: row.deptCode,
                deptName: row.deptName,
                emphasisCount: row.emphasisCount
              }])
            }
          }
        }
        this.charAtt.hideLoading()
      }).catch(() => {
        this.charAtt.hideLoading()
      })
    },
    handleChgPageDetailSize (val) {
      this.pageDetail.size = val
      this.$nextTick(() => {
        this.searchDetail()
      })
    },
    searchDetail (charVal) {
      if (!this.current_deptCode && !charVal) return
      if (this.detail_search) return
      this.detail_search = true

      this.date_value = getStartToLastDate('year')
      if (charVal) {
        this.current_deptCode = charVal.data.deptCode
        this.current_focusType = charVal.data.focusType
      }
      const condition = {
        startDate: this.date_value[0],
        endDate: this.date_value[1],
        deptCode: this.current_deptCode,
        focusType: this.current_focusType,
        page: this.pageDetail.current,
        pageSize: this.pageDetail.size
      }

      getAttentionDetailRptList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_detail = res.data.data.rows
          this.pageDetail.total = res.data.data.total
        }

        this.detail_search = false
      }).catch(() => {
        this.data_detail = []
        this.detail_search = false
      })
    },
    resize () {
      this.charAtt.resize()
    }
  },
  mounted () {
    this.charAtt = echarts.init(this.$refs.charAtt, 'tdTheme')
    this.charAtt.on('click', this.handleChartClick)
    this.charAtt.setOption(charOption)
    on(window, 'resize', this.resize)
    this.$nextTick(() => {
      this.searchMain()
    })
  },
  beforeDestroy () {
    charOption.xAxis[0].data = []
    charOption.series[0].data = []
    charOption.series[1].data = []
    off(window, 'resize', this.resize)
  }
}
</script>
<style scoped>
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
  /* .main_div{
    overflow-y:auto;
    overflow: scroll;
  } */
</style>
