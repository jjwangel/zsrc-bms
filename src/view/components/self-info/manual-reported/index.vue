<template>
  <div>
    <Tabs type="card" value="income_info" :animated="false" name='tab-mr' @on-click="handleTabsClick">
      <TabPane label="员工其他收入" name="income_info" tab="tab-mr">
        <IncomeInfo></IncomeInfo>
      </TabPane>
      <TabPane label="员工房产信息" name="house_info" tab="tab-mr">
        <HouseInfo :load-data="this.load_house"></HouseInfo>
      </TabPane>
      <TabPane label="员工纯土地信息" name="land_info" tab="tab-mr">
        <LandInfo :load-data="this.load_land"></LandInfo>
      </TabPane>
      <TabPane label="员工汽车信息" name="car_info" tab="tab-mr">
        <CarInfo :load-data="this.load_car"></CarInfo>
      </TabPane>
      <TabPane label="员工股金信息" name="shares_info" tab="tab-mr">
        <SharesInfo :load-data="this.load_shares"></SharesInfo>
      </TabPane>
      <TabPane label="员工证券、投资信息" name="investment_info" tab="tab-mr">
        <InvestmentInfo :load-data="this.load_investment"></InvestmentInfo>
      </TabPane>
      <TabPane label="员工银行账户信息" name="bank_account" tab="tab-mr">
        <BankAccountInfo :load-data="this.load_bank"></BankAccountInfo>
      </TabPane>
      <TabPane label="员工征信信息" name="credit_record" tab="tab-mr">
        <CreditRecord :load-data="this.load_credit"></CreditRecord>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import IncomeInfo from './components/income-info'
import HouseInfo from './components/house-info'
import LandInfo from './components/land-info'
import CarInfo from './components/car-info'
import SharesInfo from './components/shares-info'
import InvestmentInfo from './components/investment-info'
import BankAccountInfo from './components/bank-account'
import CreditRecord from './components/credit-record'

export default {
  name: 'SelfManualReported',
  components: {
    IncomeInfo,
    HouseInfo,
    LandInfo,
    CarInfo,
    SharesInfo,
    InvestmentInfo,
    BankAccountInfo,
    CreditRecord
  },
  data () {
    return {
      load_house: false,
      load_land: false,
      load_car: false,
      load_shares: false,
      load_investment: false,
      load_bank: false,
      load_credit: false
    }
  },
  methods: {
    handleTabsClick (val) {
      switch (val) {
        case 'house_info': {
          this.load_house = true
          break
        }
        case 'land_info': {
          this.load_land = true
          break
        }
        case 'car_info': {
          this.load_car = true
          break
        }
        case 'shares_info': {
          this.load_shares = true
          break
        }
        case 'investment_info': {
          this.load_investment = true
          break
        }
        case 'bank_account': {
          this.load_bank = true
          break
        }
        case 'credit_record': {
          this.load_credit = true
          break
        }
      }
    }
  }
}
</script>
