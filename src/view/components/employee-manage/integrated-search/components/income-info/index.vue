<template>
  <div>
    <Card dis-hover>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-income" :columns="col_income" :data="data_income">
        <template slot-scope="{ row, index }" slot="capMonDuty">
          <span>{{ formatMoney(row.capMonDuty) }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="incoTol">
          <span>{{ formatMoney(row.incoTol) }}</span>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import { getEmpYearIncomeStat } from '@/api/emp-manage/emp-search'

export default {
  mixins: [mixinInfo],
  props: [
    'loadData',
    'mainData'],
  data () {
    return {
      refreshing: false,
      main_data: this.mainData,
      data_income: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true

      const condition = {
        employeeNo: this.main_data.employeeNo
      }

      getEmpYearIncomeStat(condition).then(res => {
        let data = res.data
        if (data.code === '000000') {
          this.data_income = data.data
        }
        this.refreshing = false
      }).catch(() => {
        this.data_income = []
        this.refreshing = false
      })
    }
  },
  watch: {
    mainData (val) {
      this.main_data = val
    },
    loadData (val) {
      if (val) this.handleRefreshData()
    }
  }
}
</script>
