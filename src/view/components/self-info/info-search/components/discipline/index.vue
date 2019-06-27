<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        处罚日期：
        <DatePicker type="daterange" placement="bottom-start"
          style="width: 200px;margin-right: 10px"
          :clearable="false"
          :value="date_value"
          @on-change="handleDateChange"
          :editable='false'></DatePicker>
        <ButtonGroup>
          <Button type="primary" icon="ios-search" :loading="this.load_data" @click='handleSearch'>查询</Button>
        </ButtonGroup>
      </div>
      <Table size="small" @on-row-dblclick="handleShowDetail" :loading="this.load_data" :stripe="true" border ref="tb-discipline" :columns="col_discipline" :data="data_discipline">
      </Table>
    </Card>

    <Modal v-model="show_detail" scrollable title="详细内容（只读）" width="600" ok-text="提交" :footer-hide="true">
      <DetailInfo :rowData="this.detail_row"></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDisciplineList } from '@/api/self-info/info-search'
import { getStartToLastDate } from '@/libs/j-tools.js'
import DetailInfo from './detail-info.vue'
import { col_discipline } from './common.js'
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
      col_discipline,
      data_discipline: []
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

      getDisciplineList(formData).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_discipline = data.data
            if (this.data_discipline.length === 0) {
              this.$Message.info({
                content: '找不到任何数据',
                duration: 3
              })
            }
          }
        }
        this.load_data = false
      }).catch(() => {
        this.data_discipline = []
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
