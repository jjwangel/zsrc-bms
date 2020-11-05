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
          <FormItem label="调整日期" prop="createDate" class="info_title">
            <Input v-model="formData.createDate" readonly></Input>
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
          <FormItem label="关注类别" prop="focusType" class="info_title">
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
        <Input type="textarea" show-word-limit v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 3, maxRows: 3 }' readonly></Input>
      </FormItem>
      <FormItem label="采取措施" prop="dispose" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit v-model="formData.dispose" :rows="2" :autosize='{ minRows: 3, maxRows: 3 }' readonly></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="followCondition" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit v-model="formData.followCondition" :rows="2" :autosize='{ minRows: 3, maxRows: 3 }' readonly></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="nextPlan" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit v-model="formData.nextPlan" :rows="2" :autosize='{ minRows: 3, maxRows: 3 }' readonly></Input>
      </FormItem>
    </Form>

    <Form ref="form3" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="处置建议" prop="disposeAdvise" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :readonly="this.actionType === 'view'" :maxlength="500" v-model="formData.disposeAdvise" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form4" :show-message="false" :model="formData" :label-width="100">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="经办人工号" prop="creatorNo" class="info_title">
            <Input v-model="formData.creatorNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="经办人姓名" prop="creatorName" class="info_title">
            <Input v-model="formData.creatorName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="发起日期" prop="createDate" class="info_title">
            <Input v-model="formData.createDate" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="审批人工号" prop="approverNo" class="info_title">
            <Input v-model="formData.approverNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="审批人姓名" prop="approverName" class="info_title">
            <Input v-model="formData.approverName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="审批日期" prop="approveDate" class="info_title">
            <Input v-model="formData.approveDate" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

  </div>
</template>

<script>
import { vaildForm } from '@/libs/j-tools.js'
import { modifyFollowSuggest, getFocusPersonFollowInfo, getFocusPersonAdjustFlowDetail } from '@/api/emp-manage/follow-attention'

export default {
  props: [
    'actionType',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateDisposeAdvise = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入处置建议！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      rules: {
        disposeAdvise: [
          { validator: validateDisposeAdvise, trigger: 'blur' }
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
    initInfo () {
      let condition = {
        id: this.rowData.id
      }

      getFocusPersonFollowInfo(condition).then(res => {
        if (res.data.code === '000000') {
          condition = {
            id: res.data.data.adjustFlowId
          }

          this.formData = Object.assign({}, this.formData, res.data.data, { createDate: res.data.data.createTime.split(' ')[0], approveDate: res.data.data.approveTime.split(' ')[0] })

          getFocusPersonAdjustFlowDetail(condition).then(res => {
            if (res.data.code === '000000') {
              this.formData = Object.assign({}, this.formData, res.data.data)
            }
          }).catch(() => {

          })
        }
      }).catch(() => {

      })
    },
    handleSaveData () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '关注人员跟进处置建议',
          content: '确定提交处置建议吗？',
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
        id: this.formData.id,
        disposeAdvise: this.formData.disposeAdvise
      }

      modifyFollowSuggest(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '处置建议保存成功！',
            duration: 5
          })
          this.$emit('saveSuccess', { index: this.formData._index, disposeAdvise: this.formData.disposeAdvise })
        } else {
          this.$emit('saveCancel')
        }
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      this.formData.disposeAdvise = this.trimForText(this.formData.disposeAdvise)
      await vaildForm(this, 'form3')
    }
  },
  mounted () {

  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.$refs['form3'].resetFields()
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
