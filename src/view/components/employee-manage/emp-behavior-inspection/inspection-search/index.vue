<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="80" inline>
          <FormItem label="排查项目" prop="prjId">
            <Select v-model="formData.prjId" style="width:400px" @on-change="handleSelectPrjChg" :disable="this.loadData">
              <Option v-for="item in this.selPrj" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <Button type="primary" icon="md-refresh" @click="getPrjectData" :disabled="this.loadData"></Button>
        </Form>
        <Input type="textarea" v-model="formData.describe" style="width: 95%;margin-left: 80px;margin-top: 10px;margin-bottom: 10px;" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
        <Form ref ="form1" :model="formData" :label-width="80" inline>
          <FormItem label="员工工号" prop="employeeNo">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="employeeName">
            <Input type="text" v-model="formData.employeeName" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem label="所属机构" prop="deptCode">
            <Cascader style="width: 200px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.loadData"></Cascader>
          </FormItem>
          <FormItem label="人员类型" prop="employeeType">
            <Select v-model="formData.employeeType" style="width:100px" clearable :disable="this.loadData">
              <Option :value="1">本行员工</Option>
              <Option :value="2">编外人员</Option>
            </Select>
          </FormItem>
          <FormItem label="排查状态" prop="checkResult">
            <Select v-model="formData.checkResult" style="width:100px" clearable :disable="this.loadData">
              <Option :value="1">正常</Option>
              <Option :value="2">异常</Option>
            </Select>
          </FormItem>
          <ButtonGroup>
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </ButtonGroup>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet"
        @on-row-dblclick="handleInspectionCheck">
        <template slot-scope="{ row, index }" slot="action">
          <Poptip
            confirm
            title="你确认删除这条项目吗？"
            @on-ok="handleDeleteCheckRecord (row, index)">
            <Button type="error" size="small" :disabled="dataDealing || row.checkerNo != employeeNo()">删除</Button>
          </Poptip>
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

    <Modal v-model="showInspectionCheckin" scrollable title="排查登记" width="1000" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <InspectionCheckView :rowData="detailData"></InspectionCheckView>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInstEmpList, getInstList } from '@/api/base'
import { mixinInfo } from './common.js'
import { getEmpCheckProjectList, getEmpCheckedRecordList, deleteEmpCheckRecord } from '@/api/emp-manage/emp-behavior-inspection'
import { formatSelectOptionByDefine } from '@/libs/j-tools.js'
import InspectionCheckView from '_c/emp-behavior-inspection/inspection-checkin-view'

export default {
  components: {
    InspectionCheckView
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
        prjId: undefined,
        prjName: '',
        describe: '',
        employeeNo: '',
        employeeName: '',
        checkResult: undefined,
        employeeType: undefined,
        deptCode: []
      },
      prjData: [],
      selPrj: [],
      dataSet: [],
      dept_list: [],
      deptEmpList: [],
      loadData: false,
      showSelectEmp: false,
      showAddNonEmp: false,
      showInspectionCheckin: false,
      dataSaving: true,
      dataDealing: false,
      saveCheckin: false,
      initCheckinFlag: false,
      saveNonEmp: false,
      detailData: {},
      selNonEmp: {},
      actionType: '', // view || create || modify
      windowHeight: 0
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
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

      this.getPrjectData()
    },
    getPrjectData () {
      if (this.loadData) return
      this.loadData = true

      this.formData.prjId = undefined
      this.formData.describe = ''
      this.dataSet = []
      getEmpCheckProjectList({ status: 1 }).then(res => {
        if (res.data.code === '000000') {
          this.prjData = res.data.data.rows
          this.selPrj = formatSelectOptionByDefine(this.prjData, 'id', 'name')
        }
        this.loadData = false
      }).catch(() => {
        this.prjData = []
        this.selPrj = []
        this.loadData = false
      })
    },
    handleSelectPrjChg (item) {
      if (item) {
        this.formData.describe = this.prjData.find((v) => v.id === item).describe
        this.formData.prjName = this.prjData.find((v) => v.id === item).name
        this.handleChgPageSize(this.pageData.size, 1)
      }
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
    handleChgPageSize (size, current) {
      if (!this.formData.prjId) {
        this.$Message.warning({
          content: '请选择一个排查项目！',
          duration: 5
        })
        return
      }

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
        projectId: this.formData.prjId,
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.employeeName !== '') {
        condition.name = this.formData.employeeName
      }
      if (this.formData.deptCode && this.formData.deptCode.length > 0) {
        condition.deptCode = this.formData.deptCode[this.formData.deptCode.length - 1]
      }
      if (this.formData.checkResult || this.formData.checkResult === 0) {
        condition.checkResult = this.formData.checkResult
      }
      if (this.formData.employeeType || this.formData.employeeType === 0) {
        condition.employeeType = this.formData.employeeType
      }

      getEmpCheckedRecordList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data.rows
          this.pageData.total = res.data.data.total
          let index = 0
          for (let elem of this.dataSet.values()) {
            elem.index = index
            index++
          }
        }
        this.loadData = false
      }).catch(() => {
        this.dataSet = []
        this.loadData = false
      })
    },
    handleInspectionCheck (row, index) {
      this.detailData = Object.assign({}, row)
      this.initCheckinFlag = true
      this.$nextTick(() => {
        this.initCheckinFlag = false
      })
      this.showInspectionCheckin = true
    },
    handleDeleteCheckRecord (row, index) {
      this.dataDealing = true
      const condition = {
        id: row.id
      }

      deleteEmpCheckRecord(condition).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '删除数据成功！',
            duration: 3
          })
          this.dataSet.splice(index, 1)
        }

        this.dataDealing = false
      }).catch(() => {
        this.dataDealing = false
      })
    },
    handleSelectEmp () {
      this.showSelectEmp = true
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 380
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
