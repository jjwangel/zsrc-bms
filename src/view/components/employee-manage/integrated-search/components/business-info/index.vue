<template>
  <div>
    <Card dis-hover>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-business" :columns="col_business" :data="data_business">
      </Table>
    </Card>
  </div>
</template>

<script>
import { getEmpBusinessList } from '@/api/emp-manage/emp-search'
import { col_business } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      col_business,
      data_business: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true

      const condition = {
        employeeNo: this.main_data.employeeNo
      }

      getEmpBusinessList(condition).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_business = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_business = []
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
