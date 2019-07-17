<template>
  <div>
    <Card dis-hover>
      <Table size="small"  @on-row-dblclick="handleShowDetail" :loading="this.refreshing" :stripe="true" border ref="table-fv" :columns="col_family" :data="data_family">
        <div slot="footer" style="width:90%;text-align: center">
          <span style="float: left;margin-left: 10px">双击任意记录，显示详细信息</span>
        </div>
      </Table>
    </Card>

    <Card dis-hover v-show='show_family_info' style="margin-top: 10px">
      <div slot="title">
        <Form ref="formFV" :model="formData" :label-width="140" inline>
          <FormItem label="家访日期" prop="hocaDate" class="info_title">
            <Input type="text" v-model="formData.hocaDate" :readonly="true" style="width: 150px"></Input>
          </FormItem>
          <FormItem label="被访人姓名" prop="hocaName" class="info_title">
            <Input type="text" v-model="formData.hocaName" :readonly="true" style="width: 150px"></Input>
          </FormItem>
          <FormItem label="与员工关系" prop="hocaCon" class="info_title">
            <Input type="text" v-model="formData.hocaCon" :readonly="true" style="width: 150px"></Input>
          </FormItem>
          <FormItem label="是否存在异常情况" prop="unconvTypeText" class="info_title">
            <Input type="text" v-model="formData.unconvTypeText" :readonly="true" style="width: 150px"></Input>
          </FormItem>
          <FormItem label="导入批次号" prop="batNum" class="info_title">
            <Input type="text" v-model="formData.batNum" :readonly="true" style="width: 150px"></Input>
          </FormItem>
        </Form>
      </div>

      <Form ref="formDetail" :model="formData" :label-width="130">
        <FormItem label="异常情况描述" style="margin-bottom: 20px;" prop="unconvDesc" class="info_title">
          <Input type="textarea" :rows="5" :autosize='{ minRows: 3, maxRows: 5 }' v-model="formData.unconvDesc" :readonly="true"></Input>
        </FormItem>
        <FormItem label="被访人建议" style="margin-bottom: 20px;" prop="hocaNameAdu" class="info_title">
          <Input type="textarea" :rows="5" :autosize='{ minRows: 3, maxRows: 5 }' v-model="formData.hocaNameAdu" :readonly="true"></Input>
        </FormItem>
        <FormItem label="采取措施" style="margin-bottom: 20px;" prop="takeSept" class="info_title">
          <Input type="textarea" :rows="5" :autosize='{ minRows: 3, maxRows: 5 }' v-model="formData.takeSept" :readonly="true"></Input>
        </FormItem>
        <FormItem label="目前跟进情况" style="margin-bottom: 20px;" prop="recnCom" class="info_title">
          <Input type="textarea" :rows="5" :autosize='{ minRows: 3, maxRows: 5 }' v-model="formData.recnCom" :readonly="true"></Input>
        </FormItem>
        <FormItem label="家访工作情况小结" style="margin-bottom: 20px;" prop="hocaRes" class="info_title">
          <Input type="textarea" :rows="5" :autosize='{ minRows: 3, maxRows: 5 }' v-model="formData.hocaRes" :readonly="true"></Input>
        </FormItem>
        <FormItem label="家访工作小组意见" style="margin-bottom: 20px;" prop="hocaAdu" class="info_title">
          <Input type="textarea" :rows="5" :autosize='{ minRows: 3, maxRows: 5 }' v-model="formData.hocaAdu" :readonly="true"></Input>
        </FormItem>
      </Form>
      <Form ref="formFloot1" :model="formData" :label-width="130" inline>
        <FormItem label="导入员工工号：" prop="impNo" class="info_title">
          <Input type="text" v-model="formData.impNo" :readonly="true"></Input>
        </FormItem>
        <FormItem label="导入员工姓名：" prop="impName" class="info_title">
          <Input type="text" v-model="formData.impName" :readonly="true"></Input>
        </FormItem>
        <FormItem label="导入日期：" prop="impDate" class="info_title">
          <Input type="text" v-model="formData.impDate" :readonly="true"></Input>
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px"></div>
      <Form ref="formFloot2" :model="formData" :label-width="130" inline>
        <FormItem label="修改员工工号：" prop="updateUser" class="info_title">
          <Input type="text" v-model="formData.updateUser" :readonly="true"></Input>
        </FormItem>
        <FormItem label="修改员工姓名：" prop="updateName" class="info_title">
          <Input type="text" v-model="formData.updateName" :readonly="true"></Input>
        </FormItem>
        <FormItem label="修改日期：" prop="updateTime" class="info_title">
          <Input type="text" v-model="formData.updateTime" :readonly="true"></Input>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { getStartToLastDate } from '@/libs/j-tools.js'
import { getEmpFamilyVisitList } from '@/api/emp-manage/emp-search'
import { col_family } from './common.js'
export default {
  props: [
    'loadData',
    'mainData'],
  name: 'FamilyVisitInfo',
  components: {

  },
  data () {
    return {
      main_data: this.mainData,
      show_family_info: false,
      refreshing: false,
      formData: {
        batNum: '',
        name: '',
        deptType: '',
        deptName: '',
        hocaDate: '',
        hocaName: '',
        hocaCon: '',
        unconvType: '',
        unconvTypeText: '',
        unconvDesc: '',
        takeSept: '',
        recnCom: '',
        hocaRes: '',
        hocaAdu: '',
        hocaNameAdu: '',
        impDate: '',
        impNo: '',
        impName: '',
        bz: '',
        updateUser: '',
        updateName: '',
        updateTime: ''
      },
      col_family,
      data_family: []
    }
  },
  methods: {
    handleShowDetail (row, index) {
      this.formData.batNum = row.batNum
      this.formData.name = row.name
      this.formData.deptType = row.deptType
      this.formData.deptName = row.deptName
      this.formData.hocaDate = row.hocaDate
      this.formData.hocaName = row.hocaName
      this.formData.hocaCon = row.hocaCon
      this.formData.unconvType = row.unconvType
      this.formData.unconvTypeText = row.unconvTypeText
      this.formData.unconvDesc = row.unconvDesc
      this.formData.takeSept = row.takeSept
      this.formData.recnCom = row.recnCom
      this.formData.hocaRes = row.hocaRes
      this.formData.hocaAdu = row.hocaAdu
      this.formData.hocaNameAdu = row.hocaNameAdu
      this.formData.impDate = row.impDate
      this.formData.impNo = row.impNo
      this.formData.impName = row.impName
      this.formData.bz = row.bz
      this.formData.updateUser = row.updateUser
      this.formData.updateName = row.updateName
      this.formData.updateTime = row.updateTime

      this.show_family_info = true
    },
    handleRefreshData () {
      this.refreshing = true
      let _date = getStartToLastDate('year', new Date(`${this.main_data.year}-01-01`))
      const condition = {
        employeeNo: this.main_data.employeeNo,
        hocaDateStart: _date[0],
        hocaDateEnd: _date[1]
      }

      getEmpFamilyVisitList(condition).then(res => {
        let { fvData } = res
        if (fvData) {
          if (fvData.data.code === '000000') {
            this.data_family = fvData.data.data
          }
        }
        this.refreshing = false
      }).catch(() => {
        this.data_family = []
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
