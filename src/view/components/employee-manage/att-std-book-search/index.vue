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
          <FormItem label="所属机构" prop="dqzt">
            <Cascader style="width: 300px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.loadData"></Cascader>
          </FormItem>
        </Form>
        <Form ref ="form2" :model="formData" :label-width="80" inline>
          <FormItem label="关注类别" prop="focusType">
            <Select v-model="formData.focusType" clearable style="width:100px" :disable="this.loadData">
              <Option :value="1">重点关注</Option>
              <Option :value="2">一般关注</Option>
            </Select>
          </FormItem>
          <FormItem label="台账状态" prop="bookStatus">
            <Select v-model="formData.bookStatus" clearable style="width:130px" :disable="this.loadData">
              <Option :value="0">关闭</Option>
              <Option :value="1">激活</Option>
            </Select>
          </FormItem>
          <FormItem label="关注类型" prop="focusItem">
            <Select v-model="formData.focusItem" clearable :label-in-value="true" style="width:300px">
              <Option v-for="item in this.selFocusItem" :value="item.value" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
              <Button type="success" icon="md-cloud-download"
                :to="downloadUrl + downloadPara" target="_blank"
                @click="handleDownloadBooks"
                :loading="this.downloading">导出台账</Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
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

    <Modal v-model="showFocusBookRecord" scrollable title="个人关注台账" width="1050" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <AttStdBookContent :rowData="this.selRow"></AttStdBookContent>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList, getInstList, getSingleSelectOptionData } from '@/api/base'
import { getFocusBooksList } from '@/api/emp-manage/attention-book'
import { formatSingleSelectOption } from '@/libs/j-tools.js'
import { mixinInfo } from './common.js'
import AttStdBookContent from '_c/att-std-book-search'

export default {
  components: {
    AttStdBookContent
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
        focusType: this.$route.params.focusType,
        bookStatus: undefined,
        focusItem: '',
        deptCode: []
      },
      selRow: {},
      dataSet: [],
      deptEmpList: [],
      dept_list: [],
      selFocusItem: [],
      loadData: false,
      showSelectEmp: false,
      showFocusBookRecord: false,
      dataSaving: true,
      windowHeight: 0,
      downloading: false,
      downloadUrl: '',
      base_url: '',
      downloadPara: ''
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

      getSingleSelectOptionData({ type: 'FOCUS_ITEM' }).then(res => {
        if (res.data.code === '000000') {
          this.selFocusItem = formatSingleSelectOption(res.data.data)
        }
      }).catch(() => {

      })

      if (this.formData.focusType) {
        this.handleChgPageSize(this.pageData.size, 1)
      }
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
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.employeeName !== '') {
        condition.employeeName = this.formData.employeeName
      }
      if (this.formData.focusType) {
        condition.focusType = this.formData.focusType
      }
      if (this.formData.bookStatus || this.formData.bookStatus === 0) {
        condition.bookStatus = this.formData.bookStatus
      }
      if (this.formData.focusItem && this.formData.focusItem !== '') {
        condition.focusItem = this.formData.focusItem
      }
      if (this.formData.deptCode && this.formData.deptCode.length > 0) {
        condition.deptCode = this.formData.deptCode[this.formData.deptCode.length - 1]
      }

      getFocusBooksList(condition).then(res => {
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
      this.selRow = Object.assign({}, row)
      this.showFocusBookRecord = true
    },
    handleSelectEmp () {
      this.showSelectEmp = true
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
    handleDownloadBooks () {
      if (this.downloading) return
      this.downloading = true

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.employeeName = this.trimForText(this.formData.employeeName)
      this.downloadPara = ''
      if (this.formData.employeeNo !== '') {
        this.downloadPara = `employeeNo=${this.formData.employeeNo}`
      }
      if (this.formData.employeeName !== '') {
        this.downloadPara = `${this.downloadPara}&employeeName=${this.formData.employeeName}`
      }
      if (this.formData.focusType) {
        this.downloadPara = `${this.downloadPara}&focusType=${this.formData.focusType}`
      }
      if (this.formData.bookStatus || this.formData.bookStatus === 0) {
        this.downloadPara = `${this.downloadPara}&bookStatus=${this.formData.bookStatus}`
      }
      if (this.formData.focusItem && this.formData.focusItem !== '') {
        this.downloadPara = `${this.downloadPara}&bookStatus=${this.formData.focusItem}`
      }
      if (this.formData.deptCode && this.formData.deptCode.length > 0) {
        this.downloadPara = `${this.downloadPara}&deptCode=${this.formData.deptCode[this.formData.deptCode.length - 1]}`
      }

      this.$Message.info({
        content: '正在生成数据，请稍候......',
        duration: 5
      })

      setTimeout(() => {
        this.downloading = false
      }, 5000)
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 260
    },
    maxTagPlaceholder (num) {
      return '+' + num
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? this.$config.baseUrl.pro : this.$config.baseUrl.dev)
    this.downloadUrl = this.base_url + 'focusbooks/export?'
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
