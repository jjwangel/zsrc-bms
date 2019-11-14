<template>
  <div>
    <Form ref="formAttentionAV" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="10">
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
          <FormItem label="关注类别" prop="gzlb" class="info_title">
            <Input v-model="formData.gzlb" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类型" prop="gzlx" class="info_title">
            <Input v-model="formData.gzlx" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="开始关注日期" :label-width="107"  prop="kcgzrq" class="info_title">
            <Input v-model="formData.kcgzrq" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注时长" prop="gzsc" class="info_title">
            <Input v-model="formData.gzsc" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="解除日期" prop="jcrq" class="info_title">
            <Input v-model="formData.jcrq" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formFollowView1" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注原因描述" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' readonly></Input>
      </FormItem>
      <FormItem label="采取措施" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
      <FormItem label="跟进情况登记" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
      <FormItem label="下一步计划" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />

    <Steps :current="1" size="small" style="margin-left: 10px;">
        <Step title="发起">
          <template slot="content">
            <div style="width: 500px;">
              <p>经办人：简嘉文（T013803）</p>
              <p>登记日期：2019-11-10</p>
            </div>
          </template>
        </Step>
        <Step title="审批">
          <template slot="content">
            <div style="width: 500px;">
              <p>审批人：简嘉文（T013803）</p>
              <p>审批日期：2019-11-10</p>
              <p>审批意见：同意</p>
              <p>意见内容：有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头</p>
            </div>
          </template>
        </Step>
    </Steps>

  </div>
</template>

<script>
export default {
  components: {

  },
  props: [
    'actionType',
    'selOption',
    'rowData',
    'saveData'
  ],
  data () {
    return {
      formData: this.rowData,
      sel_option: this.selOption,
      showAttentionDetail: false,
      showShowAttached: false,
      ruleAttention: {

      }
    }
  },
  methods: {
    handleHTypeChg () {

    },
    handleShowDetail () {
      this.showAttentionDetail = true
    },
    handleShowAttached () {
      this.showShowAttached = true
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
