<template>
  <div>
    <Form :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="所在单位" prop="deptType">
              <Input v-model="formData.deptType" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部室/网点" prop="deptName">
              <Input v-model="formData.deptName" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="处罚日期" prop="pushDate">
              <Input v-model="formData.pushDate" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
        </Col>
      </Row>
      <FormItem label="违规问题" prop="ouquQues">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.ouquQues" :readonly="true"></Input>
      </FormItem>
      <FormItem label="党内处分" prop="partPush">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.partPush" :readonly="true"></Input>
      </FormItem>
      <FormItem label="纪律处分" prop="discPush">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.discPush" :readonly="true"></Input>
      </FormItem>
      <FormItem label="人事处理" prop="humaDeal">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.humaDeal" :readonly="true"></Input>
      </FormItem>
      <FormItem label="其他处理" prop="othDeal">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.othDeal" :readonly="true"></Input>
      </FormItem>
      <FormItem label="经济处理" prop="econDeal">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.econDeal" :readonly="true"></Input>
      </FormItem>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="是否解除" prop="isFreeText">
              <Input v-model="formData.isFreeText" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="解除日期" prop="freeDate">
              <Input v-model="formData.freeDate" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
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
      this.formData = val
    }
  }
}
</script>
<style scoped>
  .ivu-form-item{
    margin-bottom: 10px;
  }
</style>
