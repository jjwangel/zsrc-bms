<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="80" inline>
          <FormItem label="员工工号" prop="employeeNo">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="name">
            <Input type="text" v-model="formData.name" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem label="当前状态" prop="dqzt">
            <Select v-model="formData.dqzt" style="width:100px" :disable="this.loadData">
              <Option :value="1">复核 </Option>
              <Option :value="2">审核</Option>
              <Option :value="3">审批</Option>
            </Select>
          </FormItem>
          <FormItem label="操作结果" prop="czjg">
            <Select v-model="formData.czjg" style="width:100px" :disable="this.loadData">
              <Option :value="1">同意 </Option>
              <Option :value="2">不同意</Option>
            </Select>
          </FormItem>
          <FormItem label="情况跟进登记日期" prop="fqtzrq" class="info_title" :label-width="130">
            <DatePicker type="daterange" placement="bottom-start"
              style="width: 200px;margin-right: 10px"
              :options="optDate"
              :clearable="false"
              :value="formData.fqtzrq"
              @on-change="handleDateChange"
              :editable='false'></DatePicker>
          </FormItem>

          <FormItem :label-width="10">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(1)" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleCreateAttention" :loading="this.loadData">详细（临时）</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="handleSponsorAttention (row, index)">删除</Button>
        </template>

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

    <Modal v-model="showAttentionAction" :loading="dataSaving" scrollable :title="actionTitle" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveChange">
      <FollowAuditView @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow_="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></FollowAuditView>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList } from '@/api/base'
import { mixinInfo } from './common.js'
import FollowAuditView from '_c/att-follow/follow-audit-view'

export default {
  components: {
    FollowAuditView
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
        name: ''
      },
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      dataSet: [],
      deptEmpList: [],
      loadData: false,
      showSelectEmp: false,
      showAttentionAction: false,
      dataSaving: true,
      saveNow: false,
      actionTitle: '',
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
    handleDateChange () {

    },
    handleCreateAttention () {
      this.actionType = 'create'
      this.actionTitle = '关注跟进复核/审批'
      this.showAttentionAction = true
    },
    handleSponsorAttention (row, index) {

    },
    handleSaveChange () {

    },
    handleSaveCancel () {

    },
    handleSaveSuccess () {

    },
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {

    },
    handleShowDetail () {

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
