<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="6">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="员工姓名" prop="employeeName" class="info_title">
            <Input v-model="formData.employeeName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属单位" prop="headSubName" class="info_title">
            <Input v-model="formData.headSubName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="部室网点" prop="deptName" class="info_title">
            <Input v-model="formData.deptName" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="6">
          <FormItem label="岗位" prop="postName" class="info_title">
            <Input v-model="formData.postName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="职务" prop="duty" class="info_title">
            <Input v-model="formData.duty" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开始关注日期" prop="focusDate" class="info_title" :label-width="110">
            <Input v-model="formData.focusDate" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注时长" prop="focusDuration" class="info_title">
            <Input v-model="formData.focusDuration" readonly></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col span="12">
          <FormItem label="关注类别" prop="focusType" class="info_title" :label-width="110">
            <Input v-model="formData.focusType" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注类型" prop="focusItem" class="info_title">
            <Input v-model="formData.focusItem" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注（调整）原因描述" prop="focusReason" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="采取措施" prop="dispose" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.dispose" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
      </FormItem>
      <FormItem label="请详细填写：跟进情况" prop="followCondition" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.followCondition" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="nextPlan" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.nextPlan" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
      </FormItem>
    </Form>

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
import { vaildForm } from '@/libs/j-tools.js'
import { addFocusPersonFollow, getFocusPersonAdjustFlowDetail } from '@/api/emp-manage/follow-attention'
import { deleteDataByOne } from '@/api/base'
import config from '@/config'

export default {
  components: {

  },
  props: [
    'rowData',
    'saveNow'
  ],
  data () {
    const validateFollowCondition = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入跟进情况！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateDispose = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入采取措施！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateNextPlan = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入下一步计划！',
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
      fileUploadUrl: '',
      fileUploadPercnet: 0,
      files: [],
      fileUploading: false,
      rules: {
        followCondition: [
          { validator: validateFollowCondition, trigger: 'blur' }
        ],
        dispose: [
          { validator: validateDispose, trigger: 'blur' }
        ],
        nextPlan: [
          { validator: validateNextPlan, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initInfo () {
      const condition = {
        id: this.formData.adjustFlowId
      }

      getFocusPersonAdjustFlowDetail(condition).then(res => {
        if (res.data.code === '000000') {
          this.formData.focusReason = res.data.data.focusReason
          this.formData.focusItem = res.data.data.focusItem
          switch (res.data.data.focusType) {
            case 1: this.formData.focusType = '重点关注'
              break
            case 2: this.formData.focusType = '一般关注'
              break
            case 3: this.formData.focusType = '正常'
          }
        }
      }).catch(() => {

      })
    },
    handleSaveData () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '发起关注人员情况跟进登记',
          content: '确定提交登记吗？',
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
        adjustFlowId: this.formData.adjustFlowId,
        employeeNo: this.formData.employeeNo,
        dispose: this.formData.dispose,
        followCondition: this.formData.followCondition,
        nextPlan: this.formData.nextPlan
      }

      addFocusPersonFollow(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '关注人员情况跟进登记发起成功！',
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
      this.formData.dispose = this.trimForText(this.formData.dispose)
      this.formData.followCondition = this.trimForText(this.formData.followCondition)
      this.formData.nextPlan = this.trimForText(this.formData.nextPlan)
      await vaildForm(this, 'form2')
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
      if (Object.keys(val).length === 0) return
      this.$refs['form2'].resetFields()
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
