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
          <FormItem label="部室/网点" prop="deptName" class="info_title">
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
          <FormItem label="开始关注日期" prop="focusDate" :label-width="108" class="info_title">
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
          <FormItem label="关注类别" class="info_title">
            <Input v-model="getFocusTypeText" readonly></Input>
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
    <Form ref="form2" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注（调整）原因描述" prop="focusReason" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="采取措施" prop="dispose" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.dispose" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="followCondition" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.followCondition" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="nextPlan" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.nextPlan" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
    </Form>

    <div v-show="this.actionType!=='view'">
      <Form ref="form3" :rules="rules" :show-message="false" :model="formData" label-position="top">
        <FormItem label="审批意见" style="margin-left: 10px;" prop="_approveStatus" class="info_title">
          <Select v-model="formData._approveStatus" :label-in-value="true" @on-change="handleNodeStatusChg">
            <Option :value="1">同意</Option>
            <Option :value="2">不同意</Option>
          </Select>
        </FormItem>
        <FormItem label="意见内容" prop="_approveComment" style="margin-left: 10px;" class="info_title">
          <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData._approveComment" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }'></Input>
        </FormItem>
      </Form>
    </div>

    <Divider style="margin-top: 10px;margin-bottom: 10px;" />

    <Steps :current="1" size="small" style="margin-left: 10px;">
        <Step title="发起">
          <template slot="content">
            <div style="width: 400px;">
              <p>经办人：{{formData.creatorName}}（{{formData.creatorNo}}）</p>
              <p>发起日期：{{formData.createTime}}</p>
            </div>
          </template>
        </Step>
        <Step title="审批">
          <template slot="content">
            <div style="width: 700px;">
              <p v-show="formData.approveStatus !== 0 && actionType === 'view'">审批人：{{formData.approverName}}（{{formData.approverNo}}）</p>
              <p v-show="formData.approveStatus !== 0 && actionType === 'view'">审批日期：{{formData.approveTime}}</p>
              <p v-show="formData.approveStatus !== 0 && actionType === 'view'">审批意见：{{formData.approveStatus === 1 ? '同意': '不同意'}}</p>
              <p v-show="formData.approveStatus !== 0 && actionType === 'view'">意见内容：{{formData.approveComment}}</p>
            </div>
          </template>
        </Step>
    </Steps>
    </Drawer>

  </div>
</template>

<script>
import { getFocusPersonFollowInfo, getFocusPersonAdjustFlowDetail, verifyFocusPersonFollow } from '@/api/emp-manage/follow-attention'
import { vaildForm } from '@/libs/j-tools.js'

export default {
  components: {

  },
  props: [
    'actionType',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateApproveStatus = (rule, value, callback) => {
      if (value === 0) {
        this.$Message.warning({
          content: '请选择审批意见',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateApproveComment = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '意见内容不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: {},
      rules: {
        _approveStatus: [
          { validator: validateApproveStatus, trigger: 'blur' }
        ],
        _approveComment: [
          { validator: validateApproveComment, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getFocusTypeText: function () {
      switch (this.formData.focusType) {
        case 1: return '重点关注'
        case 2: return '一般关注'
        case 3: return '正常'
      }
    }
  },
  methods: {
    findFollowData () {
      let condition = {
        id: this.rowData.relatedId
      }

      getFocusPersonFollowInfo(condition).then(res => {
        if (res.data.code === '000000') {
          this.formData = Object.assign({}, res.data.data)
          condition = {
            id: res.data.data.adjustFlowId
          }

          getFocusPersonAdjustFlowDetail(condition).then(res => {
            if (res.data.code === '000000') {
              this.formData = Object.assign({}, this.formData, res.data.data, { _approveComment: '', _approveStatus: 0 })
            }
          }).catch(() => {

          })
        }
      }).catch(() => {

      })
    },
    handleNodeStatusChg (item) {
      if (item) {
        switch (item.value) {
          case 1: this.formData._approveComment = '同意调整'
            break
          case 2: this.formData._approveComment = ''
            break
        }
      }
    },
    handleSaveData () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '关注人员跟进登记流程',
          content: '确定提交吗？',
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
      this.formData._approveComment = this.trimForText(this.formData._approveComment)

      let data = {
        id: this.formData.id,
        approveComment: this.formData._approveComment,
        approveStatus: this.formData._approveStatus
      }

      verifyFocusPersonFollow(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '关注人员跟进登记审批提交成功',
            duration: 5
          })
          this.$emit('saveSuccess', this.rowData._index)
        } else {
          this.$emit('saveCancel')
        }
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      await vaildForm(this, 'form3')
    }
  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.$refs['form3'].resetFields()
      this.findFollowData()
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
