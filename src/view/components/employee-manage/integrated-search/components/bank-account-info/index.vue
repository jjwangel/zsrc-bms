<template>
  <div>
    <Card dis-hover>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-bank" :columns="col_bank" :data="data_bank">
      </Table>
    </Card>
  </div>
</template>

<script>
import { getEmpBankAcctList } from '@/api/emp-manage/emp-search'
import { col_bank } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      col_bank,
      data_bank: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true

      const condition = {
        employeeNo: this.main_data.employeeNo
      }

      getEmpBankAcctList(condition).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_bank = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_bank = []
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
