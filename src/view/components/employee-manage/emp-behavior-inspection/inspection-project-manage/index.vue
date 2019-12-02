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
            <Button type="primary" size="small" :disabled="row.status !== 0 || dataDealing" @click="handleModifyData (row, index)">修改</Button>
          <Poptip
            confirm
            title="你确认删除这个项目吗？"
            @on-ok="handleDeleteProject (row, index)">
            <Button type="error" size="small" :disabled="row.status !== 0 || dataDealing">删除</Button>
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

    <Modal v-model="showInspectionAction" :loading="this.dataSaving" scrollable :title="dtlTitle" width="700" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveDetail">
      <InspectionAction @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow="saveNow" :rowData="this.detailRow" :actionType="this.actionType"></InspectionAction>
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
      newRow: {
        id: 0,
        name: '',
        year: undefined,
        startTime: '',
        endTime: '',
        seTime: [],
        projectStartTime: '',
        projectCloseTime: '',
        scTime: [],
        describe: ''
      },
      detailRow: {},
      dataSaving: true,
      dtlTitle: '',
      actionType: '', // view || create || modify
      saveNow: false,
      dataDealing: false,
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
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveCancel () {
      this.dataSaving = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    },
    handleSaveSuccess (isNew, rowIndex, data) {
      if (isNew) {
        this.dataSet.push({
          id: data.id,
          name: data.name,
          year: data.year,
          startTime: data.startTime,
          endTime: data.endTime,
          projectStartTime: data.projectStartTime,
          projectCloseTime: data.projectCloseTime,
          describe: data.describe,
          status: data.status
        })
      } else {
        this.dataSet[rowIndex].name = data.name
        this.dataSet[rowIndex].year = data.year
        this.dataSet[rowIndex].startTime = data.startTime
        this.dataSet[rowIndex].endTime = data.endTime
        this.dataSet[rowIndex].projectStartTime = data.projectStartTime
        this.dataSet[rowIndex].projectCloseTime = data.projectCloseTime
        this.dataSet[rowIndex].describe = data.describe
      }

      this.dataSaving = false
      this.showInspectionAction = false
      this.$nextTick(() => {
        this.dataSaving = true
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
    handleShowDetail (row, index) {
      this.actionType = 'view'
      this.dtlTitle = '排查项目（只读）'
      this.detailRow = Object.assign({}, row, { seTime: [row.startTime, row.endTime], scTime: [row.projectStartTime, row.projectCloseTime] })
      this.showInspectionAction = true
    },
    handleCreateInspection () {
      this.actionType = 'create'
      this.dtlTitle = '发起排查项目'
      this.detailRow = Object.assign({}, this.newRow)
      this.showInspectionAction = true
    },
    handleModifyData (row, index) {
      this.actionType = 'modify'
      this.dtlTitle = '排查项目（修改）'
      this.detailRow = Object.assign({}, row, { seTime: [row.startTime, row.endTime], scTime: [row.projectStartTime, row.projectCloseTime] })
      this.showInspectionAction = true
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
