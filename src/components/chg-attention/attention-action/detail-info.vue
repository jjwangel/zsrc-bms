<template>
  <div>
    <Form ref="form" :model="formData" :show-message="false" :label-width="120">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="员工工号" prop="yggh" class="info_title">
            <Input v-model="formData.yggh" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="员工姓名" prop="ygxm" class="info_title">
            <Input v-model="formData.ygxm" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="当前关注类别" prop="dqgzlb" class="info_title">
            <Input v-model="formData.dqgzlb" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注类型" prop="gzlx" class="info_title">
            <Input v-model="formData.gzlx" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="开始关注日期" prop="kcgzrq" class="info_title">
            <Input v-model="formData.kcgzrq" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注时长" prop="kcgzrq" class="info_title">
            <Input v-model="formData.kcgzrq" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :model="formData" :show-message="false" label-position="top">
      <FormItem label="关注（调整）原因描述" prop="gztzyyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" v-model="formData.gztzyyms" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' readonly></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="gjqkdj" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" v-model="formData.gjqkdj" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' readonly></Input>
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
  watch: {
    rowData (val) {
      this.$refs['form'].resetFields()
      this.$refs['form2'].resetFields()
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
