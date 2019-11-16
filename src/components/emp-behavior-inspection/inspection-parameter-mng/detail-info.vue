<template>
  <div>
    <Form ref="formAttentionAV" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="排查类型" prop="yggh" class="info_title">
            <Select v-model="formData.lqlx"  :disable="this.loadData">
              <Option :value="1">经济状况</Option>
              <Option :value="2">日常行为</Option>
              <Option :value="3">工作行为</Option>
              <Option :value="4">涉黑涉恶行为</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="状态" prop="zt"  :label-width="50" class="info_title">
            <Select v-model="formData.zt"  :disable="this.loadData">
              <Option :value="1">正常</Option>
              <Option :value="2">关闭</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formFollowView1" :show-message="false" :model="formData" label-position="top">
      <FormItem label="内容" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' :readonly="this.actionType === 'view'"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>

export default {
  props: [
    'actionType',
    'selOption',
    'rowData',
    'saveData'
  ],
  data () {
    return {
      loadData: false,
      dataSet: [],
      formData: this.rowData,
      sel_option: this.selOption,
      showInsParaDetail: false,
      showShowAttached: false,
      ruleAttention: {

      }
    }
  },
  methods: {
    handleCreatePara () {
      this.showInsParaDetail = true
    },
    handleSearchRd () {

    },
    searchRd () {

    },
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
