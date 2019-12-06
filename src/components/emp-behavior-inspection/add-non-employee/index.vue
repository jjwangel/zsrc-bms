<template>
  <div>
    <Form ref="form" :rules="rules" :show-message="false" :model="formData" :label-width="70">
      <Row>
        <Col span="12">
          <FormItem label="姓名" prop="name" class="info_title">
            <Input type="text" v-model="formData.name"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="性别" prop="gender" class="info_title">
            <Select v-model="formData.gender">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="身份证" prop="idcardNo" class="info_title">
        <Input type="text" v-model="formData.idcardNo" :readonly="this.actionType === 'modify'"></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form1" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="备注" prop="remark" style="margin-left: 15px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="500" v-model="formData.remark" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }'></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { vaildForm } from '@/libs/j-tools.js'
import { addOffstaffEmployee, modifyOffstaffEmployee } from '@/api/emp-manage/emp-behavior-inspection'

export default {
  props: [
    'actionType',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateGender = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请选择“姓别”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '姓名不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateIdCardNo = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '身份证号不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!p.test(value)) {
          this.$Message.warning({
            content: '身份证号格式不正确！',
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
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        gender: [
          { validator: validateGender, trigger: 'blur' }
        ],
        idcardNo: [
          { validator: validateIdCardNo, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSaveDetail () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '编外人员',
          content: '确定保存吗？',
          onOk: this.saveDetail,
          onCancel: () => {
            this.$emit('saveCancel')
          }
        })
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      await vaildForm(this, 'form')
      await vaildForm(this, 'form1')
    },
    saveDetail () {
      this.formData.name = this.trimForText(this.formData.name)
      this.formData.idcardNo = this.trimForText(this.formData.idcardNo)
      this.formData.remark = this.trimForText(this.formData.remark)

      let data = {
        name: this.formData.name,
        idcardNo: this.formData.idcardNo,
        gender: this.formData.gender,
        remark: this.formData.remark
      }

      if (this.actionType === 'modify') { // 修改记录
        modifyOffstaffEmployee(Object.assign({}, data, { id: this.formData.id })).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, {
              name: this.formData.name
            }))
          } else {
            this.$emit('saveCancel')
          }
        }).catch(() => {
          this.$emit('saveCancel')
        })
      } else { // 新增记录
        addOffstaffEmployee(data).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.$emit('saveSuccess', true, undefined, Object.assign({}, res.data.data))
          } else {
            this.$Message.error({
              content: '该身份证号已存在！',
              duration: 5
            })
            this.$emit('saveCancel')
          }
        }).catch(() => {
          this.$emit('saveCancel')
        })
      }
    }
  },
  watch: {
    rowData (val) {
      this.$refs['form'].resetFields()
      this.$refs['form1'].resetFields()
      this.formData = Object.assign({}, val)
    },
    saveNow (val) {
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
