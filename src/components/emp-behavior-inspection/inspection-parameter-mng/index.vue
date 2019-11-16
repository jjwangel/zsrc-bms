<template>
  <div>
    <Form ref="formAttentionAV" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="排查类型" prop="yggh" class="info_title">
            <Select v-model="formData.lqlx"  :disable="this.loadData">
              <Option :value="0">全部</Option>
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
              <Option :value="0">全部</Option>
              <Option :value="1">正常</Option>
              <Option :value="2">关闭</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <ButtonGroup>
            <Button type="primary" icon="ios-search" @click="handleSearchRd" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleCreatePara" :loading="this.loadData">增加</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>

    <div style="margin-left: 10px;margin-top: 10px;">
      <Table size="small" :height="400" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="searchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </div>

    <Modal v-model="showInsParaDetail"
      scrollable title="详细信息" width="700"
      :mask-closable="true"
      :footer-hide="false"
      ok-text="提交"
      :styles="{top: '10px'}">
      <InsParaDetailInfo :rowData="{}"></InsParaDetailInfo>
    </Modal>

  </div>
</template>

<script>

import InsParaDetailInfo from '_c/emp-behavior-inspection/inspection-parameter-mng/detail-info.vue'
import { mixinInfo } from './common.js'

export default {
  components: {
    InsParaDetailInfo
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
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
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
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchRd()
      })
    },
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
