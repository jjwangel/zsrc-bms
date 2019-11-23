<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" inline>
          <FormItem label="流程类型" prop="type" :label-width="80">
            <Select v-model="formData.type" clearable style="width:200px" :disable="this.loadData">
              <Option :value="1">关注人员调整</Option>
              <Option :value="2">关注人员情况跟进登记</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleVerifyAttention" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="handleVerifyAttention(row, index)">办理</Button>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

    <Modal v-model="showVerifyAttention" :loading="dataSaving" scrollable title="关注人员调整流程" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="false"
      @on-ok="handleSaveChange">
      <AttentionAuditView @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow="saveNow" :rowData="this.selRow" :actionType="this.actionType"></AttentionAuditView>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import { getFlowsList } from '@/api/emp-manage/process-manage'
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
        type: 0
      },
      dataSet: [],
      loadData: false,
      selRow: {},
      showVerifyAttention: false,
      dataSaving: true,
      saveNow: false,
      actionTitle: '',
      actionType: '', // view || create || modify
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {
      this.handleSearchRd()
    },
    handleVerifyAttention (row, index) {
      this.selRow = Object.assign({}, row, { _index: index })
      this.actionType = 'create'
      this.showVerifyAttention = true
    },
    handleSponsorAttention (row, index) {

    },
    handleSaveChange () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveCancel () {
      this.dataSaving = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    },
    handleSaveSuccess (rowIndex) {
      this.dataSaving = false
      this.showVerifyAttention = false
      this.$nextTick(() => {
        this.dataSaving = true
        this.handleSearchRd()
      })
    },
    handleChgPageSize (size, current) {
      if (current) this.pageData.current = current
      this.pageData.size = size
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {
      if (this.loadData) return
      this.loadData = true

      const condition = {
        status: 1,
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.type && this.formData.type !== 0) {
        condition.type = this.formData.type
      }

      getFlowsList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data.rows
          this.pageData.total = res.data.data.total
        }
        this.loadData = false
      }).catch(() => {
        this.dataSet = []
        this.loadData = false
      })
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
