<template>
  <div>
    <Card shadow style="height:282px">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        {{this.todo_title}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleSearchRd">
        <Icon custom="iconfont icon-tubiao01"></Icon>
      </a>
      <Table size="small" @on-row-dblclick="handleDealProcess" :stripe="true" :loading="this.loadData" :border="false" :height="200" :show-header="false" ref="table" :columns="cols" :data="dataSet">
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
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { mixinInfo } from './common.js'
import '@/assets/bms_icons/iconfont.css'
import { getFlowsList } from '@/api/emp-manage/process-manage'
import AttentionAuditView from '_c/chg-attention/attention-audit-view'
import FollowAuditView from '_c/att-follow/follow-audit-view'
export default {
  components: {
    AttentionAuditView,
    FollowAuditView
  },
  mixins: [mixinInfo],
  props: [
    'todo_title'
  ],
  data () {
    return {
      dataSet: [],
      loadData: false,
      selRow: {},
      selFollowRow: {},
      showVerifyAttention: false,
      showVerifyFollow: false,
      dataSaving: true,
      saveNow: false,
      saveFollowNow: false,
      actionType: '' // view || create || modify
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
    handleSearchRd () {
      if (this.loadData) return
      this.loadData = true

      const condition = {
        orderBy: 'create_time',
        orderType: 'desc',
        status: 1,
        page: 1,
        pageSize: 40
      }

      getFlowsList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data.rows
        }
        this.loadData = false
      }).catch(() => {
        this.dataSet = []
        this.loadData = false
      })
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
      this.setDealPending('MAIN-PAGE')
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
      this.setDealPending('MAIN-PAGE')
      this.$nextTick(() => {
        this.setDealPending(undefined)
        this.dataSaving = true
        this.handleSearchRd()
      })
    }
  },
  mounted () {
    this.initInfo()
  },
  watch: {
    dealPending (v) {
      if (v && v !== 'MAIN-PAGE') this.handleSearchRd()
    }
  }
}
</script>
