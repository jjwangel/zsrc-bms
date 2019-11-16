<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" inline>
          <FormItem label="流程类型" prop="lqlx" :label-width="80">
            <Select v-model="formData.lqlx" style="width:100px" :disable="this.loadData">
              <Option :value="0">全部</Option>
              <Option :value="1">关注调整</Option>
              <Option :value="2">跟进录入</Option>
            </Select>
          </FormItem>
          <FormItem label="接收时间" prop="jssj" class="info_title" :label-width="80">
            <DatePicker type="daterange" placement="bottom-start"
              style="width: 200px;margin-right: 10px"
              :clearable="false"
              :value="formData.jssj"
              @on-change="handleDateChange"
              :editable='false'></DatePicker>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(1)" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleCreateAttention" :loading="this.loadData">详细（临时）</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

    <Modal v-model="showAttentionAction" :loading="dataSaving" scrollable :title="actionTitle" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveChange">
      <AttentionAuditView @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow_="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></AttentionAuditView>
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
      showAttentionAction: false,
      dataSaving: true,
      saveNow: false,
      actionTitle: '',
      actionType: '', // view || create || modify
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {

    },
    handleDateChange () {

    },
    handleCreateAttention () {
      this.actionType = 'create'
      this.actionTitle = '关注类别复核/审核'
      this.showAttentionAction = true
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
    handleShowDetail () {

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
