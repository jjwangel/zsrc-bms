<template>
  <div>
    <Table size="small" @on-row-dblclick="handleShowDetail" :loading="this.refreshing" :stripe="true" border ref="tab-force" :columns="col_force" :data="data_force">
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
import { getEmpForceList, delEmpForceByBatch } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
import { col_force } from './common.js'
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
        'forceOrgName': '',
        'forceDesc': '',
        'forceStatu': 1,
        'forceStatuText': ''
      },
      col_force,
      data_force: []
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

      getEmpForceList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_force = res.data.data
        }

        this.refreshing = false
      }).catch(() => {
        this.data_force = []
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

      delEmpForceByBatch(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_force.splice(index, 1)
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
        this.data_force.push({
          id: data.id,
          forceOrgName: data.forceOrgName,
          forceDesc: data.forceDesc,
          forceStatu: data.forceStatu,
          forceStatuText: data.forceStatuText
        })
      } else {
        this.data_force[rowIndex].forceOrgName = data.forceOrgName
        this.data_force[rowIndex].forceDesc = data.forceDesc
        this.data_force[rowIndex].forceStatu = data.forceStatu
        this.data_force[rowIndex].forceStatuText = data.forceStatuText
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
      this.newRow.forceStatuText = this.selOption.selForceStatu.find((item) => item.key === 1).value
    }
  }
}
</script>
