<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" inline>
          <FormItem label="流程类型" prop="lqlx" :label-width="80">
            <Select v-model="formData.lqlx" style="width:120px" :disable="this.loadData">
              <Option :value="0">全部</Option>
              <Option :value="1">关注调整</Option>
              <Option :value="2">跟进录入</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(1)" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleVerifyAttention" :loading="this.loadData">复核/审批（临时）</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleVerifyAttention" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="handleVerifyAttention (row, index)">办理</Button>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

    <Modal v-model="showVerifyAttention" :loading="dataSaving" scrollable :title="actionTitle" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="false"
      :footer-hide="false"
      @on-ok="handleSaveChange">
      <AttentionAuditView @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveData="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></AttentionAuditView>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import AttentionAuditView from '_c/chg-attention/attention-audit-view'

export default {
  components: {
    AttentionAuditView
  },
  mixins: [ mixinInfo ],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      formData: {
        employeeNo: '',
        name: ''
      },
      dataSet: [],
      loadData: false,
      showVerifyAttention: false,
      dataSaving: false,
      saveNow: false,
      actionTitle: '',
      actionType: '', // view || create || modify
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {

    },
    handleVerifyAttention (row, index) {
      this.actionType = 'create'
      this.actionTitle = '关注类别复核/审核'
      this.showVerifyAttention = true
    },
    handleSponsorAttention (row, index) {

    },
    handleSaveChange () {

    },
    handleSaveCancel () {

    },
    handleSaveSuccess () {

    },
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {
      if (this.loadData) return
      this.loadData = true
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 230
    }
  },
  mounted () {
    this.initInfo()
  },
  created () {
    window.addEventListener('resize', this.setWindowHeight)
    this.setWindowHeight()
  },
  destroyed () {
    window.removeEventListener('resize', this.setWindowHeight)
  }
}
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 0px;
  }
</style>
