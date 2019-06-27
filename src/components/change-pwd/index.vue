<template>
  <div>
    <Form ref="formChgPwd" :rules="rulePwd" :show-message="false" :model="formData" :label-width="80">
      <FormItem label="旧密码" prop="oldPwd" class="info_title">
        <Input v-model="formData.oldPwd" type="password"></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPwd" class="info_title">
        <Input v-model="formData.newPwd" type="password"></Input>
      </FormItem>
      <FormItem label="确认新密码" prop="newPwd2" class="info_title">
        <Input v-model="formData.newPwd2" type="password"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { changeLoginPwd } from '@/api/base'
import { encryptStr } from '@/libs/j-tools'
export default {
  props: [
    'saveData'
  ],
  data () {
    const validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入旧密码！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入新密码！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateNewPwd2 = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请再次输入新密码！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value !== this.formData.newPwd) {
          this.$Message.warning({
            content: '两次新密码输入不一致！',
            duration: 5
          })
          callback(new Error(''))
        } else {
          if (value.length < 6) {
            this.$Message.warning({
              content: '密码长度不能少于6位！',
              duration: 5
            })
            callback(new Error(''))
          } else {
            if (value === this.formData.oldPwd) {
              this.$Message.warning({
                content: '新旧密码不能相同！',
                duration: 5
              })
              callback(new Error(''))
            } else {
              callback()
            }
          }
        }
      }
    }

    return {
      formData: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      rulePwd: {
        oldPwd: [
          { validator: validateOldPwd, trigger: 'change' }
        ],
        newPwd: [
          { validator: validateNewPwd, trigger: 'change' }
        ],
        newPwd2: [
          { validator: validateNewPwd2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSaveChg () {
      this.$Modal.confirm({
        title: '修改登录密码',
        content: '确定修改密码吗？',
        onOk: this.changePwd,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    changePwd () {
      this.formData.oldPwd = this.trimForText(this.formData.oldPwd)
      this.formData.newPwd = this.trimForText(this.formData.newPwd)
      this.formData.newPwd2 = this.trimForText(this.formData.newPwd2)

      this.$refs['formChgPwd'].validate((valid) => {
        if (valid) {
          let data = {
            newPwd: encryptStr(this.formData.newPwd),
            oldPwd: encryptStr(this.formData.oldPwd)
          }

          changeLoginPwd(data).then(res => {
            if (res.data.code === '000000') {
              this.$Message.success({
                content: '修改密码成功！',
                duration: 3
              })
              this.formData.oldPwd = ''
              this.formData.newPwd = ''
              this.formData.newPwd2 = ''
              this.$refs['formChgPwd'].resetFields()
              this.$emit('saveSuccess')
            } else {
              if (res.data.code === '001103') {
                this.$emit('saveCancel')
                this.$Message.warning({
                  content: '你输入的旧密码不正确！',
                  duration: 3
                })
              }
            }
          }).catch(() => {
            this.$emit('saveCancel')
          })
        } else {
          this.$emit('saveCancel')
        }
      })
    }
  },
  watch: {
    saveData (val) {
      if (val) this.handleSaveChg()
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
