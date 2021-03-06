<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <ButtonGroup>
          <Button type="primary" icon="md-refresh" :loading="this.refreshing" @click="handleRefreshData">刷新</Button>
          <Button type="primary" icon="md-document" :disabled="this.refreshing" @click="handleCreateData">增加</Button>
          <Button type="error" icon="md-trash" @click="handleDeleteByBatch" :disabled="this.refreshing || this.sel_id.length == 0">批量删除</Button>
        </ButtonGroup>
      </div>
      <Table size="small" :stripe="true" border ref="tab-shares" :columns="col_shares" :data="data_shares" :loading="this.refreshing"
        @on-row-dblclick="handleShowDetail"
        @on-select="handleOnSelect"
        @on-select-cancel="handleOnSelectCancel"
        @on-select-all="handleOnSelectAll"
        @on-select-all-cancel="handleOnSelectAllCancel">

        <template slot-scope="{ row, index }" slot="capPrice">
          <span>{{ formatMoney(row.capPrice) }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="handleModifyData (row, index)">修改</Button>
          <Poptip
            confirm
            title="你确认删除这条内容吗？"
            @on-ok="handleDeleteByOne (row, index)">
            <Button type="error" size="small" :disabled="refreshing">删除</Button>
          </Poptip>
        </template>
      </Table>
      <div style="text-align: left;margin-top: 5px">双击任意记录，显示详细信息</div>
    </Card>

    <Modal v-model="show_detail" :loading="data_saving" scrollable :title="this.detail_title" width="600" ok-text="提交"
      :mask-closable="this.action === 'view'"
      :footer-hide="this.action === 'view'"
      @on-ok="handleSaveDetail">
      <DetailInfo @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveData="saveNow" :rowData="this.detail_row" :action="this.action"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { getEmpSharesList, delEmpSharesByBatch } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
import DetailInfo from './detail-info.vue'
import { col_shares } from './common.js'

export default {
  props: ['loadData'],
  components: {
    DetailInfo
  },
  data () {
    return {
      action: '', // view || create || modify
      detail_row: {},
      refreshing: false,
      load_data: this.loadData,
      show_detail: false,
      data_saving: true,
      saveNow: false,
      sel_id: [],
      detail_title: '',
      col_shares,
      data_shares: [],
      newRow: {
        'id': 0,
        'capName': '',
        'capNum': 0,
        'capPrice': 0
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    setSelectRowId (sel) {
      this.sel_id = []
      if (sel.length > 0) {
        for (let item of sel.values()) {
          this.sel_id.push(item.id)
        }
      }
    },
    handleDeleteByBatch () {
      if (this.sel_id.length === 0) return

      this.$Modal.confirm({
        title: '员工股金信息',
        content: '确定删除所选数据吗？',
        onOk: this.deleteByBatch
      })
    },
    deleteByBatch () {
      this.refreshing = true
      delEmpSharesByBatch(this.sel_id).then(res => {
        if (res.data.code === '000000') {
          this.sel_id.forEach((id) => {
            for (let [index, row] of this.data_shares.entries()) {
              if (row.id === id) {
                this.data_shares.splice(index, 1)
                break
              }
            }
          })
          this.sel_id = []
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
    handleDeleteByOne (row, index) {
      this.refreshing = true
      const condition = [row.id]

      delEmpSharesByBatch(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_shares.splice(index, 1)
          if (this.sel_id.includes(row.id)) {
            this.sel_id.splice(this.sel_id.indexOf(row.id), 1)
          }
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
    handleOnSelect (sel, row) {
      this.setSelectRowId(sel)
    },
    handleOnSelectCancel (sel, row) {
      this.setSelectRowId(sel)
    },
    handleOnSelectAll (sel) {
      this.setSelectRowId(sel)
    },
    handleOnSelectAllCancel (sel) {
      this.setSelectRowId(sel)
    },
    handleRefreshData () {
      this.refreshing = true
      const condition = {
        employeeNo: this.employeeNo(),
        capType: 1
      }

      getEmpSharesList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_shares = res.data.data
        }

        this.refreshing = false
      }).catch(() => {
        this.data_shares = []
        this.refreshing = false
      })
    },
    handleShowDetail (row, index) {
      this.action = 'view'
      this.detail_title = '详细内容（只读）'
      this.detail_row = Object.assign({}, row)
      this.show_detail = true
    },
    handleCreateData () {
      this.action = 'create'
      this.detail_title = '详细内容（新增）'
      this.detail_row = Object.assign({}, this.newRow)
      this.show_detail = true
    },
    handleModifyData (row, index) {
      this.action = 'modify'
      this.detail_title = '详细内容（修改）'
      this.detail_row = Object.assign({}, row)
      this.show_detail = true
    },
    handleSaveDetail () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveSuccess (isNew, rowIndex, data) {
      if (isNew) {
        this.data_shares.push({
          id: data.id,
          capName: data.capName,
          capNum: data.capNum,
          capPrice: data.capPrice
        })
      } else {
        this.data_shares[rowIndex].capName = data.capName
        this.data_shares[rowIndex].capNum = data.capNum
        this.data_shares[rowIndex].capPrice = data.capPrice
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
    loadData (val) {
      if (val) {
        this.handleRefreshData()
      }
    }
  }
}
</script>
