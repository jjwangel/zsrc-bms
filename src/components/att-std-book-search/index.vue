<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="员工姓名" prop="employeeName" class="info_title">
            <Input v-model="formData.employeeName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注类别" prop="focusType" class="info_title">
            <Input v-model="formData.focusType" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开始关注日期" :label-width="107" prop="focusDate" class="info_title">
            <Input v-model="formData.focusDate" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col span="12">
          <FormItem label="关注类型" prop="focusItem" class="info_title">
            <Input v-model="formData.focusItem" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="关注时长" prop="focusDuration" class="info_title">
            <Input v-model="formData.focusDuration" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="解除日期" prop="freeDate" class="info_title">
            <Input v-model="formData.freeDate" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form1" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注（调整）原因描述" prop="focusReason" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
    </Form>
    <div style="width: 100%;height: 30px;">
      <ButtonGroup style="float:right">
        <Button type="primary" @click="handleBackward" :disabled="this.currentIndex === 0 || this.loadData"><Icon type="ios-arrow-back"></Icon>上一条</Button>
        <Button type="primary" @click="handleForward" :disabled="this.currentIndex === this.bookRecords.length - 1 || this.loadData">下一条<Icon type="ios-arrow-forward"></Icon></Button>
        <Button Button type="success" icon="md-cloud-download"
          :to="downloadUrl + downloadPara" target="_blank"
          @click="handleDownloadFollow"
          :loading="this.downloading">导出跟进情况记录</Button>
      </ButtonGroup>
    </div>

    <div style="margin-left: 10px;margin-top: 10px;">
      <Table size="small" :height="400" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </div>

    <Modal v-model="showFollowDetail"
      scrollable title="详细信息" width="700"
      :mask-closable="true"
      :footer-hide="true"
      :styles="{top: '10px'}">
      <FollowDetailInfo :rowData="this.selRow"></FollowDetailInfo>
    </Modal>

  </div>
</template>

<script>

import FollowDetailInfo from '_c/att-std-book-search/detail-info.vue'
import { mixinInfo } from './common.js'
import { getFocusBooksRecords } from '@/api/emp-manage/attention-book'
import { getFocusPersonFollows } from '@/api/emp-manage/follow-attention'

export default {
  components: {
    FollowDetailInfo
  },
  mixins: [ mixinInfo ],
  props: [
    'rowData'
  ],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      dataSet: [],
      loadData: false,
      bookRecords: [],
      selRow: {},
      formData: {
        employeeNo: '',
        employeeName: '',
        focusType: 0,
        focusItem: '',
        focusDate: '',
        focusDuration: '',
        freeDate: '',
        focusReason: ''
      },
      currentIndex: 0,
      showFollowDetail: false,
      downloading: false,
      downloadUrl: '',
      base_url: '',
      downloadPara: ''
    }
  },
  methods: {
    initInfo (val) {
      this.currentIndex = 0
      this.selRow = {}
      const condition = {
        employeeNo: val.employeeNo
      }

      getFocusBooksRecords(condition).then(res => {
        if (res.data.code === '000000') {
          this.bookRecords = res.data.data
          this.setFormData(0)
        }
      }).catch(() => {
        this.bookRecords = []
      })
    },
    handleBackward () {
      this.currentIndex--
      this.setFormData(this.currentIndex)
    },
    handleForward () {
      this.currentIndex++
      this.setFormData(this.currentIndex)
    },
    setFormData (index) {
      if (this.bookRecords.length - 1 < index) return

      this.formData.employeeNo = this.bookRecords[index].employeeNo
      this.formData.employeeName = this.bookRecords[index].employeeName

      switch (this.bookRecords[index].focusType) {
        case 1: this.formData.focusType = '重点关注'
          break
        case 2: this.formData.focusType = '一般关注'
          break
        case 3: this.formData.focusType = '正常'
          break
      }
      this.formData.focusItem = this.bookRecords[index].focusItem
      this.formData.focusDate = this.bookRecords[index].focusDate
      this.formData.focusDuration = this.bookRecords[index].focusDuration
      this.formData.freeDate = this.bookRecords[index].freeDate
      this.formData.focusReason = this.bookRecords[index].focusReason
      this.formData.adjustFlowId = this.bookRecords[index].adjustFlowId

      this.handleChgPageSize(this.pageData.size, 1)
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
        page: this.pageData.current,
        pageSize: this.pageData.size,
        adjustFlowId: this.formData.adjustFlowId,
        approveStatus: 1
      }
      getFocusPersonFollows(condition).then(res => {
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
    handleShowDetail (row, index) {
      this.selRow = Object.assign({}, row)
      this.showFollowDetail = true
    },
    handleDownloadFollow () {
      if (this.downloading) return
      this.downloading = true

      this.downloadPara = `adjustFlowId=${this.formData.adjustFlowId}`

      this.$Message.info({
        content: '正在生成数据，请稍候......',
        duration: 5
      })

      setTimeout(() => {
        this.downloading = false
      }, 5000)
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? this.$config.baseUrl.pro : this.$config.baseUrl.dev)
    this.downloadUrl = this.base_url + 'focuspersonfollows/export?'
  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.initInfo(val)
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
