<template>
  <div>
    <Tabs type="card" value="ep_import" :animated="false" name='tabs-ep'>
      <TabPane label="经济处罚导入" name="ep_import" tab="tabs-ep">
        <Card dis-hover>
          <div slot="title">
            <Form ref="formEP" :model="formData" :label-width="70" inline>
              <FormItem label="批次号" prop="batNum" class="info_title">
                <Input type="text" v-model="formData.batNum"></Input>
              </FormItem>
              <FormItem label="查询日期" prop="date_value" class="info_title">
                <DatePicker type="daterange" placement="bottom-start"
                  style="width: 200px;margin-right: 10px"
                  :clearable="false"
                  :value="formData.date_value"
                  @on-change="handleDateChange"
                  :editable='false'></DatePicker>
              </FormItem>
              <FormItem :label-width="0">
                <ButtonGroup>
                  <Button type="primary" icon="ios-search" :loading="this.load_data" @click='handleSearch'>查询</Button>
                  <Button type="primary" icon="md-cloud-upload" :disabled="this.load_data" @click='this.handleUpload'>批量新增</Button>
                  <Button type="success" icon="md-cloud-download" :disabled="this.load_data" :to="template_url" target="_blank">下载格式文件</Button>
                </ButtonGroup>
              </FormItem>
              </Form>
            </div>
          <Table size="small" :loading="this.load_data && !this.file_uploading" :stripe="true" border ref="tab-economic" :columns="col_economic" :data="data_economic">
            <template slot-scope="{ row, index }" slot="action">
              <Button v-show="row.batNum !== ''" type="error" :to="base_url + 'file/failexport/pushinfo?batNum=' + row.batNum" target="_blank" size="small" :disabled="row.impStatusText !== '失败'">下载</Button>
              <Progress v-show="row.batNum === ''" :percent="fileUploadPercnet" hide-info />
            </template>
          </Table>
        </Card>
      </TabPane>

      <TabPane label="经济处罚查询" name="ep_search" tab="tabs-ep">
        <Card dis-hover>
          <div slot="title">
            <Form :model="formEPRd" :label-width="80" inline>
              <FormItem label="导入日期" prop="date_value" class="info_title">
                <DatePicker type="daterange" placement="bottom-start"
                  style="width: 200px;margin-right: 10px"
                  :clearable="false"
                  :value="formEPRd.date_value"
                  @on-change="handleRdDateChange"
                  :editable='false'></DatePicker>
              </FormItem>
              <FormItem label="员工工号" prop="employeeNo" class="info_title">
                <Input v-model="formEPRd.employeeNo" type="text" style="width:100px"></Input>
              </FormItem>
              <FormItem label="员工姓名" prop="employeeName" class="info_title">
                <Input v-model="formEPRd.employeeName" type="text" style="width:100px"></Input>
              </FormItem>
              <FormItem label="所属机构" prop="dqzt">
                <Cascader style="width: 200px" :data="dept_list" v-model="formEPRd.deptCode" trigger="hover" :disabled="this.load_data_rd"></Cascader>
              </FormItem>
              <FormItem :label-width="10">
                <ButtonGroup>
                  <Button type="primary" icon="ios-search" :loading="this.load_data_rd" @click='handleSearchEPRd'>查询</Button>
                  <Button Button type="success" icon="md-cloud-download"
                    :to="downloadUrl + downloadPara" target="_blank"
                    @click="handleDownloadEP"
                    :loading="this.downloading">导出</Button>
                </ButtonGroup>
              </FormItem>
            </Form>
          </div>
          <Table size="small" @on-row-dblclick="handleShowDetail" :height="windowHeight" :loading="this.load_data_rd" :stripe="true" border ref="tab-ep-rd" :columns="col_ep_rd" :data="data_ep_rd">
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" @click="handleModifyData (row, index)">修改</Button>
              <Poptip
                confirm
                title="你确认删除这条内容吗？"
                @on-ok="handleDelData (row, index)">
                <Button type="error" size="small" :disabled="data_deleteing">删除</Button>
              </Poptip>
            </template>

            <div slot="footer" style="width:100%;text-align: center">
              <Page :total="pageData.total" :current.sync="pageData.current"
                @on-change="searchEPRd"
                @on-page-size-change="handleChgPageSize"
                size="small" show-elevator show-sizer />
            </div>
          </Table>
        </Card>
      </TabPane>
    </Tabs>

    <Upload :action="this.file_upload_url" ref="batImp" v-show="false"
      :data="this.uploadData"
      :with-credentials="true"
      :on-format-error="handleFileFormatErr"
      :on-success="handleUploadSuccess"
      :show-upload-list="false"
      :on-progress="handleFileProgress"
      :before-upload="handleBefUpload"
      :on-error="handleUploadErr"
      :format="['xlsx','xls']">
    </Upload>

    <Modal v-model="show_select_year" scrollable  width="300" ok-text="确定" :mask-closable="false"
      title="选择数据年度"
      @on-ok="handleSubmitYear">
      <Form :label-width="80">
        <FormItem label="数据年度" class="info_title">
          <DatePicker type="year" :value="this.dataYear" @on-change="handleDataYearChange" :editable="false" style="width:90%;" :clearable="false">
          </DatePicker>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="show_detail" :loading="data_saving" :styles="{top: '0px'}"
      scrollable :title="this.detail_title" width="800" ok-text="提交"
      :mask-closable="this.action === 'view'"
      :footer-hide="this.action === 'view'"
      @on-ok="handleSaveDetail">
      <DetailInfo @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveData="saveNow" :rowData="this.detail_row" :action="this.action"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import DetailInfo from './detail-info.vue'
