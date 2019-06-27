<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref="form-cv" :model="formData" :label-width="100" inline>
          <FormItem label="员工工号" prop="employeeNo" :label-width="80">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.refreshing" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="name" :label-width="80">
            <Input type="text" v-model="formData.name" :readonly="this.refreshing" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.refreshing"></Button>
            </Input>
          </FormItem>
          <FormItem label="报告状态" prop="credStatu" :label-width="80">
            <Select v-model="formData.credStatu" style="width:100px" :disable="this.refreshing">
              <Option :value="1">未审核 </Option>
              <Option :value="2">已审核</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleSearchRpt" :loading="this.refreshing">查询</Button>
          </FormItem>
        </Form>
      </div>
      <Table size="small" :height="windowHeight" :highlight-row="true" :stripe="true" border ref="credit-vf" :columns="col_credit" :data="data_credit"
        :loading="this.refreshing"
        @on-row-dblclick="handleShowDetail">

        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current"
            @on-change="searchRpt"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>

      <Drawer title="选择员工" :closable="false" v-model="showSelectEmp" :transfer="false" inner placement="left">
        <Tree :data="data_inst" @on-select-change='handleInstChange'></Tree>
      </Drawer>

    </Card>

    <Modal v-model="show_detail" scrollable :title="detail_title" fullscreen footer-hide>
      <DetailInfo @verifySuccess="handleVerifySuccess" :row-data="this.detail_row"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import { getCreditByVerify } from '@/api/emp-manage/credit-verify'
import { getInstEmpList } from '@/api/base'
import DetailInfo from './detail-info.vue'
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
        credStatu: 1
      },
      detail_row: {},
      detail_title: '',
      show_detail: false,
      refreshing: false,
      showSelectEmp: false,
      data_inst: [],
      data_credit: [],
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
          this.data_inst = res.data.data
        }
      }).catch(() => {

      })
    },
    handleShowDetail (row, index) {
      this.detail_title = `征信报告详细内容 （${row.credStatuText}）`
      this.detail_row = Object.assign({}, row, { _index: index })
      this.show_detail = true
    },
    handleVerifySuccess (rowIndex) {
      this.data_credit[rowIndex].credStatuText = '已审核'
      this.detail_title = '征信报告详细内容 （已审核）'
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
        this.searchRpt()
      })
    },
    handleSearchRpt () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchRpt()
      })
    },
    searchRpt () {
      if (this.refreshing) return
      this.refreshing = true

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.name = this.trimForText(this.formData.name)
      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size,
        credStatu: this.formData.credStatu
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.name !== '') {
        condition.employeeName = this.formData.name
      }

      getCreditByVerify(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_credit = res.data.data.rows
          this.pageData.total = res.data.data.total
        }
        this.refreshing = false
      }).catch(() => {
        this.data_credit = []
        this.refreshing = false
      })
    },
    handleSelectEmp () {
      this.showSelectEmp = true
    },
    handleShowUploadCredit () {
      this.showUploadCredit = true
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 230
    }
  },
  created () {
    window.addEventListener('resize', this.setWindowHeight)
    this.setWindowHeight()
  },
  mounted () {
    this.initInfo()
    this.searchRpt()
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
