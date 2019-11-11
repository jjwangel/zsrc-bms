<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form-pp" :model="formData" inline>
          <FormItem label="流程类型" prop="lqlx" :label-width="80">
            <Select v-model="formData.lqlx" style="width:100px" :disable="this.loadData">
              <Option :value="0">全部</Option>
              <Option :value="1">关注调整</Option>
              <Option :value="2">跟进录入</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleSearchRd" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleCreateAttention" :loading="this.loadData">详细</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="handleSponsorAttention (row, index)">删除</Button>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="searchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

    <Modal v-model="showAttentionAction" :loading="dataSaving" scrollable :title="actionTitle" width="700" ok-text="提交"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      @on-ok="handleSaveChange">
      <AttentionAction @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow_="saveNow" :rowData="{}" :selOption="{}" :actionType="this.actionType"></AttentionAction>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import AttentionAction from '_c/chg-attention/attention-action'

export default {
  components: {
    AttentionAction
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
      loadData: false,
      windowHeight: 0,
      dataSet: [],
      showAttentionAction: false,
      dataSaving: true,
      actionTitle: '',
      actionType: '', // view || create || modify
      saveNow: false
    }
  },
  methods: {
    initInfo () {

    },
    handleDateChange () {

    },
    handleCreateAttention () {
      this.actionType = 'create'
      this.actionTitle = '发起调整关注类别'
      this.showAttentionAction = true
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
        this.searchRd()
      })
    },
    handleSearchRd () {

    },
    searchRd () {

    },
    handleShowDetail () {

    },
    handleSelectEmp () {
      this.showSelectEmp = true
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
