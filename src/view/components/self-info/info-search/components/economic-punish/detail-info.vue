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
          <FormItem label="处罚金额" prop="pushBal">
            <Input v-model="formData.pushBal" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="具体事项" prop="pushDesc">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.pushDesc" :readonly="true"></Input>
      </FormItem>
      <FormItem label="处罚依据" prop="pushAcc">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.pushAcc" :readonly="true"></Input>
      </FormItem>
      <FormItem label="实施机构" prop="pushOrg">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.pushOrg" :readonly="true"></Input>
      </FormItem>
      <FormItem label="备注" prop="memo">
        <Input type="textarea" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' v-model="formData.memo" :readonly="true"></Input>
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
