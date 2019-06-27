<template>
  <div>
    <Table size="small" @on-row-dblclick="handleShowDetail" :loading="this.refreshing" :stripe="true" border ref="tab-liab" :columns="col_liab" :data="data_liab">

      <template slot-scope="{ row, index }" slot="overDeptBal">
        <span>{{ formatMoney(row.overDeptBal) }}</span>
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
import { getEmpDebtList, delEmpDebtByBatch } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
import { col_liab } from './common.js'
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
        'debtType': 1,
        'debtTypeText': '',
        'overOrgName': '',
        'overDeptNum': 0,
        'overDeptBal': 0
      },
      col_liab,
      data_liab: []
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

      getEmpDebtList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_liab = res.data.data
        }

        this.refreshing = false
      }).catch(() => {
        this.data_liab = []
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

      delEmpDebtByBatch(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_liab.splice(index, 1)
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
        this.data_liab.push({
          id: data.id,
          debtType: data.debtType,
          debtTypeText: data.debtTypeText,
          overOrgName: data.overOrgName,
          overDeptNum: data.overDeptNum,
          overDeptBal: data.overDeptBal
        })
      } else {
        this.data_liab[rowIndex].debtType = data.debtType
        this.data_liab[rowIndex].debtTypeText = data.debtTypeText
        this.data_liab[rowIndex].overOrgName = data.overOrgName
        this.data_liab[rowIndex].overDeptNum = data.overDeptNum
        this.data_liab[rowIndex].overDeptBal = data.overDeptBal
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
      this.newRow.debtTypeText = this.selOption.selDebtType.find((item) => item.key === 1).value
    }
  }
}
</script>
