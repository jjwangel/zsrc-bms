<template>
  <div>
      <Form ref="formForce" :rules="ruleForce" :show-message="false" :model="formData" :label-width="100">
        <FormItem label="执行机构名称" prop="forceOrgName" class="info_title">
          <Input v-model="formData.forceOrgName" :readonly="this.operate==='view'"></Input>
        </FormItem>
        <FormItem label="执行标的" prop="forceDesc" class="info_title">
          <Input v-model="formData.forceDesc" :readonly="this.operate==='view'"></Input>
        </FormItem>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="执行状态" prop="forceStatu" class="info_title">
              <Select :value="formData.forceStatu" :label-in-value="true" @on-change="handleForceStatuChg" :disabled="this.operate==='view'">
                <Option v-for="item in this.sel_option.selForceStatu" :value="item.key" :key="item.key">{{ item.value }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
  </div>
</template>

<script>
import { modifyEmpForceInfo, addEmpForceInfo } from '@/api/self-info/info-fill'
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
          content: '执行机构名称不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateDesc = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '执行标的不能为空！',
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
      ruleForce: {
        forceOrgName: [
          { validator: validateOrgName, trigger: 'change' }
        ],
        forceDesc: [
          { validator: validateDesc, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleForceStatuChg ({ value, label }) {
      this.formData.forceStatu = value
      this.formData.forceStatuText = label
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工被强制执行信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.forceOrgName = this.trimForText(this.formData.forceOrgName)
      this.formData.forceDesc = this.trimForText(this.formData.forceDesc)

      this.$refs['formForce'].validate((valid) => {
        if (valid) {
          let data = {
            credDate: this.rptDate,
            forceOrgName: this.formData.forceOrgName,
            forceDesc: this.formData.forceDesc,
            forceStatu: this.formData.forceStatu
          }

          if (this.operate === 'modify') { // 修改记录
            modifyEmpForceInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                  forceStatuText: this.formData.forceStatuText
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
            addEmpForceInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id,
                  forceStatuText: this.formData.forceStatuText
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
      this.$refs['formForce'].resetFields()
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
