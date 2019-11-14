<template>
  <div>
    <Form ref="formAttentionAV" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="员工工号" prop="yggh" class="info_title">
            <Input v-model="formData.yggh" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="员工姓名" prop="ygxm" class="info_title">
            <Input v-model="formData.ygxm" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类别" prop="gzlb" class="info_title">
            <Input v-model="formData.gzlb" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类型" prop="gzlx" class="info_title">
            <Input v-model="formData.gzlx" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="开始关注日期" :label-width="107"  prop="kcgzrq" class="info_title">
            <Input v-model="formData.kcgzrq" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注时长" prop="gzsc" class="info_title">
            <Input v-model="formData.gzsc" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="解除日期" prop="jcrq" class="info_title">
            <Input v-model="formData.jcrq" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formAttentionAV2" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注原因描述" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
    </Form>

    <Row>
      <Col span="4" offset="20">
        <Button type="primary" @click="handleShowDetail">导出跟进情况记录</Button>
      </Col>
    </Row>

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

    <Modal v-model="showAttentionDetail"
      scrollable title="详细信息" width="1000"
      :mask-closable="true"
      :footer-hide="true"
      :styles="{top: '10px'}">
      <FollowDetailInfo :rowData="{}"></FollowDetailInfo>
    </Modal>

  </div>
</template>

<script>

import FollowDetailInfo from '_c/att-std-book-search/detail-info.vue'
import { mixinInfo } from './common.js'

export default {
  components: {
    FollowDetailInfo
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
      showAttentionDetail: false,
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
