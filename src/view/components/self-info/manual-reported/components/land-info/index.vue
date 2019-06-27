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
      <Table size="small" :stripe="true" border ref="tab-land" :columns="col_land" :data="data_land" :loading="this.refreshing"
        @on-row-dblclick="handleShowDetail"
        @on-select="handleOnSelect"
        @on-select-cancel="handleOnSelectCancel"
        @on-select-all="handleOnSelectAll"
        @on-select-all-cancel="handleOnSelectAllCancel">

        <template slot-scope="{ row, index }" slot="hdPrice">
          <span>{{ formatMoney(row.hdPrice) }}</span>
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
      <DetailInfo @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveData="saveNow" :rowData="this.detail_row" :action="this.action" :selOption="this.sel_option"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { getEmpLandList, delEmpLandByBatch } from '@/api/self-info/info-fill'
import { formatSelectOption } from '@/libs/j-tools.js'
import { mapGetters } from 'vuex'
import DetailInfo from './detail-info.vue'
import { col_land } from './common.js'
import { getSelectOptionData } from '@/api/base'

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
      detail_title: '',
      col_land,
      data_land: [],
      sel_option: {},
      sel_id: [],
      newRow: {
        'id': 0,
        'hdAStaus': 1,
        'hdAStausText': '',
        'hdPro': 1,
        'hdProText': '',
        'hdSour': 1,
        'hdSourText': '',
        'hdUse': 21,
        'hdUseText': '',
        'hdArea': 0,
        'hdPrice': 0,
        'hdBuyDate': '',
        'hdAddr': '',
        'bz': ''
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    initInfo () {
      const optName = {
        type: [
          'HD_PRO',
          'HD_SOUR',
          'HD_LAND_USE',
          'HD_A_STAUS'
        ]
      }
      getSelectOptionData(optName).then(res => {
        if (res.data.code === '000000') {
          this.sel_option = {
            selHdPro: formatSelectOption(res.data.data.HD_PRO),
            selHdSour: formatSelectOption(res.data.data.HD_SOUR),
            selHdUse: formatSelectOption(res.data.data.HD_LAND_USE),
            selHdAStaus: formatSelectOption(res.data.data.HD_A_STAUS)
          }
          this.newRow.hdAStausText = this.sel_option.selHdAStaus.find((item) => item.key === 1).value
          this.newRow.hdProText = this.sel_option.selHdPro.find((item) => item.key === 1).value
          this.newRow.hdSourText = this.sel_option.selHdSour.find((item) => item.key === 1).value
          this.newRow.hdUseText = this.sel_option.selHdUse.find((item) => item.key === 21).value
        }
      }).catch(() => {

      })
    },
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
        title: '员工地产信息',
        content: '确定删除所选数据吗？',
        onOk: this.deleteByBatch
      })
    },
    deleteByBatch () {
      this.refreshing = true
      delEmpLandByBatch(this.sel_id).then(res => {
        if (res.data.code === '000000') {
          this.sel_id.forEach((id) => {
            for (let [index, row] of this.data_land.entries()) {
              if (row.id === id) {
                this.data_land.splice(index, 1)
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

      delEmpLandByBatch(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_land.splice(index, 1)
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
        hdAssType: 2
      }

      getEmpLandList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_land = res.data.data
        }

        this.refreshing = false
      }).catch(() => {
        this.data_land = []
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
        this.data_land.push({
          id: data.id,
          hdAStaus: data.hdAStaus,
          hdAStausText: data.hdAStausText,
          hdPro: data.hdPro,
          hdProText: data.hdProText,
          hdSour: data.hdSour,
          hdSourText: data.hdSourText,
          hdUse: data.hdUse,
          hdUseText: data.hdUseText,
          hdArea: data.hdArea,
          hdPrice: data.hdPrice,
          hdBuyDate: data.hdBuyDate,
          hdAddr: data.hdAddr,
          bz: data.bz
        })
      } else {
        this.data_land[rowIndex].hdAStaus = data.hdAStaus
        this.data_land[rowIndex].hdAStausText = data.hdAStausText
        this.data_land[rowIndex].hdPro = data.hdPro
        this.data_land[rowIndex].hdProText = data.hdProText
        this.data_land[rowIndex].hdSour = data.hdSour
        this.data_land[rowIndex].hdSourText = data.hdSourText
        this.data_land[rowIndex].hdUse = data.hdUse
        this.data_land[rowIndex].hdUseText = data.hdUseText
        this.data_land[rowIndex].hdArea = data.hdArea
        this.data_land[rowIndex].hdPrice = data.hdPrice
        this.data_land[rowIndex].hdBuyDate = data.hdBuyDate
        this.data_land[rowIndex].hdAddr = data.hdAddr
        this.data_land[rowIndex].bz = data.bz
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
  watch: {
    loadData (val) {
      if (val) {
        this.initInfo()
        this.handleRefreshData()
      }
    }
  }
}
</script>
