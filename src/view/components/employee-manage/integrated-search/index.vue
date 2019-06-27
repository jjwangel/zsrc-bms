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
            <Cascader style="width: 230px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.load_data"></Cascader>
          </FormItem>
          <FormItem label="违规年度" prop="date_value" :label-width="80">
            <DatePicker type="year" :clearable="false" :disabled="this.load_data" v-model="formData.date_value" :editable='false' style="width:80px;"></DatePicker>
          </FormItem>
          <FormItem label="关注类别" prop="focusType" :label-width="80">
            <Select style="width:100px;" v-model="formData.focusType" :disabled="this.load_data">
              <Option value="-1">所有</Option>
              <Option value="1">重点关注</Option>
              <Option value="2">一般关注</Option>
              <Option value="3">正常</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleSearchRd" :loading="this.load_data">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-ss" :loading="this.load_data" :columns="col_list" :data="data_list">
        <template slot-scope="{ row, index }" slot="yearEcnoPushTotal">
          <span>{{ formatMoney(row.yearEcnoPushTotal) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="latestDebtTotal">
          <span>{{ formatMoney(row.latestDebtTotal) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="yearAssuBal">
          <span>{{ formatMoney(row.yearAssuBal) }}</span>
        </template>

        <div slot="footer" style="width:90%;text-align: center">
          <span style="float: left;margin-left: 10px">双击任意记录，显示详细信息</span>
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

    <Modal v-model="show_detail" scrollable :title="detailTitle" fullscreen footer-hide>
      <DetailInfo :main-data="this.detail_data"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { getEmpIntegratedList } from '@/api/emp-manage/emp-search'
import { getFormatDate, getStartToLastDate } from '@/libs/j-tools.js'
import { getInstEmpList, getInstList } from '@/api/base'
import DetailInfo from './detail-info.vue'
import { mixinInfo } from './common.js'

export default {
  components: {
    DetailInfo
  },
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
        date_value: '',
        focusType: '-1'
      },
      detailTitle: '',
      load_data: false,
      showSelectEmp: false,
      show_detail: false,
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
    handleShowDetail (row, index) {
      this.detailTitle = `详细内容（${row.employeeName} - ${row.employeeNo}）`
      this.show_detail = true
      this.detail_data = Object.assign({}, row, { year: this.formData.date_value.getFullYear().toString() })
    },
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchRd()
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
      let _date = getStartToLastDate('year', this.formData.date_value)
      const condition = {
        employeeNo: this.formData.employeeNo,
        name: this.formData.name,
        focusType: this.formData.focusType,
        startDate: _date[0],
        endDate: _date[1],
        page: this.pageData.current,
        pageSize: this.pageData.size,
        deptCode: this.formData.deptCode
      }

      getEmpIntegratedList(condition).then(res => {
        let data = res.data
        if (data.code === '000000') {
          this.data_list = data.data.rows
          this.pageData.total = data.data.total
          if (this.data_list.length === 0) {
            this.$Message.info({
              content: '找不到任何数据',
              duration: 3
            })
          }
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
    this.formData.date_value = getFormatDate('yyyy-MM-dd')
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
