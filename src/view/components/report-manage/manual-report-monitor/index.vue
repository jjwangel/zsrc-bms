<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="140" inline>
          <FormItem label="员工其他收入(年度)" prop="incomeYear">
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
              style="width: 220px;"
              :options="optDate"
              :value="formData.creditDate"
              @on-change="handleCreditDateChange"
              :editable='false'></DatePicker>
          </FormItem>
        </Form>

        <Form ref ="form2" :model="formData" :label-width="80" inline>
          <FormItem label="员工工号" prop="employeeNo" style="margin-left: 60px;">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="employeeName" style="margin-left: 60px;">
            <Input type="text" v-model="formData.employeeName" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem label="所属机构" prop="dqzt">
            <Cascader style="width: 300px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.loadData"></Cascader>
          </FormItem>
          <FormItem :label-width="10">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
              <Button type="success" icon="ios-search" :to="downloadUrl + downloadPara" target="_blank"
                @click="handleExportInfo" :disabled="this.formData.creditDate.length === 0"
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

      <Drawer title="选择员工" :closable="false" v-model="showSelectEmp" :transfer="false" inner placement="left">
        <Tree :data="deptEmpList" @on-select-change="handleInstChange"></Tree>
      </Drawer>
    </Card>

  </div>
</template>

<script>
import { getInstEmpList, getInstList } from '@/api/base'
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
        creditDate: [],
        employeeNo: '',
        employeeName: '',
        deptCode: []
      },
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      dataSet: [],
      deptEmpList: [],
      dept_list: [],
      loadData: false,
      showSelectEmp: false,
      downloadUrl: '',
      base_url: '',
      downloadPara: '',
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {
      const condition = {
        employee: true
      }

      getInstEmpList(condition).then(res => {
        if (res.data.code === '000000') {
          this.deptEmpList = res.data.data
        }
      }).catch(() => {

      })

      getInstList().then(res => {
        if (res.data.code === '000000') {
          this.dept_list = res.data.data
        }
      }).catch(() => {

      })
    },
    handleSelectEmp () {
      this.showSelectEmp = true
    },
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

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.employeeName = this.trimForText(this.formData.employeeName)
      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size,
        incomeYear: this.formData.incomeYear,
        credFillDateStart: this.formData.creditDate[0],
        credFillDateEnd: this.formData.creditDate[1]
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.employeeName !== '') {
        condition.employeeName = this.formData.employeeName
      }
      if (this.formData.deptCode && this.formData.deptCode.length > 0) {
        condition.deptCode = this.formData.deptCode[this.formData.deptCode.length - 1]
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
    handleInstChange (item) {
      if (item[0]) {
        item[0].expand = !item[0].expand
        item[0].selected = !item[0].selected

        if (item[0].is_emp) {
          this.formData.employeeName = item[0].title
          this.formData.employeeNo = item[0].num
          this.showSelectEmp = false
        }
      }
    },
    handleExportInfo () {
      if (this.loadData) return
      this.loadData = true

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.employeeName = this.trimForText(this.formData.employeeName)
      this.downloadPara = ''

      this.downloadPara = `incomeYear=${this.formData.incomeYear}&credFillDateStart=${this.formData.creditDate[0]}&credFillDateEnd=${this.formData.creditDate[1]}`
      if (this.formData.employeeNo !== '') {
        this.downloadPara = `${this.downloadPara}&employeeNo=${this.formData.employeeNo}`
      }
      if (this.formData.employeeName !== '') {
        this.downloadPara = `${this.downloadPara}&employeeName=${this.formData.employeeName}`
      }
      if (this.formData.deptCode && this.formData.deptCode.length > 0) {
        this.downloadPara = `${this.downloadPara}&deptCode=${this.formData.deptCode[this.formData.deptCode.length - 1]}`
      }

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
    this.initInfo()
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
