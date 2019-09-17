<template>
  <div>
    <Card dis-hover>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-litigation" :columns="col_litigation" :data="data_litigation">
      </Table>
    </Card>
  </div>
</template>

<script>
// import { getStartToLastDate } from '@/libs/j-tools.js'
import { getEmpLitigationList } from '@/api/emp-manage/emp-search'
import { col_litigation } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      col_litigation,
      data_litigation: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true

      // let _date = getStartToLastDate('year', new Date(`${this.main_data.year}-01-01`))
      const condition = {
        employeeNo: this.main_data.employeeNo,
        orderBy: 'wade_date',
        orderType: 'desc'
        // wadeDateStart: _date[0],
        // wadeDateEnd: _date[1]
      }

      getEmpLitigationList(condition).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_litigation = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_litigation = []
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
