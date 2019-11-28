<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="排查类型" prop="type" class="info_title">
            <Select v-model="formData.type" clearable :disable="this.loadData" style="width: 150px;">
              <Option v-for="item in this.selOption.selCheckType" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="状态" prop="status" :label-width="50" class="info_title">
            <Select v-model="formData.status" clearable :disable="this.loadData" style="width: 100px;">
              <Option :value="1">正常</Option>
              <Option :value="2">关闭</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <ButtonGroup>
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleCreateData" :loading="this.loadData">增加</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>

    <div style="margin-left: 10px;margin-top: 10px;">
      <Table size="small" :height="400" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="handleModifyData (row, index)">修改</Button>
          <Poptip
            confirm
            title="你确认删除这条项目吗？"
            @on-ok="handleDeleteByOne (row, index)">
            <Button type="error" size="small" :disabled="refreshing">删除</Button>
          </Poptip>
        </template>
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </div>

    <Modal v-model="showInsParaDetail" :loading="this.dataSaving" :title="this.dtlTitle" scrollable width="700"
      :mask-closable="this.actionType === 'view'"
      :footer-hide="this.actionType === 'view'"
      ok-text="提交"
      @on-ok="handleSaveDetail"
      :styles="{top: '10px'}">
      <InsParaDetailInfo  @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow="saveNow" :rowData="this.detailRow" :actionType="this.actionType" :selOption="this.selOption"></InsParaDetailInfo>
    </Modal>

  </div>
</template>

<script>

import InsParaDetailInfo from '_c/emp-behavior-inspection/inspection-parameter-mng/detail-info.vue'
import { getEmpCheckPublicParamsList, deleteEmpCheckPublicParam } from '@/api/emp-manage/emp-behavior-inspection'
import { getSingleSelectOptionData } from '@/api/base'
import { mixinInfo } from './common.js'
import { formatSingleSelectOption } from '@/libs/j-tools.js'

export default {
  components: {
    InsParaDetailInfo
  },
  mixins: [ mixinInfo ],
  props: [

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
      formData: {
        type: undefined,
        status: undefined
      },
      newRow: {
        id: 0,
        type: undefined,
        status: 1,
        content: ''
      },
      detailRow: {},
      selOption: {
        selCheckType: []
      },
      showInsParaDetail: false,
      saveNow: false,
      actionType: '', // view || create || modify
      dtlTitle: '111',
      dataSaving: true,
      refreshing: false
    }
  },
  methods: {
    initInfo () {
      getSingleSelectOptionData({ type: 'CHECK_PROJECT_TYPE' }).then(res => {
        if (res.data.code === '000000') {
          this.selOption.selCheckType = formatSingleSelectOption(res.data.data)
        }
      }).catch(() => {

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
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.type) {
        condition.type = this.formData.type
      }
      if (this.formData.status) {
        condition.status = this.formData.status
      }

      getEmpCheckPublicParamsList(condition).then(res => {
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
      this.actionType = 'view'
      this.dtlTitle = '详细内容（只读）'
      this.detailRow = Object.assign({}, row)
      this.showInsParaDetail = true
    },
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleCreateData () {
      this.actionType = 'create'
      this.dtlTitle = '详细内容（新增）'
      this.detailRow = Object.assign({}, this.newRow)
      this.showInsParaDetail = true
    },
    handleModifyData (row, index) {
      this.actionType = 'modify'
      this.dtlTitle = '详细内容（修改）'
      this.detailRow = Object.assign({}, row)
      this.showInsParaDetail = true
    },
    handleDeleteByOne (row, index) {
      this.refreshing = true
      const condition = {
        id: row.id
      }

      deleteEmpCheckPublicParam(condition).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '删除数据成功！',
            duration: 3
          })
          this.dataSet.splice(index, 1)
        }

        this.refreshing = false
      }).catch(() => {
        this.refreshing = false
      })
    },
    handleSaveCancel () {
      this.dataSaving = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    },
    handleSaveSuccess (isNew, rowIndex, data) {
      if (isNew) {
        this.dataSet.push({
          id: data.id,
          type: data.type,
          typeText: data.typeText,
          content: data.content,
          status: data.status
        })
      } else {
        this.dataSet[rowIndex].status = data.status
        this.dataSet[rowIndex].content = data.content
      }

      this.dataSaving = false
      this.showInsParaDetail = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    }
  },
  mounted () {
    this.initInfo()
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
