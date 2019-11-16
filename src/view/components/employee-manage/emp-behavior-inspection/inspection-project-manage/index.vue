<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="50" inline>
          <FormItem label="年度" prop="lqlx">
            <DatePicker type="year" :options="optDate"
              @on-change="handleDateChange"
              :disabled="this.loadData"
              :clearable="false"
              :value="this.formData.date_value"
              style="width: 100px;margin-right: 10px;margin-left: 18px"
              :editable='false'></DatePicker>
          </FormItem>
          <FormItem label="状态" prop="lqlx" :label-width="50">
            <Select v-model="formData.lqlx" style="width:100px" :disable="this.loadData">
              <Option :value="0">全部</Option>
              <Option :value="1">待启动</Option>
              <Option :value="2">启动</Option>
              <Option :value="3">关闭</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="handleChgPageSize(1)" :loading="this.loadData">查询</Button>
              <Button type="primary" icon="ios-search" @click="handleCreateInspection" :loading="this.loadData">发起</Button>
              <Button type="primary" icon="ios-search" @click="handleParameterMng" :loading="this.loadData">参数管理</Button>
            </ButtonGroup>
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
    </Card>

    <Modal v-model="showInspectionAction" :loading="dataSaving" scrollable :title="actionTitle" width="700" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveChange">
      <InspectionAction @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow_="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></InspectionAction>
    </Modal>

    <Modal v-model="showInsParaMng" :loading="dataSaving" scrollable title="项目参数" width="700" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveChange">
      <InsParaMng @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow_="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></InsParaMng>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import InspectionAction from '_c/emp-behavior-inspection/inspection-action'
import InsParaMng from '_c/emp-behavior-inspection/inspection-parameter-mng'

export default {
  components: {
    InspectionAction,
    InsParaMng
  },
  mixins: [ mixinInfo ],
  data () {
    return {
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      formData: {
        employeeNo: '',
        name: ''
      },
      dataSet: [],
      loadData: false,
      showInspectionAction: false,
      showInsParaMng: false,
      dataSaving: true,
      actionTitle: '',
      actionType: '', // view || create || modify
      saveNow: false,
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {

    },
    handleParameterMng () {
      this.showInsParaMng = true
    },
    handleDateChange () {

    },
    handleCreateInspection () {
      this.actionType = 'create'
      this.actionTitle = '发起排查项目'
      this.showInspectionAction = true
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
    searchRd () {

    },
    handleShowDetail () {

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
