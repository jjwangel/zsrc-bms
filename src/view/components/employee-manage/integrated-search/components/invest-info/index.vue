<template>
  <div>
    <Card>
      <div slot="title">
          <Form ref="formInvest" :label-width="100" inline>
            <FormItem label="持股金机构" class="info_title">
              <Input type="text" v-model="getGJJGCount" :readonly="true">
                <p slot="append">家</p>
              </Input>
            </FormItem>
            <FormItem label="共出资购股金" class="info_title">
              <Input type="text" v-model="getCZGJMoney" :readonly="true">
                <p slot="append">元</p>
              </Input>
            </FormItem>
            <FormItem label="证券投资" class="info_title">
              <Input type="text" v-model="getZQTZMoney" :readonly="true">
                <p slot="append">元</p>
              </Input>
            </FormItem>
            <FormItem label="投资合计" class="info_title">
              <Input type="text" v-model="getTZHJMoney" :readonly="true">
                <p slot="append">元</p>
              </Input>
            </FormItem>
          </Form>
      </div>
      <Divider><font color='red'>员工持股金信息</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-shares" :columns="col_shares" :data="data_shares">
            <template slot-scope="{ row, index }" slot="capPrice">
              <span>{{ formatMoney(row.capPrice) }}</span>
            </template>
          </Table>
        </div>

      <Divider><font color='red'>员工证券投资信息</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-security" :columns="col_security" :data="data_security">
            <template slot-scope="{ row, index }" slot="capPrice">
              <span>{{ formatMoney(row.capPrice) }}</span>
            </template>
          </Table>
        </div>
    </Card>

  </div>
</template>

<script>
import { accAdd } from '@/libs/j-tools.js'
import { getEmpInvestInfo } from '@/api/emp-manage/emp-search'
import { col_shares, col_security } from './common.js'

export default {
  props: [
    'loadData',
    'mainData'],
  components: {

  },
  computed: {
    getGJJGCount () {
      return this.data_shares.length
    },
    getCZGJMoney () {
      let money = 0
      for (let val of this.data_shares.values()) {
        money = accAdd(money, val.capPrice)
      }
      return this.formatMoney(money)
    },
    getZQTZMoney () {
      let money = 0
      for (let val of this.data_security.values()) {
        money = accAdd(money, val.capPrice)
      }
      return this.formatMoney(money)
    },
    getTZHJMoney () {
      let money1 = 0
      let money2 = 0
      for (let val of this.data_shares.values()) {
        money1 = accAdd(money1, val.capPrice)
      }
      for (let val of this.data_security.values()) {
        money2 = accAdd(money2, val.capPrice)
      }

      return this.formatMoney(accAdd(money1, money2))
    }
  },
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      col_shares,
      data_shares: [],
      col_security,
      data_security: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true
      const condition = {
        employeeNo: this.main_data.employeeNo
      }

      getEmpInvestInfo(condition).then(res => {
        let { capData, invData } = res
        if (capData && invData) {
          if (capData.data.code === '000000') {
            this.data_shares = capData.data.data
          }

          if (invData.data.code === '000000') {
            this.data_security = invData.data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_shares = []
        this.data_security = []
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

<style scoped>
  .ivu-form-item{
    margin-bottom: 0px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
