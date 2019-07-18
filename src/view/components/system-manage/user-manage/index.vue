<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form-ss" :model="formData" :label-width="60" inline>
          <FormItem label="工号" prop="employeeNo" :label-width="50">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.load_data" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="姓名" prop="name" :label-width="50">
            <Input type="text" v-model="formData.name" :readonly="this.load_data" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.load_data"></Button>
            </Input>
          </FormItem>
          <FormItem label="所属机构" prop="deptCode" :label-width="80">
            <Cascader style="width: 300px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.load_data"></Cascader>
          </FormItem>
          <FormItem :label-width="20">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="handleSearchRd" :loading="this.load_data || this.reseting">查询</Button>
              <Button type="success" icon="md-sync" @click="handleResetPwd" :loading="this.reseting || this.load_data">重置密码</Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" :stripe="true" border ref="tableSS" :loading="this.load_data" :columns="col_list" :data="data_list"
        @on-select="handleOnSelect"
        @on-select-cancel="handleOnSelectCancel"
        @on-select-all="handleOnSelectAll"
        @on-select-all-cancel="handleOnSelectAllCancel">
        <div slot="footer" style="width:90%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current"
            @on-change="searchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>

      <Drawer title="选择员工" :closable="false" v-model="showSelectEmp" :transfer="false" inner placement="left">
        <Tree :data="dept_emp_list" @on-select-change="handleInstChange"></Tree>
      </Drawer>
    </Card>
  </div>
</template>

<script>
import { getInstEmpList, getInstList, getEmployeesDetail, resetLoginPwd } from '@/api/base'
import { mixinInfo } from './common.js'

export default {
  mixins: [mixinInfo],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      formData: {
        employeeNo: '',
        name: '',
        deptCode: [],
        employeeNos: []
      },
      load_data: false,
      reseting: false,
      showSelectEmp: false,
      windowHeight: 0,
      detail_data: {},
      data_list: [],
      dept_emp_list: [],
      dept_list: []
    }
  },
  methods: {
    initInfo () {
      const condition = {
        employee: true
      }

      getInstEmpList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dept_emp_list = res.data.data
        }
      }).catch(() => {

      })

      getInstList().then(res => {
        if (res.data.code === '000000') {
          this.dept_list = res.data.data
        }
      }).catch(() => {

      })

      this.searchRd()
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
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchRd()
      })
    },
    handleOnSelect (sel, row) {
      this.setSelectRowId(sel)
    },
    handleOnSelectCancel (sel, row) {
      this.setSelectRowId(sel)
    },
    handleOnSelectAll (sel) {
      this.setSelectRowId(sel)
    },
    handleOnSelectAllCancel (sel) {
      this.setSelectRowId(sel)
    },
    setSelectRowId (sel) {
      this.formData.employeeNos = []
      if (sel.length > 0) {
        for (let item of sel.values()) {
          this.formData.employeeNos.push(item.employeeNo)
        }
      }
    },
    handleResetPwd () {
      if (this.formData.employeeNos.length === 0) {
        this.$Message.warning({
          content: '请选择需要重置密码的员工！',
          duration: 5
        })
      } else {
        this.$Modal.confirm({
          title: '重置密码',
          content: '确定重置密码吗？',
          onOk: this.resetPwd
        })
      }
    },
    resetPwd () {
      if (this.reseting) return
      this.reseting = true
      const condition = this.formData.employeeNos.map((val, index) => { return { employeeNo: val, password: '' } })

      resetLoginPwd(condition).then(res => {
        let data = res.data
        if (data.code === '000000') {
          this.$refs.tableSS.selectAll(false)
          this.$Message.info({
            content: '重置密码成功！初始密码为身份证后六位',
            duration: 5
          })
        } else {
          this.$Message.error({
            content: `重置密码失败：${data.message}(${data.code})`,
            duration: 5
          })
        }
        this.reseting = false
      }).catch(() => {
        this.reseting = false
      })
    },
    handleSearchRd () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchRd()
      })
    },
    searchRd () {
      if (this.load_data) return
      this.load_data = true

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.name = this.trimForText(this.formData.name)

      const condition = {
        employeeNo: this.formData.employeeNo,
        name: this.formData.name,
        orderBy: 'employee_type',
        orderType: 'desc',
        fuzzy: 'true',
        page: this.pageData.current,
        pageSize: this.pageData.size,
        deptCode: this.formData.deptCode.length > 0 ? this.formData.deptCode[this.formData.deptCode.length - 1] : ''
      }

      getEmployeesDetail(condition).then(res => {
        let data = res.data
        if (data.code === '000000') {
          this.data_list = data.data.rows
          this.pageData.total = data.data.total
        }
        this.load_data = false
      }).catch(() => {
        this.data_list = []
        this.load_data = false
      })
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
