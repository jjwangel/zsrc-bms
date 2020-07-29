<template>
  <div>
    <Form ref="formII" :model="formData" :label-width="100" :show-message="false">
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
          <FormItem label="积分日期" prop="inteDate" class="info_title">
            <DatePicker type="date" @on-change="handleDateChange" :editable="false" style="width:100%;" :value="formData.inteDate" :clearable="false" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="积分分值" prop="inteCent" class="info_title">
            <InputNumber v-model="formData.inteCent" style="width: 100%;" :min="0" :precision="2" :active-change="false" @on-change="handleInteCentChange" :readonly="this.action==='view'"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="存在问题" prop="exitIssu" class="info_title">
        <Input type="textarea" v-model="formData.exitIssu" show-word-limit :maxlength="500" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="业务种类或条线" prop="operType" class="info_title">
        <Input type="textarea" v-model="formData.operType" show-word-limit :maxlength="100" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="积分依据" prop="inteAcco" class="info_title">
        <Input type="textarea" v-model="formData.inteAcco" show-word-limit :maxlength="500" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="检查项目名称" prop="checkName" class="info_title">
        <Input type="textarea" v-model="formData.checkName" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="实施机构" prop="actuInst" class="info_title">
        <Input type="textarea" v-model="formData.actuInst" show-word-limit :maxlength="10" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="备注" prop="bz" class="info_title">
        <Input type="textarea" v-model="formData.bz" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="导入员工工号" prop="createUser" class="info_title">
            <Input v-model="formData.createUser" :readonly="true"></Input>
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
          <FormItem label="修改员工姓名" prop="updateUserName" class="info_title">
            <Input v-model="formData.updateUserName" :readonly="true"></Input>
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
import { modifyEmpIllegalIntegral } from '@/api/emp-manage/emp-import'
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
    handleInteCentChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.inteCent = 0
        })
      }
    },
    handleDateChange (val) {
      this.formData.inteDate = val
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '轻微违规积分信息',
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
      this.formData.exitIssu = this.trimForText(this.formData.exitIssu)
      this.formData.operType = this.trimForText(this.formData.operType)
      this.formData.inteAcco = this.trimForText(this.formData.inteAcco)
      this.formData.checkName = this.trimForText(this.formData.checkName)
      this.formData.actuInst = this.trimForText(this.formData.actuInst)
      this.formData.bz = this.trimForText(this.formData.bz)

      let data = {
        id: this.formData.id,
        inteDate: this.formData.inteDate,
        inteCent: this.formData.inteCent,
        exitIssu: this.formData.exitIssu,
        operType: this.formData.operType,
        inteAcco: this.formData.inteAcco,
        checkName: this.formData.checkName,
        actuInst: this.formData.actuInst,
        bz: this.formData.bz
      }

      modifyEmpIllegalIntegral(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '保存数据成功！',
            duration: 3
          })
          this.$emit('saveSuccess', this.formData._index, Object.assign({}, data, {
            updateUser: this.employeeNo(),
            updateUserName: this.userName(),
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
