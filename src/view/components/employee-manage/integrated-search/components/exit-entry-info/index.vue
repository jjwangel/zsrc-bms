<template>
  <div>
    <Card dis-hover>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-ee" :columns="col_ee" :data="data_ee">
      </Table>
    </Card>
  </div>
</template>

<script>
import { getEmpEEList } from '@/api/emp-manage/emp-search'
import { col_ee } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      col_ee,
      data_ee: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true
      const condition = {
        employeeNo: this.main_data.employeeNo,
        orderBy: 'inco_app_date',
        orderType: 'desc'
      }

      getEmpEEList(condition).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_ee = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_ee = []
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
