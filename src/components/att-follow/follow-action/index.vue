<template>
  <div>
    <Form ref="form" :rules="rules" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="6">
          <FormItem label="员工工号" prop="yggh" class="info_title">
            <Input v-model="formData.yggh" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="员工姓名" prop="ygxm" class="info_title">
            <Input v-model="formData.ygxm" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属单位" prop="ssdw" class="info_title">
            <Input v-model="formData.ssdw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="部室网点" prop="bswd" class="info_title">
            <Input v-model="formData.bswd" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="6">
          <FormItem label="岗位" prop="xrzw" class="info_title">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="职务" prop="xrzw" class="info_title">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类别" prop="xrzw" class="info_title" :label-width="110">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类型" prop="xrzw" class="info_title">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col span="12">
          <FormItem label="开始关注日期" prop="xrzw" class="info_title" :label-width="110">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注时长" prop="xrzw" class="info_title">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注原因描述" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
      <FormItem label="采取措施" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>

    </Form>

  </div>
</template>

<script>

export default {
  components: {

  },
  props: [
    'actionType',
    'rowData',
    'saveData'
  ],
  data () {
    return {
      formData: this.rowData,
      rules: {

      }
    }
  },
  methods: {

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
