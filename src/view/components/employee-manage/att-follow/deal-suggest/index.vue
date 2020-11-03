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
          <FormItem label="所属机构" prop="deptCode" :label-width="80">
            <Cascader style="width: 200px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.loadData"></Cascader>
          </FormItem>
          <FormItem label="流程创建时间" prop="createDate" class="info_title" :label-width="110">
            <DatePicker type="daterange" placement="bottom-start"
              style="width: 200px;"
              :options="optDate"
              :value="formData.createDate"
              @on-change="handleDateChange"
              :editable='false'></DatePicker>
          </FormItem>
          <FormItem label="处置建议" prop="existAdvise">
            <Select v-model="formData.existAdvise" style="width:100px" :disable="this.loadData">
              <Option :value="1">已建议</Option>
              <Option :value="0">未建议</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="5">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button @click="handleShowDetail (row, index)" type="success" size="small">建议</Button>
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

    <Modal v-model="showFollowSuggest" :loading="dataSaving" scrollable title="关注人员跟进处置建议" width="1000" :styles="{top: '10px'}"
      ok-text="提交"
      :mask-closable="false"
      @on-ok="handleSaveChange">
      <FollowSuggest @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow="saveNow" :rowData="this.selFollowRow"></FollowSuggest>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList, getInstList } from '@/api/base'
import { mixinInfo } from './common.js'
import FollowSuggest from '_c/att-follow/follow-suggest'
import { getFocusPersonFollows } from '@/api/emp-manage/follow-attention'

export default {
  components: {
    FollowSuggest
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
        approveStatus: 1,
        existAdvise: 0,
        createDate: [],
        deptCode: []
      },
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      dept_list: [],
      selFollowRow: {},
      dataSet: [],
      deptEmpList: [],
      loadData: false,
      dataSaving: true,
      showSelectEmp: false,
      showFollowSuggest: false,
      saveNow: false,
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
    handleDateChange (val) {
      this.formData.createDate = val
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
      condition.existAdvise = this.formData.existAdvise
      if (this.formData.deptCode.length > 0) {
        condition.deptCode = this.formData.deptCode[this.formData.deptCode.length - 1]
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.employeeName !== '') {
        condition.employeeName = this.formData.employeeName
      }
      if (this.formData.approveStatus && this.formData.approveStatus !== 0) {
        condition.approveStatus = this.formData.approveStatus
      }
      if (this.formData.createDate.length > 0 && this.formData.createDate[0] !== '' && this.formData.createDate[1] !== '') {
        condition.createTimeStart = this.formData.createDate[0]
        condition.createTimeEnd = this.formData.createDate[1]
      }

      getFocusPersonFollows(condition).then(res => {
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
      this.showFollowSuggest = true
      this.selFollowRow = Object.assign({}, row, { _index: index })
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
    handleSaveChange () {
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
    handleSaveSuccess (data) {
      this.dataSet.splice(data.index, 1)
      this.dataSaving = false
      this.showFollowSuggest = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
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
