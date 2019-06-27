<template>
  <div>
    <Table size="small" @on-row-dblclick="handleShowDetail" :loading="this.refreshing" :stripe="true" border ref="tab-assu" :columns="col_assu" :data="data_assu">

      <template slot-scope="{ row, index }" slot="assuBal">
        <span>{{ formatMoney(row.assuBal) }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="handleModifyData (row, index)" :disabled="action === 'view'">修改</Button>
        <Poptip
          confirm
          title="你确认删除这条内容吗？"
          @on-ok="handleDeleteByOne (row, index)">
          <Button type="error" size="small" :disabled="action === 'view' || refreshing">删除</Button>
        </Poptip>
      </template>

      <div slot="footer" style="width:100%;text-align: center">
        <Button type="primary" size="small" @click="handleCreateData (null, 0)" :disabled="action === 'view' || refreshing" style="width: 60px;">增加</Button>
      </div>
    </Table>

    <Modal v-model="show_detail" scrollable :title="this.detail_title" width="650" ok-text="提交"
      :mask-closable="this.operate === 'view'"
      :footer-hide="this.operate === 'view'"
      :loading="data_saving"
      @on-ok="handleSaveDetail">
      <DetailInfo
        @saveCancel="handleSaveCancel"
        @saveSuccess="handleSaveSuccess"
        :saveData="saveNow" :row-data="this.detail_row" :operate="this.operate" :selOption="this.selOption" :rpt-date="this.rptDate"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { getEmpAssuList, delEmpAssuByBatch } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
import { getFormatDate } from '@/libs/j-tools.js'
import { col_assu } from './common.js'
import DetailInfo from './detail-info.vue'
export default {
  props: [
    'loadDetail',
    'action',
    'rptDate',
    'selOption'
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
      newRow: {
        'id': 0,
        'loanOrgName': '',
        'assuBal': 0,
        'assuMode': 1,
        'assuModeText': '',
        'assuName': '',
        'assuRale': '',
        'loan5sta': 1,
        'loan5staText': '',
        'loanOpenDate': '',
        'loanEndDate': getFormatDate('yyyy-MM-dd'),
        'assuStau': 1,
        'assuStauText': ''
      },
      col_assu,
      data_assu: []
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

      getEmpAssuList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_assu = res.data.data
        }

        this.refreshing = false
      }).catch(() => {
        this.data_assu = []
        this.refreshing = false
      })
    },
    handleShowDetail (row, index) {
      this.operate = 'view'
      this.detail_title = '详细内容（只读）'
      this.detail_row = row
      this.show_detail = true
    },
    handleCreateData () {
      this.operate = 'create'
      this.detail_title = '详细内容（新增）'
      this.detail_row = Object.assign({}, this.newRow)
      this.show_detail = true
    },
    handleModifyData (row, index) {
      this.operate = 'modify'
      this.detail_title = '详细内容（修改）'
      this.detail_row = row
      this.show_detail = true
    },
    handleDeleteByOne (row, index) {
      this.refreshing = true
      const condition = [row.id]

      delEmpAssuByBatch(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_assu.splice(index, 1)
          this.$Message.success({
            content: '删除数据成功！',
            duration: 3
          })
        }

        this.refreshing = false
      }).catch(() => {
        this.refreshing = false
      })
    },
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveSuccess (isNew, rowIndex, data) {
      if (isNew) {
        this.data_assu.push({
          id: data.id,
          loanOrgName: data.loanOrgName,
          assuBal: data.assuBal,
          assuMode: data.assuMode,
          assuModeText: data.assuModeText,
          assuName: data.assuName,
          assuRale: data.assuRale,
          loan5sta: data.loan5sta,
          loan5staText: data.loan5staText,
          loanOpenDate: data.loanOpenDate,
          loanEndDate: data.loanEndDate,
          assuStau: data.assuStau,
          assuStauText: data.assuStauText
        })
      } else {
        this.data_assu[rowIndex].loanOrgName = data.loanOrgName
        this.data_assu[rowIndex].assuBal = data.assuBal
        this.data_assu[rowIndex].assuMode = data.assuMode
        this.data_assu[rowIndex].assuModeText = data.assuModeText
        this.data_assu[rowIndex].assuName = data.assuName
        this.data_assu[rowIndex].assuRale = data.assuRale
        this.data_assu[rowIndex].loan5sta = data.loan5sta
        this.data_assu[rowIndex].loan5staText = data.loan5staText
        this.data_assu[rowIndex].loanOpenDate = data.loanOpenDate
        this.data_assu[rowIndex].loanEndDate = data.loanEndDate
        this.data_assu[rowIndex].assuStau = data.assuStau
        this.data_assu[rowIndex].assuStauText = data.assuStauText
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
    },
    selOption (val) {
      this.newRow.assuModeText = this.selOption.selAssuMode.find((item) => item.key === 1).value
      this.newRow.loan5staText = this.selOption.selLoan5sta.find((item) => item.key === 1).value
      this.newRow.assuStauText = this.selOption.selAssuStau.find((item) => item.key === 1).value
    }
  }
}
</script>
