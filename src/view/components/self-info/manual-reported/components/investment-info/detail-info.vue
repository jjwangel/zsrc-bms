<template>
  <div>
    <Form ref="formInve" :rules="ruleInve" :show-message="false" :model="formData" :label-width="80">
      <FormItem label="投资类型" prop="capInveType" class="info_title">
        <Select :value="formData.capInveType" :label-in-value="true" @on-change="handleInveTypeChg" :disabled="this.action==='view'">
          <Option v-for="item in this.sel_option.selCapInveType" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="总投资金额" prop="capPrice" class="info_title">
        <div>
          <InputNumber style='width:90%' v-model="formData.capPrice" :min="0" :precision="2" :active-change="false" @on-change="handlePriceChange" :readonly="this.action==='view'"></InputNumber>
          <span style="margin-left: 10px">元</span>
        </div>
      </FormItem>
      <FormItem label="备注" prop="capBz" class="info_title">
        <Input type="textarea" v-model="formData.capBz" :readonly="this.action==='view'" :rows="2" :autosize='{ minRows: 2, maxRows: 2 }'></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { modifyEmpInveInfo, addEmpInveInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'action',
    'selOption',
    'rowData',
    'saveData'
  ],
  data () {
    const validateCapBz = (rule, value, callback) => {
      if (value === '') {
        if (this.formData.capInveTypeText === '其他') {
          this.$Message.warning({
            content: '部份选项存在“其他”，因此备注不能为空！',
            duration: 5
          })
          callback(new Error(''))
        }
      } else {
        if (value.length > 100) {
          this.$Message.warning({
            content: '备注长度不能大于100个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateCapPrice = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '总投资金额必需大于0 ！',
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
      ruleInve: {
        capPrice: [
          { validator: validateCapPrice, trigger: 'change' }
        ],
        capBz: [
          { validator: validateCapBz, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handlePriceChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.capPrice = 0
        })
      }
    },
    handleInveTypeChg ({ value, label }) {
      this.formData.capInveType = value
      this.formData.capInveTypeText = label
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工投资信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.capBz = this.trimForText(this.formData.capBz)

      this.$refs['formInve'].validate((valid) => {
        if (valid) {
          let data = {
            capType: 2,
            capInveType: this.formData.capInveType,
            capBz: this.formData.capBz,
            capPrice: this.formData.capPrice
          }

          if (this.action === 'modify') { // 修改记录
            modifyEmpInveInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                  capInveTypeText: this.formData.capInveTypeText
                }))
                this.dataSaving = false
              } else {
                this.$emit('saveCancel')
                this.dataSaving = false
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的投资类型已存在，不能重复填报！',
                    duration: 3
                  })
                }
              }
            }).catch(() => {
              this.$emit('saveCancel')
              this.dataSaving = false
            })
          } else { // 新增记录
            addEmpInveInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id,
                  capInveTypeText: this.formData.capInveTypeText
                }))
                this.dataSaving = false
              } else {
                this.$emit('saveCancel')
                this.dataSaving = false
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的投资类型已存在，不能重复填报！',
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
      this.$refs['formInve'].resetFields()
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
