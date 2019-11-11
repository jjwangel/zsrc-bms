<template>
  <div>
    <Form ref="formAttention" :rules="ruleAttention" :show-message="false" :model="formData" :label-width="80">
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
          <FormItem label="部室/网点" prop="bswd" class="info_title">
            <Input v-model="formData.bswd" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="现任职务" prop="xrzw" class="info_title">
            <Input v-model="formData.xrzw" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12"></Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formAttention2" :rules="ruleAttention" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注类别（调整前）" prop="gzlb_tzq" style="margin-left: 10px;" class="info_title">
        <Input v-model="formData.gzlb_tzq" search enter-button="查看详细" @on-search="handleShowDetail" readonly></Input>
      </FormItem>
      <FormItem label="关注类别（调整后）" prop="gzlb_tzh" style="margin-left: 10px;" class="info_title">
        <Select :value="formData.gzlb_tzh" :label-in-value="true" @on-change="handleHTypeChg" :disabled="this.actionType==='view'">
          <Option v-for="item in this.sel_option.selHdHType" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="关注类型" prop="gzlx" style="margin-left: 10px;" class="info_title">
        <Select :value="formData.gzlx" :label-in-value="true" @on-change="handleHTypeChg" :disabled="this.actionType==='view'">
          <Option v-for="item in this.sel_option.selHdHType" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="关注（调整）原因描述" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>

      <div style="margin-left: 10px;">
        <List header="Header" border size="small">
          <ListItem>
            <ListItemMeta title="纪律教育学习月活动心得体会"/>
            <template slot="action">
              <ButtonGroup>
                <Button type="success" size="small" @click="handleSponsorAttention (row, index)">下载</Button>
                <Button type="error" size="small" @click="handleSponsorAttention (row, index)">删除</Button>
              </ButtonGroup>
            </template>
          </ListItem>
          <template slot="header">
            <Button type="primary" size="small" @click="handleSponsorAttention (row, index)" long>上传证明附件</Button>
          </template>
        </List>
      </div>
    </Form>

    <Modal v-model="showAttentionDetail"
      scrollable title="详细信息" width="700"
      :mask-closable="true"
      :footer-hide="true">
      <AttentionDetailInfo :rowData="{}"></AttentionDetailInfo>
    </Modal>
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
      ruleAttention: {

      }
    }
  },
  methods: {
    handleHTypeChg () {

    },
    handleShowDetail () {
      this.showAttentionDetail = true
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
