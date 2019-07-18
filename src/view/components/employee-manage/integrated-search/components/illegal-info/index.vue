<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref="formIllegal" :label-width="140" inline>
          <FormItem :label="label1" class="info_title">
            <Input type="text" v-model="getBNDJF" :readonly="true">
              <p slot="append">分</p>
            </Input>
          </FormItem>
          <FormItem :label="label2" class="info_title">
            <Input type="text" v-model="getBNDWG" :readonly="true">
              <p slot="append">次</p>
            </Input>
          </FormItem>
          <FormItem :label="label3" class="info_title">
            <Input type="text" v-model="getBNDJJCF" :readonly="true">
              <p slot="append">元</p>
            </Input>
          </FormItem>
        </Form>
      </div>
      <Divider><font color='red'>轻微违规积分</font></Divider>
        <div style="margin:10px;">
            <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-integral" :columns="col_integral" :data="data_integral">
            </Table>
        </div>

      <Divider><font color='red'>严重违规</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-illegal" :columns="col_illegal" :data="data_illegal">
          </Table>
      </div>

      <Divider><font color='red'>经济处罚</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-punish" :columns="col_punish" :data="data_punish">
            <template slot-scope="{ row, index }" slot="pushBal">
              <span>{{ formatMoney(row.pushBal) }}</span>
            </template>
          </Table>
      </div>
    </Card>
  </div>
</template>

<script>
import { accAdd } from '@/libs/j-tools.js'
import { getEmpIllegalInfo } from '@/api/emp-manage/emp-search'
import { col_integral, col_illegal, col_punish } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  components: {

  },
  computed: {
    getBNDJF () {
      let money = 0
      for (let val of this.data_integral.values()) {
        money = accAdd(money, val.inteCent)
      }
      return money
    },
    getBNDWG () {
      return this.data_illegal.length
    },
    getBNDJJCF () {
      let money = 0
      for (let val of this.data_punish.values()) {
        money = accAdd(money, val.pushBal)
      }
      return this.formatMoney(money)
    }
  },
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      label1: '',
      label2: '',
      label3: '',
      col_integral,
      data_integral: [],
      col_illegal,
      data_illegal: [],
      col_punish,
      data_punish: []
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true
      const condition = {
        employeeNo: this.main_data.employeeNo
        // date_value: getStartToLastDate('year', new Date(`${this.main_data.year}-01-01`))
      }
      getEmpIllegalInfo(condition).then(res => {
        let { inteData, illeData, punishData } = res
        if (inteData && illeData && punishData) {
          if (inteData.data.code === '000000') {
            this.data_integral = inteData.data.data
          }

          if (illeData.data.code === '000000') {
            this.data_illegal = illeData.data.data
          }

          if (punishData.data.code === '000000') {
            this.data_punish = punishData.data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_integral = []
        this.data_illegal = []
        this.data_punish = []
        this.refreshing = false
      })
    }
  },
  watch: {
    mainData (val) {
      this.main_data = val
      this.label1 = `${val.year}年度积`
      this.label2 = `${val.year}年度严重违规`
      this.label3 = `${val.year}年度已经济处罚`
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
