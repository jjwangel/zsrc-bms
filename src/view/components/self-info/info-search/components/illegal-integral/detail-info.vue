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
          <FormItem label="积分日期" prop="inteDate">
              <Input v-model="formData.inteDate" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="积分分值" prop="inteCent">
              <Input v-model="formData.inteCent" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="存在问题" prop="exitIssu">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.exitIssu" :readonly="true"></Input>
      </FormItem>
      <FormItem label="业务种类或条线" prop="operType">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.operType" :readonly="true"></Input>
      </FormItem>
      <FormItem label="积分依据" prop="inteAcco">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.inteAcco" :readonly="true"></Input>
      </FormItem>
      <FormItem label="检查项目名称" prop="checkName">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.checkName" :readonly="true"></Input>
      </FormItem>
      <FormItem label="实施机构" prop="actuInst">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.actuInst" :readonly="true"></Input>
      </FormItem>
      <FormItem label="备注" prop="bz">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.bz" :readonly="true"></Input>
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
