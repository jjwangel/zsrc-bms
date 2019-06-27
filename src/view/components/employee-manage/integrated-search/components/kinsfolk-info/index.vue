<template>
  <div>
    <Card dis-hover>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-kinsfolk" :columns="col_kinsfolk" :data="data_kinsfolk">
      </Table>
    </Card>
  </div>
</template>

<script>
import { getEmpKinsfolkList } from '@/api/emp-manage/emp-search'
import { col_kinsfolk } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      col_kinsfolk,
      data_kinsfolk: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true

      const condition = {
        employeeNo: this.main_data.employeeNo
      }

      getEmpKinsfolkList(condition).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_kinsfolk = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_kinsfolk = []
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
