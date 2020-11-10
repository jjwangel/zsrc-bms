<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" inline>
          <FormItem label="流程类型" prop="type" :label-width="80">
            <Select v-model="formData.type" clearable style="width:200px" :disable="this.loadData">
              <Option :value="1">关注人员调整</Option>
              <Option :value="2">关注人员情况跟进登记</Option>
              <Option :value="3">关注人员处置建议</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleDealProcess" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if='row.processType === 1' type="primary" size="small" @click="handleDealProcess(row, index)">办理</Button>
          <Button v-else type="success" size="small" @click="handleDealProcess(row, index)">查阅</Button>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <span style="float: left;margin-left: 10px">双击任意记录，显示详细信息</span>
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

    <Modal v-model="showVerifyFollow" :loading="dataSaving" scrollable title="关注人员跟进登记流程" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="false"
      @on-ok="handleFollowSaveChange">
      <FollowAuditView @saveCancel="handleFollowSaveCancel" @saveSuccess="handleFollowSaveSuccess" :saveNow="saveFollowNow" :rowData="this.selFollowRow" :actionType="this.actionType"></FollowAuditView>
    </Modal>

    <Modal v-model="showFollowSuggest" scrollable title="关注人员跟进处置建议" width="1000" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <FollowSuggest :rowData="this.selFollowSuggestRow" actionType="view"></FollowSuggest>
    </Modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { mixinInfo } from './common.js'
import { getFlowsList } from '@/api/emp-manage/process-manage'
import AttentionAuditView from '_c/chg-attention/attention-audit-view'
import FollowAuditView from '_c/att-follow/follow-audit-view'
import FollowSuggest from '_c/att-follow/follow-suggest'
import { finishFlow } from '@/api/base'

export default {
  components: {
    AttentionAuditView,
    FollowAuditView,
    FollowSuggest
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
      selFollowRow: {},
      selFollowSuggestRow: {},
      showVerifyAttention: false,
      showVerifyFollow: false,
      showFollowSuggest: false,
      dataSaving: true,
      saveNow: false,
      saveFollowNow: false,
      actionType: '', // view || create || modify
      windowHeight: 0
    }
  },
  computed: {
    ...mapGetters([
      'dealPending'
    ])
  },
  methods: {
    ...mapMutations([
      'setDealPending'
    ]),
    initInfo () {
      this.handleSearchRd()
    },
    handleDealProcess (row, index) {
      this.actionType = 'create'
      switch (row.type) {
        case 1:
          this.showVerifyAttention = true
          this.selRow = Object.assign({}, row, { _index: index })
          break
        case 2:
          this.showVerifyFollow = true
          this.selFollowRow = Object.assign({}, row, { _index: index })
          break
        case 3:
          this.showFollowSuggest = true
          this.selFollowSuggestRow = Object.assign({}, { id: row.relatedId, _index: index })

          const condition = {
            id: row.id
          }
          finishFlow(condition).then(res => {
            if (res.data.code === '000000') {
              this.handleSearchRd()
            } else {
              console.log(res.data.message)
            }
          }).catch(() => {

          })
          break
      }
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
      this.setDealPending('PROCESS-MANAGE')
      this.$nextTick(() => {
        this.dataSaving = true
        this.setDealPending(undefined)
        this.handleSearchRd()
      })
    },
    handleFollowSaveChange () {
      this.saveFollowNow = true
      this.$nextTick(() => {
        this.saveFollowNow = false
      })
    },
    handleFollowSaveCancel () {
      this.dataSaving = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    },
    handleFollowSaveSuccess (rowIndex) {
      this.dataSaving = false
      this.showVerifyFollow = false
      this.setDealPending('PROCESS-MANAGE')
      this.$nextTick(() => {
        this.dataSaving = true
        this.setDealPending(undefined)
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
        orderBy: 'create_time',
        orderType: 'desc',
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
  watch: {
    dealPending (v) {
      if (v && v !== 'PROCESS-MANAGE') this.handleSearchRd()
    }
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
