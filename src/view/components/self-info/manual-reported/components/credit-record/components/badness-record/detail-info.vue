<template>
  <div>
    <Form ref="formBadRec" :rules="ruleBadRec" :show-message="false" :model="formData" :label-width="100">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="所有信用卡累计逾期次数" prop="credCardOverdueNum" class="info_title">
            <InputNumber style='width:100%' :precision="0" :active-change="false" v-model="formData.credCardOverdueNum" :min="0" @on-change="handleCardNumChange" :readonly="this.operate==='view'"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="是否存在超90天以上逾期" prop="dyaOverdue1" class="info_title">
            <Select :value="formData.dyaOverdue1" :label-in-value="true" @on-change="handleDue1Chg" :disabled="this.operate==='view'">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="所有贷款累计逾期次数" prop="loanOverdueNum" class="info_title">
            <InputNumber style='width:100%' :precision="0" :active-change="false" v-model="formData.loanOverdueNum" :min="0" @on-change="handleLoanNumChange" :readonly="this.operate==='view'"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="是否存在超90天以上逾期" prop="dyaOverdue2" class="info_title">
            <Select :value="formData.dyaOverdue2" :label-in-value="true" @on-change="handleDue2Chg" :disabled="this.operate==='view'">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { modifyEmpBadRecInfo } from '@/api/self-info/info-fill'
export default {
  props: [
    'operate',
    'rowData',
    'saveData'
  ],
  data () {
    const validateCardNum = (rule, value, callback) => {
      if ((!value || value === 0) && this.formData.dyaOverdue1 === 1) {
        this.$Message.warning({
          content: '所有信用卡累计逾期次数必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateLoanNum = (rule, value, callback) => {
      if ((!value || value === 0) && this.formData.dyaOverdue2 === 1) {
        this.$Message.warning({
          content: '所有贷款累计逾期次数必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      dataSaving: false,
      ruleBadRec: {
        credCardOverdueNum: [
          { validator: validateCardNum, trigger: 'change' }
        ],
        loanOverdueNum: [
          { validator: validateLoanNum, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleCardNumChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.credCardOverdueNum = 0
        })
      }
    },
    handleLoanNumChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.loanOverdueNum = 0
        })
      }
    },
    handleDue1Chg ({ value, label }) {
      this.formData.dyaOverdue1 = value
      this.formData.dyaOverdue1Text = label
    },
    handleDue2Chg ({ value, label }) {
      this.formData.dyaOverdue2 = value
      this.formData.dyaOverdue2Text = label
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工不良记录信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true

      this.$refs['formBadRec'].validate((valid) => {
        if (valid) {
          let data = {
            credCardOverdueNum: this.formData.credCardOverdueNum,
            dyaOverdue1: this.formData.dyaOverdue1,
            loanOverdueNum: this.formData.loanOverdueNum,
            dyaOverdue2: this.formData.dyaOverdue2
          }

          modifyEmpBadRecInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
            if (res.data.code === '000000') {
              this.$Message.success({
                content: '保存数据成功！',
                duration: 3
              })
              this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                dyaOverdue1Text: this.formData.dyaOverdue1Text,
                dyaOverdue2Text: this.formData.dyaOverdue2Text
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
      this.$refs['formBadRec'].resetFields()
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
