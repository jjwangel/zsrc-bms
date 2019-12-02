<template>
  <div>
    <Form ref="form" :rules="rules" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="排查类型" prop="type" class="info_title">
            <Select v-model="formData.type" :disabled="this.actionType==='view' || this.actionType==='modify'">
              <Option v-for="item in this.selOption.selCheckType" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="状态" prop="status" :label-width="50" class="info_title">
            <Select v-model="formData.status" :disabled="this.actionType==='view'">
              <Option :value="1">正常</Option>
              <Option :value="2">关闭</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form1" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="内容" prop="content" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.content" :rows="2" :autosize='{ minRows: 5, maxRows: 5 }' :readonly="this.actionType === 'view'"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { vaildForm } from '@/libs/j-tools.js'
import { addEmpCheckPublicParam, modifyEmpCheckPublicParam } from '@/api/emp-manage/emp-behavior-inspection'

export default {
  props: [
    'actionType',
    'selOption',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateType = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '请选择“排查类型”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateContent = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '排查类型内容不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      rules: {
        type: [
          { validator: validateType, trigger: 'blur' }
        ],
        content: [
          { validator: validateContent, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSaveDetail () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '排查项目参数',
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
      this.formData.content = this.trimForText(this.formData.content)

      let data = {
        content: this.formData.content,
        status: this.formData.status
      }

      if (this.actionType === 'modify') { // 修改记录
        modifyEmpCheckPublicParam(Object.assign({}, data, { id: this.formData.id })).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data))
          } else {
            this.$emit('saveCancel')
          }
        }).catch(() => {
          this.$emit('saveCancel')
        })
      } else { // 新增记录
        data.type = this.formData.type

        addEmpCheckPublicParam(data).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, res.data.data))
          } else {
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
