<template>
  <div>
    <Tabs ref="info_tabs" type="card" v-model="curr_tab" :animated="false" name='tab-emp-info' @on-click="handleTabsClick">
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_baseinfo' }) !== -1" label="员工基本信息" name="base_info" tab="tab-emp-info" :index=1>
        <BaseInfo :main-data="this.mainData" :load-data="this.load_base"></BaseInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_relative' }) !== -1" label="员工亲属关系" name="kinsfolk_info" tab="tab-emp-info" :index=2>
        <KinsfolkInfo :main-data="this.mainData" :load-data="this.load_kinsfolk"></KinsfolkInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_inoutinfo' }) !== -1" label="员工出入境信息" name="exit_entry_info" tab="tab-emp-info" :index=3>
        <ExitEntryInfo :main-data="this.mainData" :load-data="this.load_ee"></ExitEntryInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_incomeinfo' }) !== -1" label="员工收入信息" name="income_info" tab="tab-emp-info" :index=4>
        <IncomeInfo :main-data="this.mainData" :load-data="this.load_income"></IncomeInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_propertyinfo' }) !== -1" label="员工财产填报信息" name="property_info" tab="tab-emp-info" :index=5>
        <PropertyInfo :main-data="this.mainData" :load-data="this.load_property"></PropertyInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_investinfo' }) !== -1" label="员工投资信息" name="invest_info" tab="tab-emp-info" :index=6>
        <InvestInfo :main-data="this.mainData" :load-data="this.load_invest"></InvestInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_creditinfo' }) !== -1" label="员工征信信息" name="credit_info" tab="tab-emp-info" :index=7>
        <CreditInfo :main-data="this.mainData" :load-data="this.load_credit"></CreditInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_outlineinfo' }) !== -1" label="员工违规信息" name="illegal_info" tab="tab-emp-info" :index=8>
        <IllegalInfo :main-data="this.mainData" :load-data="this.load_illegal"></IllegalInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_bankacctinfo' }) !== -1" label="员工银行账户信息" name="bank_account_info" tab="tab-emp-info" :index=9>
        <BankAccountInfo :main-data="this.mainData" :load-data="this.load_ba"></BankAccountInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_homevisitinfo' }) !== -1" label="员工家访信息" name="family_visit_info" tab="tab-emp-info" :index=10>
        <FamilyVisitInfo :main-data="this.mainData" :load-data="this.load_fv"></FamilyVisitInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_bussinfo' }) !== -1" label="员工经商信息" name="business_info" tab="tab-emp-info" :index=11>
        <BusinessInfo :main-data="this.mainData" :load-data="this.load_business"></BusinessInfo>
      </TabPane>
      <TabPane v-if="this.pvCtrl.findIndex((val) => { return val.code === 'bms_employeemng_infoquery_suspectlawsuitinfo' }) !== -1" label="员工涉诉信息" name="litigation_info" tab="tab-emp-info" :index=12>
        <LitigationInfo :main-data="this.mainData" :load-data="this.load_litigation"></LitigationInfo>
      </TabPane>
      <TabPane v-if="true" label="员工关注台账" name="attention_info" tab="tab-emp-info" :index=13>
        <AttBookInfo :rowData="this.mainData" :load-data="this.load_attention"></AttBookInfo>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import BaseInfo from './components/base-info'
import KinsfolkInfo from './components/kinsfolk-info'
import ExitEntryInfo from './components/exit-entry-info'
import IncomeInfo from './components/income-info'
import PropertyInfo from './components/property-info'
import CreditInfo from './components/credit-info'
import IllegalInfo from './components/illegal-info'
import BankAccountInfo from './components/bank-account-info'
import FamilyVisitInfo from './components/family-visit-info'
import BusinessInfo from './components/business-info'
import LitigationInfo from './components/litigation-info'
import InvestInfo from './components/invest-info'
import AttBookInfo from './components/attention-book'

import { getPurviewCtrlList } from '@/api/base'

export default {
  props: [
    'mainData'
  ],
  name: 'SyntheticalSearchDetail',
  components: {
    BaseInfo,
    KinsfolkInfo,
    ExitEntryInfo,
    IncomeInfo,
    PropertyInfo,
    CreditInfo,
    IllegalInfo,
    BankAccountInfo,
    FamilyVisitInfo,
    BusinessInfo,
    LitigationInfo,
    InvestInfo,
    AttBookInfo
  },
  data () {
    return {
      pvCtrl: [],
      curr_tab: 'base_info',
      main_data: this.mainData,
      load_base: false,
      load_kinsfolk: false,
      load_ee: false,
      load_income: false,
      load_property: false,
      load_invest: false,
      load_credit: false,
      load_illegal: false,
      load_ba: false,
      load_fv: false,
      load_business: false,
      load_litigation: false,
      load_attention: false
    }
  },
  methods: {
    initInfo () {
      getPurviewCtrlList('bms_employeemng_infoquery').then(res => {
        if (res.data.code === '000000') {
          this.pvCtrl = res.data.data
        }
      }).catch(() => {

      })
    },
    handleTabsClick (val) {
      switch (val) {
        case 'base_info': {
          this.load_base = true
          break
        }
        case 'kinsfolk_info': {
          this.load_kinsfolk = true
          break
        }
        case 'exit_entry_info': {
          this.load_ee = true
          break
        }
        case 'income_info': {
          this.load_income = true
          break
        }
        case 'property_info': {
          this.load_property = true
          break
        }
        case 'invest_info': {
          this.load_invest = true
          break
        }
        case 'credit_info': {
          this.load_credit = true
          break
        }
        case 'illegal_info': {
          this.load_illegal = true
          break
        }
        case 'bank_account_info': {
          this.load_ba = true
          break
        }
        case 'family_visit_info': {
          this.load_fv = true
          break
        }
        case 'business_info': {
          this.load_business = true
          break
        }
        case 'litigation_info': {
          this.load_litigation = true
          break
        }
        case 'attention_info': {
          this.load_attention = true
          break
        }
      }
    }
  },
  watch: {
    mainData (val) {
      this.load_base = false
      this.load_kinsfolk = false
      this.load_ee = false
      this.load_income = false
      this.load_property = false
      this.load_invest = false
      this.load_credit = false
      this.load_illegal = false
      this.load_ba = false
      this.load_fv = false
      this.load_business = false
      this.load_litigation = false
      this.load_attention = false
      this.main_data = val

      this.$nextTick(function () {
        this.curr_tab = 'base_info'
        this.handleTabsClick('base_info')
      })
    }
  },
  created () {
    this.initInfo()
  }
}
</script>
