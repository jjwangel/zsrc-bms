<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        处罚日期：
        <DatePicker type="daterange" placement="bottom-start"
          :clearable="false"
          :value="date_value"
          @on-change="handleDateChange"
          style="width: 200px;margin-right: 10px"
          :editable='false'></DatePicker>
        <ButtonGroup>
          <Button type="primary" icon="ios-search" :loading="this.load_data" @click='handleSearch'>查询</Button>
        </ButtonGroup>
      </div>
      <Table size="small" @on-row-dblclick="handleShowDetail" :loading="this.load_data" :stripe="true" border ref="tb-ep" :columns="col_ep" :data="data_ep">
        <template slot-scope="{ row, index }" slot="pushBal">
          <span>{{ formatMoney(row.pushBal) }}</span>
        </template>
      </Table>
    </Card>

    <Modal v-model="show_detail" scrollable title="详细内容（只读）" width="600" ok-text="提交" :footer-hide="true">
      <DetailInfo :rowData="this.detail_row"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEconomicList } from '@/api/self-info/info-search'
import { getStartToLastDate } from '@/libs/j-tools.js'
import DetailInfo from './detail-info.vue'
import { col_ep } from './common.js'
export default {
  components: {
    DetailInfo
  },
  data () {
    return {
      date_value: [],
      detail_row: {},
      load_data: false,
      show_detail: false,
      col_ep,
      data_ep: []
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleShowDetail (row, index) {
      this.detail_row = row
      this.show_detail = true
    },
    handleSearch () {
      if (this.load_data) return

      this.load_data = true
      const formData = {
        employeeNo: this.employeeNo(),
        pushDateStart: this.date_value[0],
        pushDateEnd: this.date_value[1]
      }

      getEconomicList(formData).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_ep = data.data
            if (this.data_ep.length === 0) {
              this.$Message.info({
                content: '找不到任何数据',
                duration: 3
              })
            }
          }
        }
        this.load_data = false
      }).catch(() => {
        this.data_ep = []
        this.load_data = false
      })
    },
    handleDateChange (val) {
      this.date_value = val
    }
  },
  mounted () {
    this.date_value = getStartToLastDate('year')
  }
}
</script>
