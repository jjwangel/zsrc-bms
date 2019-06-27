<template>
  <div>
    <Form ref="formFV" :model="formData" :rules="ruleFV" :label-width="100" :show-message="false">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="导入批次号" prop="batNum" class="info_title">
            <Input v-model="formData.batNum" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="家访日期" prop="hocaDate" class="info_title">
            <DatePicker type="date" @on-change="handleDateChange" :editable="false" style="width:100%;" :value="formData.hocaDate" :clearable="false" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="员工姓名" prop="name" class="info_title">
            <Input v-model="formData.name" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所在单位" prop="deptType" class="info_title">
            <Input v-model="formData.deptType" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="部室/网点" prop="deptName" class="info_title">
            <Input v-model="formData.deptName" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="被访人姓名" prop="hocaName" class="info_title">
            <Input v-model="formData.hocaName" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="与员工关系" prop="hocaCon" class="info_title">
            <Input v-model="formData.hocaCon" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="存在异常情况" prop="unconvType" class="info_title">
            <Select :value="formData.unconvType" :label-in-value="true" @on-change="handleUnconvTypeChg" :disabled="this.action==='view' || this.dataSaving">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="异常情况描述" prop="unconvDesc" class="info_title">
        <Input type="textarea" v-model="formData.unconvDesc" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="被访人建议" prop="hocaNameAdu" class="info_title">
        <Input type="textarea" v-model="formData.hocaNameAdu" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="采取措施" prop="takeSept" class="info_title">
        <Input type="textarea" v-model="formData.takeSept" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="目前跟进情况" prop="recnCom" class="info_title">
        <Input type="textarea" v-model="formData.recnCom" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="工作情况小结" prop="hocaRes" class="info_title">
        <Input type="textarea" v-model="formData.hocaRes" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="工作小组意见" prop="hocaAdu" class="info_title">
        <Input type="textarea" v-model="formData.hocaAdu" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="备注" prop="bz" class="info_title">
        <Input type="textarea" v-model="formData.bz" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
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
          <FormItem label="修改员工姓名" prop="updateName" class="info_title">
            <Input v-model="formData.updateName" :readonly="true"></Input>
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
import { modifyEmpFamilyVisit } from '@/api/emp-manage/emp-import'
import { mapGetters } from 'vuex'
import { getFormatDate } from '@/libs/j-tools.js'

export default {
  props: [
    'action',
    'rowData',
    'saveData'
  ],
  data () {
    const validateUnconvDesc = (rule, value, callback) => {
      if (value === '') {
        if (this.formData.unconvType === 1) {
          this.$Message.warning({
            content: '异常情况选了“是”，因此异常情况描述不能为空！',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      dataSaving: false,
      ruleFV: {
        unconvDesc: [
          { validator: validateUnconvDesc, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo',
      'userName'
    ]),
    handleUnconvTypeChg ({ value, label }) {
      this.formData.unconvType = value
      this.formData.unconvTypeText = label
    },
    handleDateChange (val) {
      this.formData.hocaDate = val
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工家访信息',
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
      this.formData.unconvDesc = this.trimForText(this.formData.unconvDesc)
      this.formData.takeSept = this.trimForText(this.formData.takeSept)
      this.formData.recnCom = this.trimForText(this.formData.recnCom)
      this.formData.hocaRes = this.trimForText(this.formData.hocaRes)
      this.formData.hocaAdu = this.trimForText(this.formData.hocaAdu)
      this.formData.hocaNameAdu = this.trimForText(this.formData.hocaNameAdu)
      this.formData.bz = this.trimForText(this.formData.bz)

      this.$refs['formFV'].validate((valid) => {
        if (valid) {
          let data = {
            id: this.formData.id,
            hocaDate: this.formData.hocaDate,
            unconvType: this.formData.unconvType,
            unconvDesc: this.formData.unconvDesc,
            takeSept: this.formData.takeSept,
            recnCom: this.formData.recnCom,
            hocaRes: this.formData.hocaRes,
            hocaAdu: this.formData.hocaAdu,
            hocaNameAdu: this.formData.hocaNameAdu,
            bz: this.formData.bz
          }

          modifyEmpFamilyVisit(data).then(res => {
            if (res.data.code === '000000') {
              this.$Message.success({
                content: '保存数据成功！',
                duration: 3
              })
              this.$emit('saveSuccess', this.formData._index, Object.assign({}, data, {
                unconvTypeText: this.formData.unconvTypeText,
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
        } else {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
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
