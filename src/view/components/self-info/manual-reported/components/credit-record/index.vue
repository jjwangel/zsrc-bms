<template>
  <div>
    <Card dis-hover>
      <div slot="title" class="info_title">
        查询年度：
        <DatePicker type="year"
          @on-change="handleDateChange"
          :disabled="this.searching"
          :clearable="false"
          :value="this.formRpt.rpt_date"
          style="width: 100px;margin-right: 10px"
          :editable='false'></DatePicker>
          <ButtonGroup>
            <Button type="primary" icon="md-document" @click="handleCreateReport" :disabled="this.searching">增加</Button>
            <Button type="success" icon="md-copy" @click="handleCopyReport" :disabled="this.searching">复制上期征信</Button>
          </ButtonGroup>
      </div>
      <Table size="small" :highlight-row="true" :stripe="true" border ref="selection" :columns="col_credit" :data="data_credit"
        :loading="this.searching"
        @on-row-dblclick="handleShowDetail">

        <template slot-scope="{ row, index }" slot="debtBal">
          <span>{{ formatMoney(row.debtBal) }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="assuBal">
          <span>{{ formatMoney(row.assuBal) }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="handleModifyDetail (row, index)" :disabled="row.credStatuText === '已审核'">修改</Button>
          <Poptip
            confirm
            title="你确认删除这条内容吗？"
            @on-ok="handleDelRpt (row, index)">
            <Button type="error" size="small" :disabled="row.credStatuText === '已审核'">删除</Button>
          </Poptip>
        </template>
      </Table>
      <div style="text-align: left;margin-top: 5px">双击任意记录，显示详细信息</div>
    </Card>
    <div style="height:10px"></div>
    <Card dis-hover v-show='show_credit_detail'>
      <div slot="title">
        <span style='font-weight:bold;color: #464c5b;'>征信报告日期：{{ report_date }}</span>
      </div>
      <Tabs type="card" v-model="forceTab" name='tab-cr' :animated="false">
        <TabPane label="负债信息" name="liabilities_info" tab="tab-cr">
          <LiabilitiesInfo :load-detail="this.load_rpt_detail" :selOption="this.sel_option" :rptDate="this.report_date" :action="this.action"></LiabilitiesInfo>
        </TabPane>
        <TabPane label="不良记录" name="badness_record" tab="tab-cr">
          <BadnessRecord :load-detail="this.load_rpt_detail" :rptDate="this.report_date" :action="this.action"></BadnessRecord>
        </TabPane>
        <TabPane label="对外担保信息" name="guarantee_info" tab="tab-cr">
          <GuaranteeInfo :load-detail="this.load_rpt_detail" :selOption="this.sel_option" :rptDate="this.report_date" :action="this.action"></GuaranteeInfo>
        </TabPane>
        <TabPane label="存在被强制执行记录信息" name="coerce_info" tab="tab-cr">
          <CoerceInfo :load-detail="this.load_rpt_detail" :selOption="this.sel_option" :rptDate="this.report_date" :action="this.action"></CoerceInfo>
        </TabPane>
      </Tabs>
    </Card>

    <Modal v-model="show_create_rpt" :loading="data_saving" scrollable  width="300" ok-text="确定" :mask-closable="false"
      :title="this.formRpt.new_rpt_title"
      @on-ok="handleSubmitRpt">
      <Form :label-width="120">
        <FormItem label="本次征信报告日期" class="info_title">
          <DatePicker type="date" :options="optCreditDate" :value="this.formRpt.new_rpt_date" @on-change="handleNewRptDateChange" :editable="false" style="width:100%;" :clearable="false">
          </DatePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getEmpCreditByManualList, delCreditByManual,
  addCreditByManual, copyCreditByManual } from '@/api/self-info/info-fill'
import { getFormatDate, getStartToLastDate, formatSelectOption } from '@/libs/j-tools.js'
import { mapGetters } from 'vuex'
import { getSelectOptionData } from '@/api/base'
import LiabilitiesInfo from './components/liabilities-info'
import BadnessRecord from './components/badness-record'
import GuaranteeInfo from './components/guarantee-info'
import CoerceInfo from './components/coerce-info'

import { col_credit } from './common.js'

export default {
  props: ['loadData'],
  name: 'CreditRecord',
  components: {
    LiabilitiesInfo,
    BadnessRecord,
    GuaranteeInfo,
    CoerceInfo
  },
  data () {
    return {
      forceTab: 'liabilities_info',
      action: 'view', // view || modify
      create_type: 'add', // add || copy
      formRpt: {
        new_rpt_date: '',
        new_rpt_title: '',
        rpt_date: '' // 保存选择年度
      },
      optCreditDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      data_saving: true,
      sel_option: {},
      report_date: '', // 保存详细报告中的报告日期
      searching: false,
      load_rpt_detail: false,
      show_credit_detail: false,
      show_create_rpt: false,
      col_credit,
      data_credit: []
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    initInfo () {
      const optName = {
        type: [
          'DEBT_TYPE',
          'ASSU_MODE',
          'LOAN_5STA',
          'ASSU_STAU',
          'FORCE_STATU'
        ]
      }
      getSelectOptionData(optName).then(res => {
        if (res.data.code === '000000') {
          this.sel_option = {
            selDebtType: formatSelectOption(res.data.data.DEBT_TYPE),
            selAssuMode: formatSelectOption(res.data.data.ASSU_MODE),
            selLoan5sta: formatSelectOption(res.data.data.LOAN_5STA),
            selAssuStau: formatSelectOption(res.data.data.ASSU_STAU),
            selForceStatu: formatSelectOption(res.data.data.FORCE_STATU)
          }
        }
      }).catch(() => {

      })
    },
    createCreditRpt () {
      let data = {
        employeeNo: this.employeeNo(),
        credDate: this.formRpt.new_rpt_date
      }

      if (this.create_type === 'add') { // 增加
        addCreditByManual(data).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.data_credit.push({
              id: res.data.data.id,
              credDate: this.formRpt.new_rpt_date,
              debtBal: 0,
              overdue: '否',
              assuBal: 0,
              forceStatus: '否',
              credStatuText: '未审核'
            })
            this.data_saving = false
            this.show_create_rpt = false
            this.action = 'modify'
            this.searchRptDetail(this.formRpt.new_rpt_date)
            this.$nextTick(() => {
              this.data_saving = true
            })
          } else {
            this.data_saving = false
            this.show_create_rpt = false
            this.$nextTick(() => {
              this.data_saving = true
            })
            if (res.data.code === '003901') {
              this.$Message.warning({
                content: '不允许创建新征信报告，因为存在未审核的报告',
                duration: 5
              })
            } else if (res.data.code === '003903') {
              this.$Message.warning({
                content: '您填写的征信报告日期已存在！',
                duration: 5
              })
            }
          }
        }).catch(() => {
          this.data_saving = false
          this.show_create_rpt = false
          this.$nextTick(() => {
            this.data_saving = true
          })
        })
      } else { // 复制
        copyCreditByManual(data).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '复制征信报告数据成功！',
              duration: 3
            })
            this.data_credit.push({
              id: res.data.data.id,
              credDate: this.formRpt.new_rpt_date,
              debtBal: res.data.data.debtBal,
              overdue: res.data.data.overdue,
              assuBal: res.data.data.assuBal,
              forceStatus: res.data.data.forceStatus,
              credStatuText: '未审核'
            })
            this.data_saving = false
            this.show_create_rpt = false
            this.action = 'modify'
            this.searchRptDetail(this.formRpt.new_rpt_date)
            this.$nextTick(() => {
              this.data_saving = true
            })
          } else {
            this.data_saving = false
            this.show_create_rpt = false
            this.$nextTick(() => {
              this.data_saving = true
            })
            if (res.data.code === '003901') {
              this.$Message.warning({
                content: '不允许创建新征信报告，因为存在未审核的报告',
                duration: 5
              })
            } else if (res.data.code === '003903') {
              this.$Message.warning({
                content: '您填写的征信报告日期已存在！',
                duration: 5
              })
            }
          }
        }).catch(() => {
          this.data_saving = false
          this.show_create_rpt = false
          this.$nextTick(() => {
            this.data_saving = true
          })
        })
      }
    },
    handleSubmitRpt () {
      if (!this.formRpt.new_rpt_date) {
        this.$Message.warning({
          content: '请选择本次征信报告日期！',
          duration: 5
        })
        this.data_saving = false
        this.$nextTick(() => {
          this.data_saving = true
        })
        return
      }

      this.$Modal.confirm({
        title: '个人填报征信报告',
        content: `确定创建新报告（${this.formRpt.new_rpt_date}）吗？`,
        onOk: this.createCreditRpt,
        onCancel: () => {
          this.data_saving = false
          this.$nextTick(() => {
            this.data_saving = true
          })
        }
      })
    },
    handleCreateReport () {
      this.formRpt.new_rpt_title = '增加征信'
      this.create_type = 'add'
      this.show_create_rpt = true
    },
    handleCopyReport () {
      this.formRpt.new_rpt_title = '复制上期征信'
      this.create_type = 'copy'
      this.show_create_rpt = true
    },
    handleDelRpt (row, index) {
      this.searching = true
      this.show_credit_detail = false
      const condition = {
        id: row.id
      }

      delCreditByManual(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_credit.splice(index, 1)
          this.$Message.success({
            content: '删除数据成功！',
            duration: 3
          })
        }
        this.searching = false
      }).catch(() => {
        this.searching = false
      })
    },
    handleModifyDetail (row, index) {
      this.action = 'modify'
      this.searchRptDetail(row.credDate)
    },
    handleShowDetail (row, index) {
      this.action = 'view'
      this.searchRptDetail(row.credDate)
    },
    searchRptDetail (rptDate) {
      this.report_date = rptDate
      this.load_rpt_detail = true
      this.show_credit_detail = true
      this.forceTab = 'liabilities_info'
      this.$nextTick(function () {
        this.load_rpt_detail = false
      })
    },
    handleDateChange (val) {
      this.formRpt.rpt_date = val
      this.handleSearchReport()
    },
    handleNewRptDateChange (val) {
      this.formRpt.new_rpt_date = val
    },
    handleSearchReport () {
      this.searching = true
      this.show_credit_detail = false
      this.load_rpt_detail = false

      let _date = getStartToLastDate('year', new Date(this.formRpt.rpt_date))
      const condition = {
        employeeNo: this.employeeNo(),
        credDateStart: _date[0],
        credDateEnd: _date[1]
      }

      getEmpCreditByManualList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_credit = res.data.data
        }

        this.searching = false
      }).catch(() => {
        this.data_credit = []
        this.searching = false
      })
    }
  },
  mounted () {
    this.formRpt.rpt_date = getFormatDate('yyyy-MM-dd')
  },
  watch: {
    loadData (val) {
      if (val) {
        this.initInfo()
        this.handleSearchReport()
      }
    }
  }
}
</script>
<style scoped>
  .ivu-form-item{
    margin-bottom: 8px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
