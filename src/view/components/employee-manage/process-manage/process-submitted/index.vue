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
          <FormItem label="接收时间" prop="recDate" class="info_title" :label-width="80">
            <DatePicker type="daterange" placement="bottom-start"
              style="width: 200px;margin-right: 10px"
              :value="formData.recDate"
              :options="optDate"
              @on-change="handleDateChange"
              :editable='false'></DatePicker>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowProcess" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <div slot="footer" style="width:100%;text-align: center">
          <span style="float: left;margin-left: 10px">双击任意记录，显示详细信息</span>
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

    <Modal v-model="showVerifyAttention" scrollable title="关注人员调整流程" width="1000" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <AttentionAuditView :rowData="this.selRow" :actionType="this.actionType"></AttentionAuditView>
    </Modal>

    <Modal v-model="showVerifyFollow" scrollable title="关注人员跟进登记流程" width="1000" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <FollowAuditView :rowData="this.selFollowRow" :actionType="this.actionType"></FollowAuditView>
    </Modal>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import { getFlowsList } from '@/api/emp-manage/process-manage'
import AttentionAuditView from '_c/chg-attention/attention-audit-view'
import FollowAuditView from '_c/att-follow/follow-audit-view'

export default {
  components: {
    AttentionAuditView,
    FollowAuditView
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
        type: 0,
        recDate: []
      },
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      dataSet: [],
      selRow: {},
      selFollowRow: {},
      loadData: false,
      showVerifyAttention: false,
      showVerifyFollow: false,
      actionType: '', // view || create || modify
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {
      this.handleSearchRd()
    },
    handleDateChange (val) {
      this.formData.recDate = val
    },
    handleShowProcess (row, index) {
      this.actionType = 'view'
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
        status: 2,
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.type && this.formData.type !== 0) {
        condition.type = this.formData.type
      }
      if (this.formData.recDate.length === 2 && this.formData.recDate[0] !== '' && this.formData.recDate[1] !== '') {
        condition.receiveTimeStart = this.formData.recDate[0]
        condition.receiveTimeEnd = this.formData.recDate[1]
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
