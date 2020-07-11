<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="员工姓名" prop="employeeName" class="info_title">
            <Input v-model="formData.employeeName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="现任职务" prop="duty" class="info_title">
            <Input v-model="formData.duty" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="所属单位" prop="headSubName" class="info_title">
        <Input v-model="formData.headSubName" readonly></Input>
      </FormItem>
      <FormItem label="部室/网点" prop="deptName" class="info_title">
        <Input v-model="formData.deptName" readonly></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Row :gutter="20">
      <Col span="8">
        <Form ref="form2" :show-message="false" :model="formData" label-position="top">
          <FormItem label="关注类别（调整前）" prop="focusTypeText" style="margin-left: 10px;" class="info_title">
            <Input v-model="formData.focusTypeText" search enter-button="查看详细" @on-search="handleShowDetail" readonly></Input>
          </FormItem>
        </Form>
      </Col>
      <Col span="16">
        <Form ref="form6" :show-message="false" :model="formData" label-position="top">
          <FormItem label="关注类型（调整前）" prop="focusItemBefore" style="margin-left: 10px;" class="info_title">
            <Input v-model="formData.focusItemBefore" readonly></Input>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <Form ref="form3" :rules="rules" :show-message="false" :model="formData" label-position="top">
          <FormItem label="关注类别（调整后）" prop="newFocusType" style="margin-left: 10px;" class="info_title">
            <Select :value="formData.newFocusType" style="width: 200px;" :label-in-value="true" @on-change="handleAttLevelChg">
              <Option :value="1">重点关注</Option>
              <Option :value="2">一般关注</Option>
              <Option :value="3">正常</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Col span="16">
        <Form ref="form5" :rules="rules" :show-message="false" :model="formData" label-position="top">
          <FormItem label="关注类型（调整后）" prop="focusItem" style="margin-left: 10px;" class="info_title">
            <Select :value="formData.focusItem" :disabled="formData.newFocusType === 3" multiple :max-tag-count="3" :max-tag-placeholder="maxTagPlaceholder" :label-in-value="true" @on-change="handleFocusItemChg">
              <Option v-for="item in this.selOption.selFocusItem" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
    </Row>

    <Form ref="form4" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="请详细填写：关注（调整）原因" prop="focusReason" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }'></Input>
      </FormItem>

      <div style="margin-left: 10px;">
        <List header="Header" border size="small">
          <ListItem v-for="item in this.files" :key="item.id">
            <ListItemMeta :title="item.title"/>
            <template slot="action">
              <Button type="error" size="small" @click="handleDeleteFile(item.id)">删除</Button>
            </template>
          </ListItem>
          <template slot="header">
            <Button type="primary" :loading="this.fileUploading" @click="handleUploadFiles" long>上传证明附件</Button>
          </template>
        </List>
        <div style="height: 10px;margin-top: 5px;">
          <p style="float:right;">上传附件类型：word、excel、pdf、rar、zip</p>
        </div>
      </div>
    </Form>

    <Modal v-model="showAttentionDetail"
      scrollable title="详细信息" width="700"
      :mask-closable="true"
      :footer-hide="true">
      <AttentionDetailInfo :rowData="this.detailData"></AttentionDetailInfo>
    </Modal>

    <Upload :action="this.fileUploadUrl" ref="upload" v-show="false"
      :with-credentials="true"
      :data="{type: 1}"
      :on-format-error="handleFileFormatErr"
      :on-success="handleUploadSuccess"
      :show-upload-list="false"
      :on-progress="handleFileProgress"
      :before-upload="handleBefUpload"
      :on-error="handleUploadErr"
      :format="['xlsx','xls','doc','docx','pdf','rar','zip']">
    </Upload>
  </div>
</template>

<script>

import AttentionDetailInfo from '_c/chg-attention/attention-action/detail-info.vue'
import { deleteDataByOne } from '@/api/base'
import { vaildForm } from '@/libs/j-tools.js'
import { addFocusPersonAdjustFlow, getFocusPersonDetail, getFocusPersonAdjustDetail } from '@/api/emp-manage/chg-attention'
import config from '@/config'

