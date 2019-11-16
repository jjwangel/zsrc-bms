<template>
  <div>
    <Form ref="formAttentionAV" :rules="ruleAttentionAV" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="当前流程" prop="dqlczt" class="info_title">
            <Input v-model="formData.dqlczt" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
        </Col>
      </Row>
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
          <FormItem label="所属单位" prop="ssdw" class="info_title">
            <Input v-model="formData.ssdw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部室网点" prop="bswd" class="info_title">
            <Input v-model="formData.bswd" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="关注类别（调整前）" prop="gzlb_tzq" :label-width="150" class="info_title">
            <Input v-model="formData.gzlb_tzq" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注类别（调整后）" prop="gzlb_tzh" :label-width="150" class="info_title">
            <Input v-model="formData.gzlb_tzh" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="关注类型" prop="gzlx" :label-width="80" class="info_title">
            <Input v-model="formData.gzlx" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="" prop="gzlx" :label-width="10" class="info_title">
              <Button type="primary" @click="handleShowAttached" long>浏览上传文件</Button>
            </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formAttentionAV2" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注原因描述" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
    </Form>
    <Form ref="formAttentionAV3" :rules="ruleAttentionAV" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">

        </Col>
        <Col span="12">
        </Col>
      </Row>
    </Form>
    <Form ref="formAttentionAV4" :rules="ruleAttentionAV" :show-message="false" :model="formData" label-position="top">
      <FormItem label="复核意见" style="margin-left: 10px;" prop="fhyj" class="info_title">
        <Select :value="formData.fhyj" :label-in-value="true" @on-change="handleHTypeChg" :disabled="this.actionType==='view'">
          <Option v-for="item in this.sel_option.selHdHType" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="意见内容" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
    </Form>

    <Divider style="margin-top: 10px;margin-bottom: 10px;" />

    <Steps :current="1" size="small" style="margin-left: 10px;">
        <Step title="发起">
          <template slot="content">
            <div style="width: 300px;">
              <p>经办人：简嘉文（T013803）</p>
              <p>发起日期：2019-11-10</p>
            </div>
          </template>
        </Step>
        <Step title="复核">
          <template slot="content">
            <div style="width: 300px;">
              <p>复核人：简嘉文（T013803）</p>
              <p>复核日期：2019-11-10</p>
              <p>复核意见：同意</p>
              <p>意见内容：有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头有链接时，可自定义右侧箭头</p>
            </div>
          </template>
        </Step>
        <Step title="审核">
          <template slot="content">
            <div style="width: 300px;">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </template>
        </Step>
    </Steps>

    <Modal v-model="showAttentionDetail"
      scrollable title="详细信息" width="700"
      :mask-closable="true"
      :footer-hide="true">
      <AttentionDetailInfo :rowData="{}"></AttentionDetailInfo>
    </Modal>

    <Drawer title="浏览文件" :closable="false" v-model="showShowAttached" :transfer="false" inner placement="left">

    </Drawer>

  </div>
</template>

<script>

import AttentionDetailInfo from '_c/chg-attention/attention-action/detail-info.vue'

export default {
  components: {
    AttentionDetailInfo
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
      ruleAttentionAV: {

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
