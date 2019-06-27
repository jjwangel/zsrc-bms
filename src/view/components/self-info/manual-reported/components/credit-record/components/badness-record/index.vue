<template>
  <div>
    <Table size="small" @on-row-dblclick="handleShowDetail" :loading="this.refreshing" :stripe="true" border ref="tab-badness" :columns="col_badness" :data="data_badness">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="handleModifyData (row, index)" :disabled="action === 'view'">修改</Button>
      </template>

      <div slot="footer" style="width:100%;text-align: center">
      </div>
    </Table>

    <Modal v-model="show_detail" scrollable :title="this.detail_title" width="600" ok-text="提交"
      :mask-closable="this.operate === 'view'"
      :footer-hide="this.operate === 'view'"
      :loading="data_saving"
      @on-ok="handleSaveDetail">
      <DetailInfo
        @saveCancel="handleSaveCancel"
        @saveSuccess="handleSaveSuccess"
        :saveData="saveNow" :row-data="this.detail_row" :operate="this.operate"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { getEmpBadRecList } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
import { col_badness } from './common.js'
import DetailInfo from './detail-info.vue'
export default {
  props: [
    'loadDetail',
    'action',
    'rptDate'
  ],
  components: {
    DetailInfo
  },
  data () {
    return {
      saveNow: false,
      data_saving: true,
      operate: '',
      detail_title: '',
      detail_row: {},
      show_detail: false,
      refreshing: false,
      col_badness,
      data_badness: []
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleSearchData () {
      this.refreshing = true
      const condition = {
        employeeNo: this.employeeNo(),
        credDate: this.rptDate
      }

      getEmpBadRecList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_badness = res.data.data
        }

        this.refreshing = false
      }).catch(() => {
        this.data_badness = []
        this.refreshing = false
      })
    },
    handleShowDetail (row, index) {
      this.operate = 'view'
      this.detail_title = '详细内容（只读）'
      this.detail_row = row
      this.show_detail = true
    },
    handleModifyData (row, index) {
      this.operate = 'modify'
      this.detail_title = '详细内容（修改）'
      this.detail_row = row
      this.show_detail = true
    },
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveSuccess (isNew, rowIndex, data) {
      if (isNew === false) {
        this.data_badness[rowIndex].credCardOverdueNum = data.credCardOverdueNum
        this.data_badness[rowIndex].dyaOverdue1 = data.dyaOverdue1
        this.data_badness[rowIndex].dyaOverdue1Text = data.dyaOverdue1Text
        this.data_badness[rowIndex].loanOverdueNum = data.loanOverdueNum
        this.data_badness[rowIndex].dyaOverdue2 = data.dyaOverdue2
        this.data_badness[rowIndex].dyaOverdue2Text = data.dyaOverdue2Text
      }

      this.data_saving = false
      this.show_detail = false
      this.$nextTick(() => {
        this.data_saving = true
      })
    },
    handleSaveCancel () {
      this.data_saving = false
      this.$nextTick(() => {
        this.data_saving = true
      })
    }
  },
  mounted () {

  },
  watch: {
    loadDetail (val) {
      if (val) {
        this.handleSearchData()
      }
    }
  }
}
</script>
