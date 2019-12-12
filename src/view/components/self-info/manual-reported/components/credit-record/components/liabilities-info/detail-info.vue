<template>
  <div>
    <Form ref="formLiab" :rules="ruleLiab" :show-message="false" :model="formData" :label-width="110">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="负债类型" prop="debtType" class="info_title">
            <Select :value="formData.debtType" :label-in-value="true" @on-change="handleDebtTypeChg" :disabled="this.operate==='view'">
              <Option v-for="item in this.sel_option.selDebtType" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="负债（笔/张数）" :label-width="120" prop="overDeptNum" class="info_title">
            <InputNumber style='width:100%' v-model="formData.overDeptNum" :min="0" :precision="2" :active-change="false" @on-change="handleNumChange" :readonly="this.operate==='view'"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="负债余额" prop="overDeptBal" class="info_title">
            <div>
              <InputNumber style='width:80%' v-model="formData.overDeptBal" :min="0" :precision="2" :active-change="false" @on-change="handleBalChange" :readonly="this.operate==='view'"></InputNumber>
              <span style="margin-left: 10px">元</span>
            </div>
          </FormItem>
        </Col>
      </Row>

      <FormItem label="贷款机构全称" prop="overOrgName" class="info_title">
        <Input type="textarea" v-model="formData.overOrgName" :readonly="this.operate==='view'"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { modifyEmpDebtInfo, addEmpDebtInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'operate',
    'selOption',
    'rowData',
    'saveData',
    'rptDate'
  ],
  data () {
    const validateOrgName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '贷款机构全称不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateDeptNum = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '负债笔数/张数必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateDeptBal = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '负债余额必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      sel_option: this.selOption,
      dataSaving: false,
      ruleLiab: {
        overDeptNum: [
          { validator: validateDeptNum, trigger: 'change' }
        ],
        overDeptBal: [
          { validator: validateDeptBal, trigger: 'change' }
        ],
        overOrgName: [
          { validator: validateOrgName, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleNumChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.overDeptNum = 0
        })
      }
    },
    handleBalChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.overDeptBal = 0
        })
      }
    },
    handleDebtTypeChg ({ value, label }) {
      this.formData.debtType = value
      this.formData.debtTypeText = label
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工负债信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.overOrgName = this.trimForText(this.formData.overOrgName)

      this.$refs['formLiab'].validate((valid) => {
        if (valid) {
          let data = {
            credDate: this.rptDate,
            debtType: this.formData.debtType,
            overOrgName: this.formData.overOrgName,
            overDeptNum: this.formData.overDeptNum,
            overDeptBal: this.formData.overDeptBal
          }

          if (this.operate === 'modify') { // 修改记录
            modifyEmpDebtInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                  debtTypeText: this.formData.debtTypeText
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
          } else { // 新增记录
            addEmpDebtInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id,
                  debtTypeText: this.formData.debtTypeText
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
        } else {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
      })
    }
  },
  watch: {
    rowData (val) {
      this.$refs['formLiab'].resetFields()
      this.formData = Object.assign({}, val)
    },
    selOption (val) {
      this.sel_option = val
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
