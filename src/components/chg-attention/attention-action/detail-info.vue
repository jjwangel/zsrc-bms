<template>
  <div>
    <Form ref="form" :model="formData" :show-message="false" :label-width="120">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="员工姓名" prop="employeeName" class="info_title">
            <Input v-model="formData.employeeName" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="当前关注类别" class="info_title">
            <Input v-model="getTypeText" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="开始关注日期" prop="focusDate" class="info_title">
            <Input v-model="formData.focusDate" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注时长" prop="focusDuration" class="info_title">
            <Input v-model="formData.focusDuration" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="关注类型" prop="focusItem" class="info_title">
        <Input v-model="formData.focusItem" readonly></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :model="formData" :show-message="false" label-position="top">
      <FormItem label="关注（调整）原因描述" prop="focusReason" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' readonly></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="followCondition" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" v-model="formData.followCondition" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' readonly></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>

export default {
  props: [
    'rowData'
  ],
  data () {
    return {
      formData: this.rowData
    }
  },
  computed: {
    getTypeText: function () {
      switch (this.formData.focusType) {
        case 1: return '重点关注'
        case 2: return '一般关注'
        case 3: return '正常'
      }
    }
  },
  watch: {
    rowData (val) {
      this.formData = val
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
