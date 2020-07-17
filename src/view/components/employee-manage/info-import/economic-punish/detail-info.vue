<template>
  <div>
    <Form ref="formEP" :model="formData" :label-width="100" :show-message="false">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="员工姓名" prop="name" class="info_title">
            <Input v-model="formData.name" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="所在单位" prop="deptType" class="info_title">
            <Input v-model="formData.deptType" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部室/网点" prop="deptName" class="info_title">
            <Input v-model="formData.deptName" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col span="12">
          <FormItem label="处罚日期" prop="pushDate" class="info_title">
            <DatePicker type="date" @on-change="handleDateChange" :editable="false" style="width:100%;" :value="formData.pushDate" :clearable="false" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="处罚金额" prop="pushBal" class="info_title">
            <InputNumber v-model="formData.pushBal" style="width: 100%;" :min="0" :precision="2" :active-change="false" @on-change="handlePushBalChange" :readonly="this.action==='view'"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="具体事项" prop="pushDesc" class="info_title">
        <Input type="textarea" v-model="formData.pushDesc" show-word-limit :maxlength="300" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="处罚依据" prop="pushAcc" class="info_title">
        <Input type="textarea" v-model="formData.pushAcc" show-word-limit :maxlength="300" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="实施处罚机构" prop="pushOrg" class="info_title">
        <Input type="textarea" v-model="formData.pushOrg" show-word-limit :maxlength="50" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="备注" prop="bz" class="info_title">
        <Input type="textarea" v-model="formData.bz" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="导入员工工号" prop="impNo" class="info_title">
            <Input v-model="formData.impNo" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="导入员工姓名" prop="impName" class="info_title">
            <Input v-model="formData.impName" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="导入日期" prop="impDate" class="info_title">
            <Input v-model="formData.impDate" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="修改员工工号" prop="updateUser" class="info_title">
            <Input v-model="formData.updateUser" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="修改员工姓名" prop="updateUser" class="info_title">
            <Input v-model="formData.updateUser" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="修改日期" prop="updateTime" class="info_title">
            <Input v-model="formData.updateTime" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { modifyEmpEconomicPunish } from '@/api/emp-manage/emp-import'
import { mapGetters } from 'vuex'
import { getFormatDate } from '@/libs/j-tools.js'

export default {
  props: [
    'action',
    'rowData',
    'saveData'
  ],
  data () {
    return {
      formData: this.rowData,
      dataSaving: false
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo',
      'userName'
    ]),
    handlePushBalChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.pushBal = 0
        })
      }
    },
    handleDateChange (val) {
      this.formData.pushDate = val
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '经济处罚信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.pushAcc = this.trimForText(this.formData.pushAcc)
      this.formData.pushDesc = this.trimForText(this.formData.pushDesc)
      this.formData.pushOrg = this.trimForText(this.formData.pushOrg)
      this.formData.bz = this.trimForText(this.formData.bz)

      let data = {
        id: this.formData.id,
        pushDate: this.formData.pushDate,
        pushBal: this.formData.pushBal,
        pushAcc: this.formData.pushAcc,
        pushDesc: this.formData.pushDesc,
        pushOrg: this.formData.pushOrg,
        bz: this.formData.bz
      }

      modifyEmpEconomicPunish(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '保存数据成功！',
            duration: 3
          })
          this.$emit('saveSuccess', this.formData._index, Object.assign({}, data, {
            updateUser: this.employeeNo(),
            updateName: this.userName(),
            updateTime: getFormatDate('yyyy-MM-dd hh:mm:ss')
          }))
          this.dataSaving = false
        } else {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
      }).catch(() => {
        this.$emit('saveCancel')
        this.dataSaving = false
      })
    }
  },
  watch: {
    rowData (val) {
      this.formData = Object.assign({}, val)
    },
    saveData (val) {
      if (val) this.handleSaveDetail()
    }
  }
}
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 8px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
