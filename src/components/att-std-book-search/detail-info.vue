<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="10">
        <Col span="8">
          <FormItem label="经办人" prop="creatorName" class="info_title" :label-width="65">
            <Input v-model="formData.creatorName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="登记日期" prop="createDate" class="info_title">
            <Input v-model="formData.createDate" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Form ref="form1" :show-message="false" :model="formData" label-position="top">
      <FormItem label="采取措施" prop="dispose" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.dispose" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="followCondition" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.followCondition" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="nextPlan" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.nextPlan" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
    </Form>

    <Divider style="margin-top: 10px;margin-bottom: 10px;" />

    <Form ref="form2" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="10">
        <Col span="8">
          <FormItem label="审批人" prop="approverName" class="info_title" :label-width="65">
            <Input v-model="formData.approverName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="审批意见" prop="approveStatusText" class="info_title">
            <Input v-model="formData.approveStatusText" readonly></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="审批日期" prop="approveDate" class="info_title">
            <Input v-model="formData.approveDate" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form ref="form3" :show-message="false" :model="formData" label-position="top">
      <FormItem label="意见内容" prop="approveComment" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.approveComment" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' readonly></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: [
    'rowData'
  ],
  data () {
    return {
      formData: this.rowData
    }
  },
  methods: {

  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.formData = val
      console.log(val)
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
