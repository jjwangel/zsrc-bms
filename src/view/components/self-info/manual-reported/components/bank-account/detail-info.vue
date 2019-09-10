<template>
  <div>
      <Form ref="formBank" :rules="ruleBank" :show-message="false" :model="formData" :label-width="100">
        <FormItem label="开户网点全称" prop="openOrgName" class="info_title">
          <Input v-model="formData.openOrgName" :readonly="this.action==='view'"></Input>
        </FormItem>
        <FormItem label="账号/卡号" prop="acctNo" class="info_title">
          <Input v-model="formData.acctNo" :readonly="this.action==='view'"></Input>
        </FormItem>
        <FormItem label="用途" prop="useDesc" class="info_title">
          <Input v-model="formData.useDesc" :readonly="this.action==='view'"></Input>
        </FormItem>
      </Form>
  </div>
</template>

<script>
import { modifyEmpBankInfo, addEmpBankInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'action',
    'rowData',
    'saveData'
  ],
  data () {
    const validateOrgName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '开户网点全称不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 30) {
          this.$Message.warning({
            content: '开户网点全称长度不能大于30个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateAcctNo = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '账号/卡号不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 30) {
          this.$Message.warning({
            content: '账号/卡号长度不能大于30个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          const pattern = /^([0-9]{1})(\d{10,29})$/
          if (!pattern.test(value)) {
            this.$Message.warning({
              content: '请正确输入账号/卡号！',
              duration: 5
            })
            callback(new Error(''))
          } else {
            callback()
          }
        }
      }
    }

    const validateUseDesc = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '用途不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 30) {
          this.$Message.warning({
            content: '用途长度不能大于30个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    return {
      formData: this.rowData,
      dataSaving: false,
      ruleBank: {
        openOrgName: [
          { validator: validateOrgName, trigger: 'change' }
        ],
        acctNo: [
          { validator: validateAcctNo, trigger: 'blur' }
        ],
        useDesc: [
          { validator: validateUseDesc, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工银行账号信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.openOrgName = this.trimForText(this.formData.openOrgName)
      this.formData.acctNo = this.trimForText(this.formData.acctNo)
      this.formData.useDesc = this.trimForText(this.formData.useDesc)

      this.$refs['formBank'].validate((valid) => {
        if (valid) {
          let data = {
            openOrgName: this.formData.openOrgName,
            acctNo: this.formData.acctNo,
            useDesc: this.formData.useDesc
          }

          if (this.action === 'modify') { // 修改记录
            modifyEmpBankInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, data)
                this.dataSaving = false
              } else {
                this.$emit('saveCancel')
                this.dataSaving = false
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的账号/卡号已存在，不能重复填报！',
                    duration: 3
                  })
                }
              }
            }).catch(() => {
              this.$emit('saveCancel')
              this.dataSaving = false
            })
          } else { // 新增记录
            addEmpBankInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id
                }))
                this.dataSaving = false
              } else {
                this.$emit('saveCancel')
                this.dataSaving = false
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的账号/卡号已存在，不能重复填报！',
                    duration: 3
                  })
                }
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
      this.$refs['formBank'].resetFields()
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
