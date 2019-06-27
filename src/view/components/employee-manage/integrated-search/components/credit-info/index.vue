<template>
  <div>
    <Card dis-hover>
      <Divider><font color='red'>负债信息区</font></Divider>
      <div style="margin:10px;">
        <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-debt" :columns="col_debt" :data="data_debt">
          <template slot-scope="{ row, index }" slot="overDeptBal">
            <span>{{ formatMoney(row.overDeptBal) }}</span>
          </template>
        </Table>
      </div>

      <Divider><font color='red'>不良记录信息区</font></Divider>
      <div style="margin:10px;">
        <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-badrec" :columns="col_badrec" :data="data_badrec">
        </Table>
      </div>

      <Divider><font color='red'>对外担保信息区</font></Divider>
      <div style="margin:10px;">
        <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-assu" :columns="col_assu" :data="data_assu">
          <template slot-scope="{ row, index }" slot="assuBal">
            <span>{{ formatMoney(row.assuBal) }}</span>
          </template>
        </Table>
      </div>

      <Divider><font color='red'>被强制执行信息区</font></Divider>
      <div style="margin:10px">
        <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-force" :columns="col_force" :data="data_force">
        </Table>
      </div>

      <Divider><font color='red'>征信报告附件</font></Divider>
      <Table size="small" :loading="this.refreshing" :stripe="true" border ref="selection" :columns="col_file" :data="data_file">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" :to="base_url + 'empcredstau/download?id=' + row.id" target="_blank" size="small">下载</Button>
        </template>
      </Table>

      <Divider></Divider>
      <Form ref="formCredit" :model="formData" :label-width="130" inline>
        <FormItem label="征信报告日期：" prop="credDate" class="info_title">
          <Input type="text" v-model="formData.credDate" :readonly="true"></Input>
        </FormItem>
        <FormItem label="征信报告复核人：" prop="verify_person" class="info_title">
          <Input type="text" v-model="formData.verify_person" :readonly="true"></Input>
        </FormItem>
        <FormItem label="复核日期：" prop="verify_date" class="info_title">
          <Input type="text" v-model="formData.verify_date" :readonly="true"></Input>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { getStartToLastDate, accAdd } from '@/libs/j-tools.js'
import { getEmpCreditInfo } from '@/api/emp-manage/emp-search'
import { col_debt, col_badrec, col_assu, col_force, col_file } from './common.js'
import config from '@/config'
export default {
  props: [
    'loadData',
    'mainData'],
  components: {

  },
  data () {
    return {
      main_data: this.mainData,
      refreshing: false,
      formData: {
        verify_person: '',
        verify_date: '',
        credDate: ''
      },
      base_url: '',
      col_debt,
      data_debt: [],
      col_badrec,
      data_badrec: [],
      col_assu,
      data_assu: [],
      col_force,
      data_force: [],
      col_file,
      data_file: []
    }
  },
  methods: {
    handleRefreshData () {
      if (this.refreshing) return
      this.refreshing = true

      const condition = {
        employeeNo: this.main_data.employeeNo,
        date_value: getStartToLastDate('year', new Date(`${this.main_data.year}-01-01`))
      }

      getEmpCreditInfo(condition).then(res => {
        let { credit, debtData, badrecData, assuData, forceData } = res
        if (credit.data.rows.length > 0) {
          if (debtData.data.code === '000000') {
            this.data_debt = debtData.data.data
            let sumBal = debtData.data.data.map((val) => val.overDeptBal)
            let sumNum = debtData.data.data.map((val) => val.overDeptNum)

            this.data_debt.push({
              overOrgName: '合计：',
              overDeptNum: (sumNum.length > 0 ? sumNum.reduce(function (prev, cur) {
                return accAdd(prev, cur)
              }) : 0),
              overDeptBal: this.formatMoney((sumBal.length > 0 ? sumBal.reduce(function (prev, cur) {
                return accAdd(prev, cur)
              }) : 0))
            })
          }

          if (badrecData.data.code === '000000') {
            this.data_badrec = badrecData.data.data
          }

          if (assuData.data.code === '000000') {
            this.data_assu = assuData.data.data

            let sumBal = assuData.data.data.map((val) => val.assuBal)
            this.data_assu.push({
              loanOrgName: '合计：',
              assuBal: this.formatMoney((sumBal.length > 0 ? sumBal.reduce(function (prev, cur) {
                return accAdd(prev, cur)
              }) : 0))
            })
          }

          if (forceData.data.code === '000000') {
            this.data_force = forceData.data.data
          }

          this.data_file = []
          if (credit.data.rows[0].fileName && credit.data.rows[0].fileName !== '') {
            this.data_file.push({
              id: credit.data.rows[0].id,
              fileName: credit.data.rows[0].fileName,
              impName: credit.data.rows[0].loadName,
              loadDatetime: credit.data.rows[0].loadDatetime
            })
          }

          this.formData.verify_person = credit.data.rows[0].loadName
          this.formData.verify_date = credit.data.rows[0].loadDatetime
          this.formData.credDate = credit.data.rows[0].credDate
        }

        this.refreshing = false
      }).catch(() => {
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
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
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