export default {
  components: {
    AttentionDetailInfo
  },
  props: [
    'selOption',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateNewFocusType = (rule, value, callback) => {
      if (value === 0) {
        this.$Message.warning({
          content: '请选择“调整后的关注类别”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (this.formData.focusType === this.formData.newFocusType) {
          this.$Message.warning({
            content: '该员工的关注类别调整前后一致，请检查',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateFocusItem = (rule, value, callback) => {
      if (value.length === 0 && this.formData.newFocusType !== 3) {
        this.$Message.warning({
          content: '请选择“关注类型”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateFocusReason = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '关注（调整）原因描述不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      base_url: '',
      formData: this.rowData,
      showAttentionDetail: false,
      fileUploadUrl: '',
      fileUploadPercnet: 0,
      fileUploading: false,
      files: [],
      detailData: {},
      loadDetail: false,
      rules: {
        newFocusType: [
          { validator: validateNewFocusType, trigger: 'blur' }
        ],
        focusItem: [
          { validator: validateFocusItem, trigger: 'blur' }
        ],
        focusReason: [
          { validator: validateFocusReason, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initInfo () {
      const condition = {
        employeeNo: this.formData.employeeNo
      }

      getFocusPersonAdjustDetail(condition).then(res => {
        if (res.data.code === '000000') {
          this.formData.focusItemBefore = res.data.data.focusItemBefore
        }
      }).catch(() => {

      })
    },
    maxTagPlaceholder (num) {
      return '+' + num
    },
    handleAttLevelChg (item) {
      if (item) {
        this.formData.newFocusType = item.value
        if (this.formData.newFocusType === 3) {
          this.formData.focusItem = []
        }
      }
    },
    handleFocusItemChg (item) {
      if (item) {
        this.formData.focusItem = item.map((v) => { return v.value })
        this.formData.focusItemText = item.map((v) => { return v.label }).join() // 把对像某个值转换成数组，再用豆号（默认）分隔返回字符串
      }
    },
    handleShowDetail () {
      if (this.loadDetail) return
      this.loadDetail = true

      getFocusPersonDetail({ employeeNo: this.formData.employeeNo }).then(res => {
        if (res.data.code === '000000') {
          this.detailData = res.data.data
        }
        this.loadDetail = false
        this.showAttentionDetail = true
      }).catch(() => {
        this.detailData = []
        this.loadDetail = false
      })
    },
    handleSaveData () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '发起调整关注类别',
          content: '确定提交调整吗？',
          onOk: this.saveData,
          onCancel: () => {
            this.$emit('saveCancel')
          }
        })
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    saveData () {
      let data = {
        credentialFileIds: this.files.map((v) => { return v.id }).join(),
        employeeNo: this.formData.employeeNo,
        focusItem: (this.formData.newFocusType === 3 ? '' : this.formData.focusItemText),
        focusReason: this.formData.focusReason,
        focusTypeAfter: this.formData.newFocusType,
        focusTypeBefore: this.formData.focusType
      }

      addFocusPersonAdjustFlow(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '员工关注调整发起成功！',
            duration: 5
          })
          this.$emit('saveSuccess', this.formData._index)
        } else {
          this.$emit('saveCancel')
        }
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      this.formData.focusReason = this.trimForText(this.formData.focusReason)
      await vaildForm(this, 'form3')
      await vaildForm(this, 'form5')
      await vaildForm(this, 'form4')
    },
    handleUploadFiles () {
      this.$refs.upload.handleClick()
    },
    handleFileFormatErr (file) {
      this.$Notice.warning({
        title: '文格式错误',
        desc: file.name + ' 不是Excel、Word、PDF、RAR、ZIP等格式'
      })
      this.$nextTick(() => {
        this.fileUploading = false
      })
    },
    handleUploadSuccess (res, file) {
      if (res.code === '000000') {
        this.files.push({ title: res.data.name, id: res.data.id })
      } else {
        this.$Message.error({
          content: `上传文件失败：${res.message}(${res.code})`,
          duration: 5
        })
      }

      this.fileUploading = false
    },
    handleFileProgress (event, file, fileList) {
      this.fileUploadPercnet = event.percent
    },
    handleBefUpload (file) {
      this.$refs.upload.post(file)
      this.fileUploading = true
      return false
    },
    handleUploadErr () {
      this.$Message.error({
        content: '上传文件失败！',
        duration: 3
      })
    },
    handleDeleteFile (id) {
      const url = `/uploadfile/${id}`
      deleteDataByOne(url).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '删除文件成功！',
            duration: 5
          })

          this.files.forEach((item, index, arr) => {
            if (item.id === id) {
              arr.splice(index, 1)
            }
          })
        }
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
    this.fileUploadUrl = this.base_url + config.fileUploadUrl.uploadFile
  },
  watch: {
    rowData (val) {
      this.$refs['form3'].resetFields()
      this.$refs['form4'].resetFields()
      this.$refs['form5'].resetFields()
      this.formData = val
      this.initInfo()
    },
    saveNow (val) {
      if (val) this.handleSaveData()
    }
  }
}
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 8px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