import { getInstList } from '@/api/base'
import { mapGetters } from 'vuex'
import { getMainImportList, getEmpEconomicPunishList, deleteEmpEconomicPunish } from '@/api/emp-manage/emp-import'
import { getStartToLastDate, getFormatDate } from '@/libs/j-tools.js'
import { col_economic, mixinInfo } from './common.js'
import { setToken } from '@/libs/util'
import config from '@/config'
export default {
  components: {
    DetailInfo
  },
  mixins: [mixinInfo],
  data () {
    return {
      show_select_year: false,
      dataYear: '',
      uploadData: {},
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      formData: {
        employeeNo: this.employeeNo(),
        date_value: [],
        impType: '2',
        batNum: ''
      },
      formEPRd: {
        date_value: [],
        employeeNo: '',
        employeeName: '',
        deptCode: []
      },
      dept_list: [],
      template_url: '',
      file_upload_url: '',
      base_url: '',
      fileUploadPercnet: 0,
      file_uploading: false,
      windowHeight: 0,
      load_data: false,
      show_detail: false,
      load_data_rd: false,
      downloading: false,
      data_deleteing: false,
      data_saving: true,
      saveNow: false,
      downloadUrl: '',
      downloadPara: '',
      detail_title: '',
      action: '', // view || modify
      detail_row: {},
      col_economic,
      data_economic: [],
      data_ep_rd: []
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchEPRd()
      })
    },
    initInfo () {
      getInstList().then(res => {
        if (res.data.code === '000000') {
          this.dept_list = res.data.data
        }
      }).catch(() => {

      })
    },
    handleSubmitYear () {
      this.uploadData = { 'year': new Date(this.dataYear).getFullYear() }
      this.$refs.batImp.handleClick()
    },
    handleDataYearChange (val) {
      this.dataYear = val
    },
    handleRdDateChange (val) {
      this.formEPRd.date_value = val
    },
    handleShowDetail (row, index) {
      this.action = 'view'
      this.detail_title = '详细内容（只读）'
      this.detail_row = row
      this.show_detail = true
    },
    handleModifyData (row, index) {
      this.action = 'modify'
      this.detail_title = '详细内容（修改）'
      this.detail_row = row
      this.show_detail = true
    },
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveSuccess (rowIndex, data) {
      this.data_ep_rd[rowIndex].pushDate = data.pushDate
      this.data_ep_rd[rowIndex].pushBal = data.pushBal
      this.data_ep_rd[rowIndex].pushAcc = data.pushAcc
      this.data_ep_rd[rowIndex].pushDesc = data.pushDesc
      this.data_ep_rd[rowIndex].pushOrg = data.pushOrg
      this.data_ep_rd[rowIndex].bz = data.bz
      this.data_ep_rd[rowIndex].updateUser = data.updateUser
      this.data_ep_rd[rowIndex].updateUserName = data.updateUserName
      this.data_ep_rd[rowIndex].updateTime = data.updateTime

      this.data_saving = false
      this.show_detail = false
      this.$nextTick(() => {
        this.data_saving = true
      })
    },
    handleSaveCancel () {
      this.data_saving = false
      this.$nextTick(() => {
        this.data_saving = true
      })
    },
    handleDownloadEP () {
      if (this.downloading) return
      this.downloading = true
      this.downloadPara = ''
      if (this.formEPRd.employeeNo !== '') {
        this.downloadPara = `employeeNo=${this.formEPRd.employeeNo}`
      }
      if (this.formEPRd.employeeName !== '') {
        this.downloadPara = `name=${this.formEPRd.employeeName}`
      }
      if (this.formEPRd.deptCode && this.formEPRd.deptCode.length > 0) {
        this.downloadPara = `deptCode=${this.formEPRd.deptCode[this.formEPRd.deptCode.length - 1]}`
      }
      this.downloadPara = `${this.downloadPara}&impDateStart=${this.formEPRd.date_value[0]}`
      this.downloadPara = `${this.downloadPara}&impDateEnd=${this.formEPRd.date_value[1]}`

      this.$Message.info({
        content: '正在生成数据，请稍候......',
        duration: 5
      })

      setTimeout(() => {
        this.downloading = false
      }, 5000)
    },
    handleSearchEPRd () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchEPRd()
      })
    },
    searchEPRd () {
      if (this.load_data_rd) return
      this.load_data_rd = true

      this.formEPRd.employeeNo = this.trimForText(this.formEPRd.employeeNo)
      this.formEPRd.name = this.trimForText(this.formEPRd.name)
      const condition = {
        impDateStart: this.formEPRd.date_value[0],
        impDateEnd: this.formEPRd.date_value[1],
        page: this.pageData.current,
        pageSize: this.pageData.size
      }

      if (this.formEPRd.employeeNo !== '') {
        condition.employeeNo = this.formEPRd.employeeNo
      }
      if (this.formEPRd.employeeName !== '') {
        condition.name = this.formEPRd.employeeName
      }
      if (this.formEPRd.deptCode && this.formEPRd.deptCode.length > 0) {
        condition.deptCode = this.formEPRd.deptCode[this.formEPRd.deptCode.length - 1]
      }

      getEmpEconomicPunishList(condition).then(res => {
        let { epData } = res
        if (epData.data.code === '000000') {
          this.data_ep_rd = epData.data.data.rows
          this.pageData.total = epData.data.data.total
        }
        this.load_data_rd = false
      }).catch(() => {
        this.data_ep_rd = []
        this.load_data_rd = false
      })
    },
    handleDelData (row, index) {
      if (this.data_deleteing) return
      this.data_deleteing = true

      const condition = {
        id: row.id
      }

      deleteEmpEconomicPunish(condition).then(res => {
        let data = res.data

        if (data) {
          if (data.code === '000000') {
            this.data_ep_rd.splice(index, 1)
            this.$Message.success({
              content: '数据删除成功！',
              duration: 3
            })
          }
        }
        this.data_deleteing = false
      }).catch(() => {
        this.data_deleteing = false
      })
    },
    handleUpload () {
      this.show_select_year = true
    },
    handleSearch () {
      if (this.load_data) return
      this.load_data = true

      this.formData.batNum = this.trimForText(this.formData.batNum)
      const condition = {
        impDateStart: this.formData.date_value[0],
        impDateEnd: this.formData.date_value[1],
        impType: this.formData.impType,
        batNum: this.formData.batNum,
        orderBy: 'bat_num',
        orderType: 'desc'
      }

      getMainImportList(condition).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_economic = data.data
            this.data_economic.forEach(function (val) {
              val.errorRecord = (val.totalRecord || 0) - (val.successRecord || 0)
            })
          }
        }
        this.load_data = false
      }).catch(() => {
        this.data_economic = []
        this.load_data = false
      })
    },
    handleDateChange (val) {
      this.formData.date_value = val
    },
    handleBefUpload (file) {
      this.$Modal.confirm({
        title: '上传批量文件',
        content: `确定上传文件：${file.name} 吗？`,
        onOk: () => {
          this.$refs.batImp.post(file)
          this.file_uploading = true
          this.load_data = true
          this.data_economic.unshift({ batNum: '', impStatusText: '上传中' })
        }
      })
      return false
      // this.file_uploading = true
      // this.load_data = true
      // this.data_economic.unshift({ batNum: '', impStatusText: '上传中' })
    },
    handleFileProgress (event, file, fileList) {
      this.fileUploadPercnet = event.percent
    },
    handleUploadSuccess (res, file) {
      if (res.code === '000000') {
        this.data_economic[0].batNum = res.data.batNum
        this.data_economic[0].impDate = res.data.impDate
        this.data_economic[0].impName = res.data.impName
        this.data_economic[0].impStatusText = res.data.impStatusText

        this.$Message.success({
          content: '上传文件成功！',
          duration: 3
        })
      } else {
        if (res.code === '003101') {
          this.$Message.warning({
            content: '登录超时，请重新登录',
            duration: 5
          })
          setToken('')
          this.$router.push({
            name: 'login'
          })
        } else {
          this.$Message.error({
            content: `上传文件失败：${res.message}(${res.code})`,
            duration: 3
          })
        }
      }

      this.file_uploading = false
      this.load_data = false
    },
    handleUploadErr () {
      this.$Message.error({
        content: '上传文件失败！',
        duration: 3
      })
    },
    handleFileFormatErr (file) {
      this.data_economic.splice(0, 1)
      this.$Notice.warning({
        title: '文格式错误',
        desc: file.name + ' 不是 xls 或 xlsx 格式'
      })
      this.file_uploading = false
      this.load_data = false
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 270
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
    this.template_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro_static : config.baseUrl.dev_static) + 'template/经济处罚信息导入模板.xlsx'
    this.file_upload_url = this.base_url + config.fileUploadUrl.infoImport + '/pushinfo'
    this.downloadUrl = this.base_url + 'emppushinfos/export?'
    this.formData.date_value = getStartToLastDate('year')
    this.formEPRd.date_value = getStartToLastDate('year')
    this.dataYear = getFormatDate('yyyy-MM-dd')
    this.initInfo()
    this.handleSearch()
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
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
