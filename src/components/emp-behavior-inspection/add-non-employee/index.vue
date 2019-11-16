<template>
  <div>
    <Form ref="formAttentionAV" :show-message="false" :model="formData" :label-width="70">
      <FormItem label="姓名" prop="xm" class="info_title">
        <Input type="text" v-model="formData.xm" :readonly="this.loadData" ></Input>
      </FormItem>
      <FormItem label="性别" prop="xb" class="info_title">
        <Select v-model="formData.xb"  :disable="this.loadData">
          <Option :value="1">男</Option>
          <Option :value="2">女</Option>
        </Select>
      </FormItem>
      <FormItem label="身份证" prop="xm" class="info_title">
        <Input type="text" v-model="formData.xm" :readonly="this.loadData" ></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formFollowView1" :show-message="false" :model="formData" label-position="top">
      <FormItem label="备注" prop="yyms" style="margin-left: 15px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' :readonly="this.actionType === 'view'"></Input>
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
