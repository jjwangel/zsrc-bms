<template>
  <div>
    <Form ref="formAttentionAV" :show-message="false" :model="formData" :label-width="80" inline>
      <Row :gutter="20">
        <Col span="10">
          <FormItem label="排查项目" prop="pcxm" class="info_title">
            <Input type="text" v-model="formData.pcxm" :readonly="this.loadData" style="width: 300px;"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="工号" prop="gh"  :label-width="50" class="info_title">
            <Input type="text" v-model="formData.gh" :readonly="this.loadData" ></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="姓名" prop="xm"  :label-width="50" class="info_title">
            <Input type="text" v-model="formData.xm" :readonly="this.loadData" ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <Button type="primary" @click="handleShowDetail">以上排查内容均无异常</Button>
        </Col>
      </Row>
    </Form>

    <div style="margin-left: 10px;margin-top: 10px;">
      <Table size="small" :height="400" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
      </Table>

      <Form ref="formAttentionAV2" :show-message="false" :model="formData" label-position="top" style="margin-top: 10px;">
        <FormItem label="存在其它异常行为" prop="yyms" class="info_title">
          <Input type="textarea" show-word-limit :maxlength="200" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>

import { mixinInfo } from './common.js'

export default {
  components: {

  },
  mixins: [ mixinInfo ],
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
