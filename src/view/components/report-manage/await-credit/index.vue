<template>
  <div>
    <Card dis-hover>
      <div slot="title" class="info_title">
        <Button type="primary" icon="ios-search" :loading="this.searching" @click='this.handleSearchMain'>刷新</Button>
      </div>
      <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_ac_inst" :data="data_ac_main"
        :loading="this.searching"
        height=300
        @on-row-dblclick="searchDetail">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current"
            @on-change="searchMain"
            @on-page-size-change="handleChgPageMainSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>
    <div style="height:10px"></div>
    <Card dis-hover>
      <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_ac_detail" :data="data_ac_detail"
        :loading="this.searching_detail"
        height=500>
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageDetail.total" :current.sync="pageDetail.current"
            @on-change="searchDetail"
            @on-page-size-change="handleChgPageDetailSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>
  </div>
</template>

<script>
import { getAwaitCreditRptList, getAwaitCreditDetailRptList } from '@/api/rpt-stat/await-credit'
import { mixinInfo } from './common.js'

export default {
  mixins: [mixinInfo],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      pageDetail: {
        total: 0,
        current: 1,
        size: 10
      },
      current_deptCode: undefined,
      searching: false,
      searching_detail: false,
      data_ac_main: [],
      data_ac_detail: []
    }
  },
  methods: {
    handleChgPageMainSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchMain()
      })
    },
    handleSearchMain () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchMain()
      })
    },
    searchMain () {
      if (this.searching) return
      this.searching = true
      this.data_ac_detail = []
      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size
      }

      getAwaitCreditRptList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_ac_main = res.data.data.rows
          this.pageData.total = res.data.data.total
        }

        this.searching = false
      }).catch(() => {
        this.data_ac_main = []
        this.searching = false
      })
    },
    handleChgPageDetailSize (val) {
      this.pageDetail.size = val
      this.$nextTick(() => {
        this.searchDetail()
      })
    },
    searchDetail (row, index) {
      if (!this.current_deptCode && !row) return
      if (this.searching_detail) return
      this.searching_detail = true

      if (row) {
        this.current_deptCode = row.deptCode
      }
      const condition = {
        credStatu: 1,
        deptCode: this.current_deptCode,
        page: this.pageDetail.current,
        pageSize: this.pageDetail.size
      }

      getAwaitCreditDetailRptList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_ac_detail = res.data.data.rows
          this.pageDetail.total = res.data.data.total
        }

        this.searching_detail = false
      }).catch(() => {
        this.data_ac_detail = []
        this.searching_detail = false
      })
    }
  },
  mounted () {
    this.searchMain()
  }
}
</script>
<style scoped>

</style>
