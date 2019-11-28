<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="50" inline>
          <FormItem label="年度" prop="prjYear">
            <DatePicker type="year" :options="optDate" clearable
              @on-change="handleDateChange"
              :disabled="this.loadData"
              :value="this.formData.prjYear"
              style="width: 100px;margin-right: 10px;margin-left: 18px"
              :editable='false'></DatePicker>
          </FormItem>
          <FormItem label="状态" prop="status" :label-width="50">
            <Select v-model="formData.status" clearable style="width:100px" :disable="this.loadData">
              <Option :value="0">待启动</Option>
              <Option :value="1">正常</Option>
              <Option :value="2">关闭</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
              <Button type="primary" icon="ios-search" @click="handleCreateInspection" :loading="this.loadData">发起</Button>
              <Button type="primary" icon="ios-search" @click="handleParameterMng" :loading="this.loadData">参数管理</Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Poptip
            confirm
            title="你确认删除个项目吗？"
            @on-ok="handleDeleteProject (row, index)">
            <Button type="error" size="small" :disabled="row.status !== 0">删除</Button>
          </Poptip>
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

    <Modal v-model="showInsParaMng" scrollable title="项目参数" width="700" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <InsParaMng></InsParaMng>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import { getEmpCheckProjectList, deleteEmpCheckProject } from '@/api/emp-manage/emp-behavior-inspection'
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
        prjYear: undefined,
        status: undefined
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
    handleDateChange (val) {
      this.formData.prjYear = val
    },
    handleCreateInspection () {
      this.actionType = 'create'
      this.actionTitle = '发起排查项目'
      this.showInspectionAction = true
    },
    handleDeleteProject (row, index) {
      const condition = {
        id: row.id
      }

      deleteEmpCheckProject(condition).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '所选项目删除成功！',
            duration: 5
          })
          this.dataSet.splice(index, 1)
        }
      }).catch(() => {

      })
    },
    handleSaveChange () {

    },
    handleSaveCancel () {

    },
    handleSaveSuccess () {

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

      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.prjYear && this.formData.prjYear !== '') {
        condition.year = this.formData.prjYear
      }
      if (this.formData.status || this.formData.status === 0) {
        condition.status = this.formData.status
      }

      getEmpCheckProjectList(condition).then(res => {
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
