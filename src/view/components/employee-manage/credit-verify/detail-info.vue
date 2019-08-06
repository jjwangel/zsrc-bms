<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <span style='font-weight:bold;color: #464c5b'>征信报告日期：{{ this.formData.credDate }}</span>
        <Divider type="vertical" />
        <span style='font-weight:bold;color: #464c5b'>{{ this.formData.employeeNo }}</span>
        <Divider type="vertical" />
        <span style='font-weight:bold;color: #464c5b'>{{ this.formData.name }}</span>
        <Button style="margin-left: 10px" type="error" icon="md-remove-circle" :disabled="this.disableUnaudit" @click='handleUnauditCredit'>弃审征信</Button>
      </div>

      <Divider><font color='red'>负债信息区</font></Divider>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="selection" :columns="col_debt" :data="data_debt">
        <template slot-scope="{ row, index }" slot="overDeptBal">
          <span>{{ formatMoney(row.overDeptBal) }}</span>
        </template>
      </Table>

      <Divider><font color='red'>不良记录信息区</font></Divider>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="selection" :columns="col_badrec" :data="data_badrec">
      </Table>

      <Divider><font color='red'>对外担保信息区</font></Divider>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="selection" :columns="col_assu" :data="data_assu">
        <template slot-scope="{ row, index }" slot="assuBal">
          <span>{{ formatMoney(row.assuBal) }}</span>
        </template>
      </Table>

      <Divider><font color='red'>被强制执行信息区</font></Divider>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="selection" :columns="col_force" :data="data_force">
      </Table>

      <Divider><font color='red'>征信报告附件</font></Divider>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="selection" :columns="col_file" :data="data_file">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" :to="base_url + 'empcredstau/download?id=' + row.id" target="_blank" size="small">下载</Button>
        </template>
      </Table>

      <div style="margin: 20px; text-align:center;">
        <Upload :action="this.file_upload_url" ref="upCredit"
          :with-credentials="true"
          :data="uploadData"
          :on-format-error="handleFileFormatErr"
          :on-success="handleUploadSuccess"
          :show-upload-list="false"
          :before-upload="handleBefUpload"
          :on-error="handleUploadErr"
          :format="['rar','zip','pdf']">
          <Button type="primary" icon="md-cloud-upload" :disabled="this.dataSaving">审核通过并上传征信报告</Button>
        </Upload>
      </div>

    </Card>
  </div>
</template>

<script>
import { col_debt, col_badrec, col_assu, col_force, col_file } from './common.js'
import { getEmpCreditDetailInfo, getCreditFile, unauditCredit } from '@/api/emp-manage/credit-verify'
import { setToken } from '@/libs/util'
import config from '@/config'
export default {
  props: [
    'rowData'
  ],
  data () {
    return {
      uploadData: {
        employeeNo: this.rowData.employeeNo,
        credDate: this.rowData.credDate
      },
      disUnaudit: false,
      formData: this.rowData,
      dataSaving: false,
      refreshing: false,
      file_upload_url: '',
      base_url: '',
      col_debt,
      data_debt: [],
      col_badrec,
      data_badrec: [],
      col_assu,
      data_assu: [],
      col_force,
      data_force: [],
      col_file,
      data_file: []
    }
  },
  computed: {
    disableUnaudit () {
      return !(this.formData.credStatu === 2)
    }
  },
  methods: {
    handleUnauditCredit () {
      this.$Modal.confirm({
        title: '弃审征信报告',
        content: `确定弃审当前征信报告吗？`,
        onOk: () => {
          this.doUnauditCredit()
        }
      })
    },
    doUnauditCredit () {
      if (this.dataSaving) return
      this.disUnaudit = false
      this.dataSaving = true

      const condition = {
        id: this.formData.id
      }

      unauditCredit(condition).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '弃审征信成功！',
            duration: 3
          })
          this.formData.credStatu = 1
          this.$emit('unVerifySuccess', this.formData._index)
          this.dataSaving = false
        }
      }).catch(() => {
        this.disUnaudit = true
        this.dataSaving = false
      })
    },
    handleRefreshData () {
      this.refreshing = true

      const condition = {
        employeeNo: this.formData.employeeNo,
        credDate: this.formData.credDate
      }

      getEmpCreditDetailInfo(condition).then(res => {
        let { debtData, badrecData, assuData, forceData } = res
        if (debtData && badrecData && assuData && forceData) {
          if (debtData.data.code === '000000') {
            this.data_debt = debtData.data.data
          }

          if (badrecData.data.code === '000000') {
            this.data_badrec = badrecData.data.data
          }

          if (assuData.data.code === '000000') {
            this.data_assu = assuData.data.data
          }

          if (forceData.data.code === '000000') {
            this.data_force = forceData.data.data
          }
        }

        this.data_file = []
        if (this.formData.credStatu === 2) {
          getCreditFile({ id: this.formData.id }).then(res => {
            if (res.data.code === '000000') {
              const data = res.data.data
              if (data.fileName && data.fileName !== '') {
                this.data_file.push({
                  id: data.id,
                  fileName: data.fileName,
                  impName: data.loadName,
                  loadDatetime: data.loadDatetime
                })
              }
            }
          }).catch(() => {

          })
        }

        this.refreshing = false
      }).catch(error => {
        console.log(error)
        this.$Message.error({
          content: '有异常产生或登录超时！',
          duration: 3
        })
        this.refreshing = false
      })
    },
    handleBefUpload (file) {
      this.$Modal.confirm({
        title: '上传征信文件',
        content: `确定上传文件：${file.name} 吗？`,
        onOk: () => {
          this.dataSaving = true
          this.$refs.upCredit.post(file)
        }
      })
      return false
    },
    handleFileFormatErr (file) {
      this.$Notice.warning({
        title: '文格式错误',
        desc: file.name + ' 不是 rar、zip、pdf 等格式'
      })
      this.dataSaving = false
    },
    handleUploadSuccess (res, file) {
      if (res.code === '000000') {
        if (this.data_file.length > 0) this.data_file.splice(0, 1)
        this.data_file.push({
          id: res.data.id,
          fileName: res.data.fileName,
          impName: res.data.loadName,
          loadDatetime: res.data.loadDatetime
        })

        this.formData.credStatu = 2
        this.$emit('verifySuccess', this.formData._index)
        this.dataSaving = false
        this.$Message.success({
          content: '征信报告审核成功！',
          duration: 3
        })
      } else {
        this.dataSaving = false
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
            content: `上传征信报告失败：${res.message}(${res.code})`,
            duration: 3
          })
        }
      }
    },
    handleUploadErr (err) {
      console.log(err)
      this.$Message.error({
        content: '上传征信报告失败！',
        duration: 3
      })
    }
  },

  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
    this.file_upload_url = this.base_url + config.fileUploadUrl.creditImport
  },
  watch: {
    rowData (val) {
      this.formData = Object.assign({}, val)
      this.disUnaudit = !(this.formData.credStatu === 2)
      this.uploadData.employeeNo = val.employeeNo
      this.uploadData.credDate = val.credDate
      this.handleRefreshData()
    }
  }
}
</script>

<style scoped>

</style>
