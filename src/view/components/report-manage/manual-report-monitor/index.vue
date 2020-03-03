<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="160" inline>
          <FormItem label="员工其他收入（年度）" prop="incomeYear">
            <DatePicker type="year" :options="optDate" :clearable="false"
              @on-change="handleIncomeYearChange"
              :disabled="this.loadData"
              :value="this.formData.incomeYear"
              style="width: 100px;"
              :editable='false'></DatePicker>
          </FormItem>
          <FormItem label="员工征信录入日期" prop="creditDate" class="info_title" :label-width="140">
            <DatePicker type="daterange" placement="bottom-start" :clearable="false"
              :disabled="this.loadData"
              style="width: 200px;"
              :options="optDate"
              :value="formData.creditDate"
              @on-change="handleCreditDateChange"
              :editable='false'></DatePicker>
          </FormItem>

          <FormItem :label-width="10">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
              <Button type="success" icon="ios-search" :to="downloadUrl + downloadPara" target="_blank"
                @click="handleExportInfo"
                :loading="this.loadData">导出
              </Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

  </div>
</template>

<script>
import { getFormatDate } from '@/libs/j-tools.js'
import { mixinInfo } from './common.js'
import { getEmpInfoFillList } from '@/api/rpt-stat/manual-report-monitor'

export default {
  components: {

  },
  mixins: [ mixinInfo ],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      formData: {
        incomeYear: undefined,
        creditDate: []

      },
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      dataSet: [],
      loadData: false,
      downloadUrl: '',
      base_url: '',
      downloadPara: '',
      windowHeight: 0
    }
  },
  methods: {
    handleCreditDateChange (val) {
      this.formData.creditDate = val
    },
    handleIncomeYearChange (val) {
      this.formData.incomeYear = val
    },
    handleChgPageSize (size, current) {
      if (current) this.pageData.current = current
      this.pageData.size = size
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {
      if (this.loadData) return
      if (this.formData.creditDate.length === 0) {
        this.$Message.warning({
          content: '请选择“员工征信录入日期”',
          duration: 5
        })
        return
      }

      this.loadData = true

      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size,
        incomeYear: this.formData.incomeYear,
        credFillDateStart: this.formData.creditDate[0],
        credFillDateEnd: this.formData.creditDate[1]
      }

      getEmpInfoFillList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data.rows
          this.pageData.total = res.data.data.total
        }
        this.loadData = false
      }).catch(() => {
        this.dataSet = []
        this.loadData = false
      })
    },
    handleExportInfo () {
      if (this.loadData) return
      this.loadData = true

      this.downloadPara = `incomeYear=${this.formData.incomeYear}&credFillDateStart=${this.formData.creditDate[0]}&credFillDateEnd=${this.formData.creditDate[1]}`

      this.$Message.info({
        content: '正在生成数据，请稍候......',
        duration: 5
      })

      setTimeout(() => {
        this.loadData = false
      }, 5000)
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 230
    }
  },
  mounted () {
    this.formData.incomeYear = getFormatDate('yyyy')
    // this.formData.creditDate = getStartToLastDate('month')
    this.base_url = (process.env.NODE_ENV === 'production' ? this.$config.baseUrl.pro : this.$config.baseUrl.dev)
    this.downloadUrl = this.base_url + 'stat/infofills/export?'
  },
  created () {
    window.addEventListener('resize', this.setWindowHeight)
    this.setWindowHeight()
  },
  destroyed () {
    window.removeEventListener('resize', this.setWindowHeight)
  }
}
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 0px;
  }
</style>
