<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref="formBankIncome" :model="formData" :label-width="70" inline>
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
              <Button type="primary" icon="md-cloud-upload" :disabled="this.load_data" @click='this.handleShowSelectYear'>批量新增</Button>
              <Button type="success" icon="md-cloud-download" :disabled="this.load_data" :to="template_url" target="_blank">下载格式文件</Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </div>
      <Table size="small" :loading="this.load_data && !this.file_uploading" :stripe="true" border ref="tab-bank" :columns="col_bank" :data="data_bank">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-show="row.batNum !== ''" type="error" :to="base_url + 'file/failexport/yearinfo?batNum=' + row.batNum" target="_blank" size="small" :disabled="row.impStatusText !== '失败'">下载</Button>
          <Progress v-show="row.batNum === ''" :percent="fileUploadPercnet" hide-info />
        </template>
      </Table>

      <Modal v-model="showSelectYear"
        title="请选择数据年度"
        width="300"
        @on-ok="handleUpload">

        <Form :label-width="80">
          <FormItem label="数据年度" class="info_title">
            <DatePicker type="year"
              @on-change="handleImpYearChange"
              :clearable="false"
              :editable='false'
              :value="this.upload_data.date_value"
              style="width:90%;">
            </DatePicker>
          </FormItem>
        </Form>
      </Modal>

      <Upload :action="this.file_upload_url" ref="batImp" v-show="false"
        :with-credentials="true"
        :data="{year: this.upload_data.year}"
        :on-format-error="handleFileFormatErr"
        :on-success="handleUploadSuccess"
        :show-upload-list="false"
        :on-progress="handleFileProgress"
        :before-upload="handleBefUpload"
        :on-error="handleUploadErr"
        :format="['xlsx','xls']">
      </Upload>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMainImportList } from '@/api/emp-manage/emp-import'
import { getStartToLastDate, getFormatDate } from '@/libs/j-tools.js'
import { col_bank } from './common.js'
import { setToken } from '@/libs/util'
import config from '@/config'
export default {
  components: {

  },
  data () {
    return {
      showSelectYear: false,
      upload_data: {
        date_value: '',
        year: ''
      },
      formData: {
        employeeNo: this.employeeNo(),
        date_value: [],
        impType: '1',
        batNum: ''
      },
      template_url: '',
      file_upload_url: '',
      base_url: '',
      fileUploadPercnet: 0,
      file_uploading: false,
      load_data: false,
      show_detail: false,
      col_bank,
      data_bank: []
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleImpYearChange (val) {
      this.upload_data.date_value = val
      this.upload_data.year = new Date(this.upload_data.date_value).getFullYear().toString()
    },
    handleShowSelectYear () {
      this.showSelectYear = true
    },
    handleUpload () {
      this.$refs.batImp.handleClick()
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
            this.data_bank = data.data
            this.data_bank.forEach(function (val) {
              val.errorRecord = (val.totalRecord || 0) - (val.successRecord || 0)
            })
          }
        }
        this.load_data = false
      }).catch(() => {
        this.data_bank = []
        this.load_data = false
      })
    },
    handleDateChange (val) {
      this.formData.date_value = val
    },
    handleBefUpload () {
      this.file_uploading = true
      this.load_data = true
      this.data_bank.unshift({ batNum: '', impStatusText: '上传中' })
    },
    handleFileProgress (event, file, fileList) {
      this.fileUploadPercnet = event.percent
    },
    handleUploadSuccess (res, file) {
      if (res.code === '000000') {
        this.data_bank[0].batNum = res.data.batNum
        this.data_bank[0].impDate = res.data.impDate
        this.data_bank[0].impName = res.data.impName
        this.data_bank[0].impStatusText = res.data.impStatusText

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
    handleUploadErr (err) {
      console.log(err)
      this.$Message.error({
        content: '上传文件失败！',
        duration: 3
      })
    },
    handleFileFormatErr (file) {
      this.data_bank.splice(0, 1)
      this.$Notice.warning({
        title: '文格式错误',
        desc: file.name + ' 不是 xls 或 xlsx 格式'
      })
      this.file_uploading = false
      this.load_data = false
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
    this.template_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro_static : config.baseUrl.dev_static) + 'template/个人年收入导入模板.xlsx'
    this.file_upload_url = this.base_url + config.fileUploadUrl.infoImport + '/yearinfo'
    this.formData.date_value = getStartToLastDate('year')
    this.upload_data.date_value = getFormatDate('yyyy-MM-dd')
    this.upload_data.year = new Date(this.upload_data.date_value).getFullYear().toString()
    this.handleSearch()
  }
}
</script>
<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
