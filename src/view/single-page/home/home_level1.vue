<template>
  <div>
    <Row :gutter="8">
      <Col span="16">
        <Row :gutter="8" style="margin-bottom: 10px" >
          <Col span="8">
            <Card shadow>
              <AttentionPie style="height: 250px;" :charData="this.attentionPieData"></AttentionPie>
            </Card>
          </Col>
          <Col span="16">
            <Card shadow>
              <AttentionLine :charData="this.attentionLineData" style="height: 250px;"/>
            </Card>
          </Col>
        </Row>
        <Row :gutter="8" style="margin-bottom: 10px" >
            <Col span="8">
              <Card shadow>
                <RiskPie style="height: 250px;" :charData="this.riskPieData"></RiskPie>
              </Card>
            </Col>
            <Col span="16">
              <Card shadow>
                <RiskLine :charData="this.riskLineData" style="height: 250px;"/>
              </Card>
            </Col>
          </Row>
          <Row :gutter="8" style="margin-bottom: 10px" >
              <Col span="8">
                <Card shadow>
                  <DebtPie style="height: 250px;" :charData="this.debtPieData"></DebtPie>
                </Card>
              </Col>
              <Col span="16">
                <Row :gutter="6">
                  <Col span="12">
                    <Card shadow style="height: 282px">
                      <p slot="title">
                        负债前10(不含按揭)
                      </p>
                      <!-- <a href="#" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        更多...
                      </a> -->
                      <Table style="cursor: pointer;" size="small" width="400px" @on-row-click="handleShowDetail" :loading="this.refreshing" :border="false" :height="200" ref="table-fz" :columns="col_fz" :data="data_fz">
                        <template slot-scope="{ row, index }" slot="latestDebtTotal">
                          <span>{{ formatMoney(row.latestDebtTotal) }}</span>
                        </template>
                      </Table>
                    </Card>
                  </Col>
                  <Col span="12">
                    <Card shadow style="height: 282px">
                      <p slot="title">
                        失信被执行人名单
                      </p>
                      <!-- <a href="#" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        更多...
                      </a> -->
                      <Table style="cursor: pointer;" size="small" @on-row-click="handleShowDetail" :loading="this.refreshing" :border="false" :height="200" ref="table-sx" :columns="col_sx" :data="data_sx">
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
      </Col>
      <Col span="8">
        <ToDo style="margin-bottom: 10px" todo_title="待办／待阅事项" :flag="1"></ToDo>
        <Card shadow>
          <div style="height: 544px;text-align: center">
            <!-- <img v-if="showZsMap" :src="zsMap" style="height: 544px;width: 100%;" alt=""> -->
            <iframe :src="mapSrc" v-if="showZsMap" scrolling="no" frameborder="0" style="top:0px;left: 0px;width: 100%;height: 100%;"></iframe>
          </div>
        </Card>
      </Col>
    </Row>

    <Modal v-model="show_detail" scrollable :title="detailTitle" fullscreen footer-hide>
      <DetailInfo :main-data="this.detail_data" init-tab='credit_info'></DetailInfo>
    </Modal>
  </div>
</template>

<script>
import { getAttentionCharList } from '@/api/rpt-stat/attention-stat'
import { getRiskCharList } from '@/api/rpt-stat/risk-level'
import { getDebtTop10List, getLostForceList, getDebttypeStat } from '@/api/rpt-stat/other-stat'
import { mapGetters } from 'vuex'
import AttentionLine from '_c/charts/attention-line'
import AttentionPie from '_c/charts/attention-pie'
import RiskLine from '_c/charts/risk-line'
import RiskPie from '_c/charts/risk-pie'
import DebtPie from '_c/charts/debt-pie'
import DetailInfo from '_v/components/employee-manage/integrated-search/detail-info.vue'
import { mixinInfoLevel1 } from './common.js'
import { getFormatDate } from '@/libs/j-tools.js'

import ToDo from './components/todo'
export default {
  name: 'home',
  components: {
    ToDo,
    AttentionLine,
    AttentionPie,
    RiskLine,
    RiskPie,
    DebtPie,
    DetailInfo
  },
  mixins: [mixinInfoLevel1],
  data () {
    return {
      refreshing: false,
      attentionLineData: [],
      attentionPieData: [],
      riskLineData: [],
      riskPieData: [],
      debtPieData: [],
      showZsMap: this.rolesCodeShort().findIndex((val) => val === 'bms_admin' || val === 'bms_01' || val === 'bms_02') !== -1,
      data_fz: [],
      data_sx: [],
      detailTitle: '',
      detail_data: {},
      show_detail: false,
      mapSrc: 'http://125.0.165.182:3838/proc-apps/focusperson_01/'
    }
  },
  methods: {
    ...mapGetters([
      'rolesCodeShort'
    ]),
    initInfo () {
      this.searchAttentionCharData()
      this.searchRiskCharData()
      this.searchDebtCharData()
      this.searchDebtTop10Data()
      this.searchLostForceData()
    },
    searchAttentionCharData () {
      this.refreshing = true

      getAttentionCharList({}).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.attentionLineData = data.data

            this.attentionPieData = [
              { name: '重点关注', value: data.data[data.data.length - 1].emphasisCount },
              { name: '一般关注', value: data.data[data.data.length - 1].commonCount }
            ]
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.attentionLineData = []
        this.attentionPieData = []
        this.refreshing = false
      })
    },
    searchRiskCharData () {
      this.refreshing = true

      getRiskCharList({}).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.riskLineData = data.data

            this.riskPieData = [
              { name: '高', value: data.data[data.data.length - 1].highCnt },
              { name: '中', value: data.data[data.data.length - 1].middleCnt },
              { name: '低', value: data.data[data.data.length - 1].lowCnt }
            ]
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.riskLineData = []
        this.riskPieData = []
        this.refreshing = false
      })
    },
    searchDebtCharData () {
      this.refreshing = true

      getDebttypeStat({}).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            const tmp = data.data.filter((val) => { return val.total > 0 })
            if (tmp.length > 0) {
              this.debtPieData = tmp.map((val) => { return { 'name': val.name, 'value': val.total } })
            } else {
              this.debtPieData = data.data.map((val) => { return { 'name': val.name, 'value': val.total } })
            }
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.debtPieData = []
        this.refreshing = false
      })
    },
    searchDebtTop10Data () {
      this.refreshing = true

      getDebtTop10List({}).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_fz = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_fz = []
        this.refreshing = false
      })
    },
    searchLostForceData () {
      this.refreshing = true

      getLostForceList({}).then(res => {
        let data = res.data
        if (data) {
          if (data.code === '000000') {
            this.data_sx = data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_sx = []
        this.refreshing = false
      })
    },
    handleShowDetail (row, index) {
      this.detailTitle = `详细内容（${row.employeeName} - ${row.employeeNo}）`
      this.show_detail = true
      this.detail_data = Object.assign({}, row, { year: getFormatDate('yyyy') })
    }
  },
  mounted () {
    this.initInfo()
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
