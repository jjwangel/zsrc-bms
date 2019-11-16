<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80">
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
          <FormItem label="部室/网点" prop="bswd" class="info_title">
            <Input v-model="formData.bswd" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="6">
          <FormItem label="岗位" prop="ssdw" class="info_title">
            <Input v-model="formData.ssdw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="职务" prop="bswd" class="info_title">
            <Input v-model="formData.bswd" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类别" prop="gzlb_tzq" class="info_title">
            <Input v-model="formData.gzlb_tzq" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类型" prop="gzlb_tzh" class="info_title">
            <Input v-model="formData.gzlb_tzh" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="开始关注日期" prop="gzlx" :label-width="108" class="info_title">
            <Input v-model="formData.gzlx" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注时长" prop="gzlb_tzh" class="info_title">
            <Input v-model="formData.gzlb_tzh" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注原因描述" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' readonly></Input>
      </FormItem>
      <FormItem label="采取措施" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' readonly></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' readonly></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' readonly></Input>
      </FormItem>
    </Form>

    <div v-show="true">
      <Form ref="form3" :rules="rules" :show-message="false" :model="formData" label-position="top">
        <FormItem label="审批意见" style="margin-left: 10px;" prop="fhyj" class="info_title">
          <Select :value="formData.fhyj" :label-in-value="true" @on-change="handleHTypeChg" :disabled="this.actionType==='view'">
            <Option :value="1">同意</Option>
            <Option :value="2">不同意</Option>
          </Select>
        </FormItem>
        <FormItem label="意见内容" prop="yyms" style="margin-left: 10px;" class="info_title">
          <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' :readonly="this.actionType==='view'"></Input>
        </FormItem>
      </Form>
    </div>

    <Divider style="margin-top: 10px;margin-bottom: 10px;" />

    <Steps :current="1" size="small" style="margin-left: 10px;">
        <Step title="发起">
          <template slot="content">
            <div style="width: 500px;">
              <p>经办人：简嘉文（T013803）</p>
              <p>发起日期：2019-11-10</p>
            </div>
          </template>
        </Step>
        <Step title="审核">
          <template slot="content">
            <div style="width: 500px;">
              <p>复核人：简嘉文（T013803）</p>
              <p>复核日期：2019-11-10</p>
              <p>复核意见：同意</p>
              <p>意见内容：有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头</p>
            </div>
          </template>
        </Step>
    </Steps>
    </Drawer>

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
    handleHTypeChg () {

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
