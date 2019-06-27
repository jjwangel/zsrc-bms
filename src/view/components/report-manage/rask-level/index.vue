<template>
  <div>
    <Card dis-hover>
      <div slot="title" class="info_title">
        数据日期：
        <DatePicker type="daterange" placement="bottom-start"
          style="width: 220px;margin-right: 10px"
          :value="date_value"
          @on-change="handleDateChange"
          :editable='false'></DatePicker>
        <ButtonGroup>
          <Button type="primary" icon="ios-search" :loading="this.load_data" @click='handleSearch'>查询</Button>
        </ButtonGroup>
      </div>
      <Table size="small" :loading="this.load_data" :stripe="true" border ref="tb-rl" :columns="col_rl" :data="data_rl">
      </Table>
    </Card>
  </div>
</template>

<script>
import { getRiskLevelRptList } from '@/api/rpt-stat/risk-level'
import { col_rl } from './common.js'
export default {
  data () {
    return {
      date_value: [],
      load_data: false,
      col_rl,
      data_rl: []
    }
  },
  methods: {
    handleSearch () {
      if (this.load_data) return

      this.load_data = true
      const formData = {}
      if (this.date_value.length > 0 && this.date_value[0] !== '') {
        formData.startDate = this.date_value[0]
        formData.endDate = this.date_value[1]
      }
      getRiskLevelRptList(formData).then(res => {
        let data = res.data
        if (data.code === '000000') {
          this.data_rl = data.data
        }
        this.load_data = false
      }).catch(() => {
        this.data_rl = []
        this.load_data = false
      })
    },
    handleDateChange (val) {
      this.date_value = val
    }
  },
  mounted () {
    this.handleSearch()
  }
}
</script>

<style scoped>
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
  </style>
