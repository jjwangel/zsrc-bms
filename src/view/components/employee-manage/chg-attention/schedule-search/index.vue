<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="80" inline>
          <FormItem label="员工工号" prop="employeeNo">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="employeeName">
            <Input type="text" v-model="formData.employeeName" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem label="当前状态" prop="flowNode">
            <Select v-model="formData.flowNode" clearable style="width:100px" :disable="this.loadData">
              <Option :value="1">复核</Option>
              <Option :value="2">审核</Option>
              <Option :value="3">审批</Option>
            </Select>
          </FormItem>
          <FormItem label="操作结果" prop="nodeStatus">
            <Select v-model="formData.nodeStatus" clearable style="width:100px" :disable="this.loadData">
              <Option :value="0">待处理</Option>
              <Option :value="1">同意</Option>
              <Option :value="2">不同意</Option>
            </Select>
          </FormItem>
          <FormItem label="发起调整日期" prop="sponsorDate" class="info_title" :label-width="110">
            <DatePicker type="daterange" placement="bottom-start" clearable
              style="width: 200px;margin-right: 10px"
              :options="optDate"
              :value="formData.sponsorDate"
              @on-change="handleDateChange"
              :editable='false'></DatePicker>
          </FormItem>

          <FormItem :label-width="10">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Poptip
            confirm
            title="你确认删除这条流程吗？"
            @on-ok="handleDeleteFlow (row, index)">
            <Button type="error" size="small" :disabled="!(row.flowNode === 1 && row.nodeStatus === 0)">删除</Button>
          </Poptip>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <span style="float: left;margin-left: 10px">双击任意记录，显示详细信息</span>
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

    <Modal v-model="showAttentionAction" scrollable title="关注人员调整流程" width="1000" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <AttentionAuditView :rowData="this.selRow" :actionType="this.actionType"></AttentionAuditView>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList } from '@/api/base'
import { mixinInfo } from './common.js'
import { getFocusPersonAdjustFlowsList, deleteFocusPersonAdjustFlow } from '@/api/emp-manage/chg-attention'
import AttentionAuditView from '_c/chg-attention/attention-audit-view'

export default {
  components: {
    AttentionAuditView
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
        employeeNo: '',
        employeeName: '',
        flowNode: 0,
        nodeStatus: undefined,
        sponsorDate: []
      },
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      dataSet: [],
      deptEmpList: [],
      selRow: {},
      loadData: false,
      showSelectEmp: false,
      showAttentionAction: false,
      dataSaving: true,
      actionType: '', // view || create || modify
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
    },
    handleDateChange (val) {
      this.formData.sponsorDate = val
    },
    handleDeleteFlow (row, index) {
      const condition = {
        id: row.id
      }

      deleteFocusPersonAdjustFlow(condition).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '所选流程删除成功！',
            duration: 5
          })
          this.dataSet.splice(index, 1)
        }
      }).catch(() => {

      })
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
      this.loadData = true

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.employeeName = this.trimForText(this.formData.employeeName)
      const condition = {
        orderBy: 'create_time',
        orderType: 'desc',
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.employeeName !== '') {
        condition.employeeName = this.formData.employeeName
      }
      if (this.formData.flowNode && this.formData.flowNode !== 0) {
        condition.flowNode = this.formData.flowNode
      }
      if (this.formData.nodeStatus !== undefined) {
        condition.nodeStatus = this.formData.nodeStatus
      }
      if (this.formData.sponsorDate.length > 0 && this.formData.sponsorDate[0] !== '' && this.formData.sponsorDate[1] !== '') {
        condition.createTimeStart = this.formData.sponsorDate[0]
        condition.createTimeEnd = this.formData.sponsorDate[1]
      }

      getFocusPersonAdjustFlowsList(condition).then(res => {
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
    handleShowDetail (row, index) {
      this.selRow = Object.assign({}, { relatedId: row.id })
      this.actionType = 'view'
      this.showAttentionAction = true
    },
    handleSelectEmp () {
      this.showSelectEmp = true
    },
    handleInstChange (item) {
      if (item[0]) {
        item[0].expand = !item[0].expand
        item[0].selected = !item[0].selected

        if (item[0].is_emp) {
          this.formData.name = item[0].title
          this.formData.employeeNo = item[0].num
          this.showSelectEmp = false
        }
      }
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 230
    }
  },
  mounted () {
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
