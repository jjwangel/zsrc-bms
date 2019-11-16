<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form-pp" :model="formData" inline>
          <FormItem label="排查项目" prop="pcxm" :label-width="80">
            <Select v-model="formData.pcxm" style="width:150px" :disable="this.loadData">
              <Option :value="0">全部</Option>
              <Option :value="1">待启动</Option>
              <Option :value="2">启动</Option>
              <Option :value="3">关闭</Option>
            </Select>
          </FormItem>
        </Form>
        <Input type="textarea" v-model="formData.xmsm" style="width: 95%;margin-left: 80px;margin-top: 10px;margin-bottom: 10px;" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
        <Form ref ="form-sbs" :model="formData" inline>
          <FormItem label="工号" prop="employeeNo" :label-width="80">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="姓名" prop="name" :label-width="80">
            <Input type="text" v-model="formData.name" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem label="所属机构" prop="dqzt" :label-width="80">
            <Cascader style="width: 200px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.loadData"></Cascader>
          </FormItem>
          <FormItem label="排查情况" prop="pczt" :label-width="80">
              <Select v-model="formData.pczt" style="width:100px" :disable="this.loadData">
                <Option :value="0">全部</Option>
                <Option :value="1">正常</Option>
                <Option :value="2">异常</Option>
              </Select>
            </FormItem>
          <ButtonGroup>
            <Button type="primary" icon="ios-search" @click="handleSearchRd" :loading="this.loadData">查询</Button>
          </ButtonGroup>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="handleSponsorAttention (row, index)">删除</Button>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="searchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>

      <Drawer title="选择员工" :closable="false" v-model="showSelectEmp" :transfer="false" inner placement="left">
        <Tree :data="deptEmpList" @on-select-change="handleInstChange"></Tree>
      </Drawer>
    </Card>

    <Modal v-model="showInspectionCheckin" :loading="dataSaving" scrollable title="排查登记" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveChange">
      <InspectionCheckin @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow_="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></InspectionCheckin>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList, getInstList } from '@/api/base'
import { mixinInfo } from './common.js'
import InspectionCheckin from '_c/emp-behavior-inspection/inspection-checkin'

export default {
  components: {
    InspectionCheckin
  },
  mixins: [ mixinInfo ],
  data () {
    return {
      optSelDate: {
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
      loadData: false,
      windowHeight: 0,
      dataSet: [],
      dept_list: [],
      deptEmpList: [],
      showSelectEmp: false,
      showInspectionAction: false,
      showAddNonEmp: false,
      showInspectionCheckin: false,
      dataSaving: true,
      actionTitle: '',
      actionType: '', // view || create || modify
      saveNow: false
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
    handleInspectionCheckBatch () {
      this.showInspectionCheckin = true
    },
    handleAddNonEmp () {
      this.showAddNonEmp = true
    },
    handleDateChange () {

    },
    handleCreateInspection () {
      this.actionType = 'create'
      this.actionTitle = '发起排查项目'
      this.showInspectionAction = true
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
        this.searchRd()
      })
    },
    handleSearchRd () {

    },
    searchRd () {

    },
    handleShowDetail () {

    },
    handleSelectEmp () {
      this.showSelectEmp = true
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
