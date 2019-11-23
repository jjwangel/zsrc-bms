<template>
  <div>
    <Tabs type="card" value="family_import" :animated="false" name='tabs-family'>
      <TabPane label="家访记录导入" name="family_import" tab="tabs-family">
        <Card dis-hover>
          <div slot="title">
            <Form ref="formFV" :model="formData" :label-width="70" inline>
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
          <Table size="small" :loading="this.load_data && !this.file_uploading" :stripe="true" border ref="tab-family-imp" :columns="col_family_imp" :data="data_family_imp">
            <template slot-scope="{ row, index }" slot="action">
              <Button v-show="row.batNum !== ''" type="error" :to="base_url + 'file/failexport/hocainfo?batNum=' + row.batNum" target="_blank" size="small" :disabled="row.impStatusText !== '失败'">下载</Button>
              <Progress v-show="row.batNum === ''" :percent="fileUploadPercnet" hide-info />
            </template>
          </Table>
        </Card>
      </TabPane>

      <TabPane label="家访记录查询" name="family_search" tab="tabs-family">
        <Card dis-hover>
          <div slot="title">
            <Form :model="formFamilyRd" :label-width="80" inline>
              <FormItem label="家访日期" prop="date_value" class="info_title">
                <DatePicker type="daterange" placement="bottom-start"
                  style="width: 200px;margin-right: 10px"
                  :clearable="false"
                  :value="formFamilyRd.date_value"
                  @on-change="handleRdDateChange"
                  :editable='false'></DatePicker>
              </FormItem>
              <FormItem label="存在异常" prop="unconvType" class="info_title">
                <Select v-model="formFamilyRd.unconvType" style="width:80px;">
                  <Option value="-1">全部</Option>
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              </FormItem>
              <FormItem label="员工工号" prop="employeeNo" class="info_title">
                <Input v-model="formFamilyRd.employeeNo" type="text"></Input>
              </FormItem>
              <FormItem :label-width="10">
                <ButtonGroup>
                  <Button type="primary" icon="ios-search" :loading="this.load_data_rd" @click='handleSearchFamilyRd'>查询</Button>
                </ButtonGroup>
              </FormItem>
            </Form>
          </div>
          <Table size="small" @on-row-dblclick="handleShowDetail" :height="windowHeight" :loading="this.load_data_rd" :stripe="true" border ref="tab-family-rd" :columns="col_family_rd" :data="data_family_rd">
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
                @on-change="searchFamilyRd"
                @on-page-size-change="handleChgPageSize"
                size="small" show-elevator show-sizer />
            </div>
          </Table>
        </Card>
      </TabPane>
    </Tabs>

    <Modal v-model="show_detail" :loading="data_saving" :styles="{top: '0px'}"
      scrollable :title="this.detail_title" width="800" ok-text="提交"
      :mask-closable="this.action === 'view'"
      :footer-hide="this.action === 'view'"
      @on-ok="handleSaveDetail">
      <DetailInfo @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveData="saveNow" :rowData="this.detail_row" :action="this.action"></DetailInfo>
    </Modal>

    <Upload :action="this.file_upload_url" ref="batImp" v-show="false"
      :with-credentials="true"
      :on-format-error="handleFileFormatErr"
      :on-success="handleUploadSuccess"
      :show-upload-list="false"
      :on-progress="handleFileProgress"
      :before-upload="handleBefUpload"
      :on-error="handleUploadErr"
      :format="['xlsx','xls']">
    </Upload>
  </div>
</template>

