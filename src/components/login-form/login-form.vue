<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" :disabled="this.disableLogin" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" :disabled="this.disableLogin" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" :disabled="this.disableLogin" type="primary" :loading="logining" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { encryptStr } from '@/libs/j-tools'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    resetLogin: Boolean
  },
  data () {
    return {
      disableLogin: false,
      logining: false,
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.logining || this.disableLogin) return

      this.logining = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName.toUpperCase(),
            password: encryptStr(this.form.password)
          })
        }
      })
    }
  },
  mounted () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) { // 禁用IE登录
      this.disableLogin = true
      this.$Message.warning({
        content: '温馨提示：本系统不支持IE浏览器，请使用谷歌浏览！可通过 http://125.0.184.100 下载',
        duration: 20
      })
    }
  },
  watch: {
    resetLogin (val) {
      if (val) this.logining = false
    }
  }
}
</script>
