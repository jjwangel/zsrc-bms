<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref="formProperty" :label-width="60" inline>
          <FormItem label="房产" class="info_title">
            <Input type="text" v-model="getHouseCount" :readonly="true">
              <p slot="append">套</p>
            </Input>
          </FormItem>
          <FormItem label="纯土地" class="info_title">
            <Input type="text" v-model="getLandCount" :readonly="true">
              <p slot="append">块</p>
            </Input>
          </FormItem>
          <FormItem label="汽车" class="info_title">
            <Input type="text" v-model="getCarCount" :readonly="true">
              <p slot="append">台</p>
            </Input>
          </FormItem>
        </Form>
      </div>
      <Divider><font color='red'>房产信息</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-house" :columns="col_house" :data="data_house">
            <template slot-scope="{ row, index }" slot="hdPrice">
              <span>{{ formatMoney(row.hdPrice) }}</span>
            </template>
          </Table>
        </div>

      <Divider><font color='red'>纯土地信息</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-land" :columns="col_land" :data="data_land">
            <template slot-scope="{ row, index }" slot="hdPrice">
              <span>{{ formatMoney(row.hdPrice) }}</span>
            </template>
          </Table>
        </div>

      <Divider><font color='red'>汽车信息</font></Divider>
        <div style="margin:10px;">
          <Table size="small" :loading="this.refreshing" :stripe="true" border ref="table-car" :columns="col_car" :data="data_car">
            <template slot-scope="{ row, index }" slot="carPrice">
              <span>{{ formatMoney(row.carPrice) }}</span>
            </template>
          </Table>
        </div>
    </Card>

  </div>
</template>

<script>
import { getEmpPropertyInfo } from '@/api/emp-manage/emp-search'
import { col_house, col_land, col_car } from './common.js'
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
      col_house,
      data_house: [],
      col_land,
      data_land: [],
      col_car,
      data_car: []
    }
  },
  computed: {
    getHouseCount () {
      return this.data_house.length
    },
    getLandCount () {
      return this.data_land.length
    },
    getCarCount () {
      return this.data_car.length
    }
  },
  methods: {
    handleRefreshData () {
      this.refreshing = true

      const condition = {
        employeeNo: this.main_data.employeeNo
      }

      getEmpPropertyInfo(condition).then(res => {
        let { carData, houseData, landData } = res
        if (carData && houseData && landData) {
          if (carData.data.code === '000000') {
            this.data_car = carData.data.data
          }

          if (houseData.data.code === '000000') {
            this.data_house = houseData.data.data
          }

          if (landData.data.code === '000000') {
            this.data_land = landData.data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_car = []
        this.data_house = []
        this.data_land = []
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