<script>
import DetailInfo from './detail-info.vue'
import { col_family_imp, mixinInfo } from './common.js'
import { mapGetters } from 'vuex'
import { getMainImportList, getEmpFamilyVisitList, deleteEmpFamilyVisit } from '@/api/emp-manage/emp-import'
import { getStartToLastDate } from '@/libs/j-tools.js'
import { setToken } from '@/libs/util'
import config from '@/config'
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
        employeeNo: this.employeeNo(),
        date_value: [],
        impType: '7',
        batNum: ''
      },
      formFamilyRd: {
        date_value: [],
        unconvType: '-1',
        employeeNo: ''
      },
      template_url: '',
      file_upload_url: '',
      base_url: '',
      fileUploadPercnet: 0,
      file_uploading: false,
      load_data: false,
      show_detail: false,
      data_saving: true,
      saveNow: false,
      action: '', // view || modify
      detail_row: {},
      load_data_rd: false,
      data_deleteing: false,
      detail_title: '',
      col_family_imp,
      data_family_imp: [],
      data_family_rd: [],
      windowHeight: 0
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchFamilyRd()
      })
    },
    handleUpload () {
      this.$refs.batImp.handleClick()
    },
    handleSearchFamilyRd () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchFamilyRd()
      })
    },
    searchFamilyRd () {
      if (this.load_data_rd) return
      this.load_data_rd = true

      this.formFamilyRd.employeeNo = this.trimForText(this.formFamilyRd.employeeNo)
      const condition = {
        hocaDateStart: this.formFamilyRd.date_value[0],
        hocaDateEnd: this.formFamilyRd.date_value[1],
        unconvType: this.formFamilyRd.unconvType,
        employeeNo: this.formFamilyRd.employeeNo,
        page: this.pageData.current,
        pageSize: this.pageData.size,
        credStatu: this.formData.credStatu
      }

      getEmpFamilyVisitList(condition).then(res => {
        let { fvData } = res
        if (fvData.data.code === '000000') {
          this.data_family_rd = fvData.data.data.rows
          this.pageData.total = fvData.data.data.total
        }
        this.load_data_rd = false
      }).catch(() => {
        this.data_family_rd = []
        this.load_data_rd = false
      })
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
            this.data_family_imp = data.data
            this.data_family_imp.forEach(function (val) {
              val.errorRecord = (val.totalRecord || 0) - (val.successRecord || 0)
            })
          }
        }
        this.load_data = false
      }).catch(() => {
        this.data_family_imp = []
        this.load_data = false
      })
    },
    handleDateChange (val) {
      this.formData.date_value = val
    },
    handleRdDateChange (val) {
      this.formFamilyRd.date_value = val
    },
    handleBefUpload (file) {
      this.$Modal.confirm({
        title: '上传批量文件',
        content: `确定上传文件：${file.name} 吗？`,
        onOk: () => {
          this.$refs.batImp.post(file)
          this.file_uploading = true
          this.load_data = true
          this.data_family_imp.unshift({ batNum: '', impStatusText: '上传中' })
        }
      })
      return false
      // this.file_uploading = true
      // this.load_data = true
      // this.data_family_imp.unshift({ batNum: '', impStatusText: '上传中' })
    },
    handleFileProgress (event, file, fileList) {
      this.fileUploadPercnet = event.percent
    },
    handleUploadSuccess (res, file) {
      if (res.code === '000000') {
        this.data_family_imp[0].batNum = res.data.batNum
        this.data_family_imp[0].impDate = res.data.impDate
        this.data_family_imp[0].impName = res.data.impName
        this.data_family_imp[0].impStatusText = res.data.impStatusText

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
      this.data_family_imp.splice(0, 1)
      this.$Notice.warning({
        title: '文格式错误',
        desc: file.name + ' 不是 xls 或 xlsx 格式'
      })
      this.file_uploading = false
      this.load_data = false
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
    handleDelData (row, index) {
      if (this.data_deleteing) return
      this.data_deleteing = true

      const condition = {
        id: row.id
      }

      deleteEmpFamilyVisit(condition).then(res => {
        let data = res.data

        if (data) {
          if (data.code === '000000') {
            this.data_family_rd.splice(index, 1)
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
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveSuccess (rowIndex, data) {
      this.data_family_rd[rowIndex].hocaDate = data.hocaDate
      this.data_family_rd[rowIndex].unconvType = data.unconvType
      this.data_family_rd[rowIndex].unconvTypeText = data.unconvTypeText
      this.data_family_rd[rowIndex].unconvDesc = data.unconvDesc
      this.data_family_rd[rowIndex].takeSept = data.takeSept
      this.data_family_rd[rowIndex].recnCom = data.recnCom
      this.data_family_rd[rowIndex].hocaRes = data.hocaRes
      this.data_family_rd[rowIndex].hocaAdu = data.hocaAdu
      this.data_family_rd[rowIndex].hocaNameAdu = data.hocaNameAdu
      this.data_family_rd[rowIndex].bz = data.bz
      this.data_family_rd[rowIndex].updateUser = data.updateUser
      this.data_family_rd[rowIndex].updateName = data.updateName
      this.data_family_rd[rowIndex].updateTime = data.updateTime

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
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 270
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
    this.template_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro_static : config.baseUrl.dev_static) + 'template/家访记录导入模板.xlsx'
    this.file_upload_url = this.base_url + config.fileUploadUrl.infoImport + '/hocainfo'
    this.formData.date_value = getStartToLastDate('year')
    this.formFamilyRd.date_value = getStartToLastDate('year')
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
