<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
          <p slot="extra" style="font-size: 10px;color: #c3c3c3;">
            {{bmsVersion}}
          </p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :resetLogin="reset_login"></login-form>
          <p class="login-tip">登录用户：工号；初始密码为身份证后6位</p>
        </div>
      </Card>
    </div>

    <Modal v-model="show_chg_pwd" :loading="data_saving" scrollable title="首次登录，请修改登录密码" width="400" ok-text="提交"
      :mask-closable="false"
      @on-ok="handleChangePwd">
      <ChangePwd @saveCancel="handleChgPwdCancel" @saveSuccess="handleChgPwdSuccess" :saveData="chgNow"></ChangePwd>
    </Modal>
  </div>
</template>

<script>
import ChangePwd from '_c/change-pwd'
import LoginForm from '_c/login-form'
import { mapActions, mapMutations } from 'vuex'
import config from '@/config'
export default {
  components: {
    LoginForm,
    ChangePwd
  },
  data () {
    return {
      bmsVersion: config.bmsVersion,
      show_chg_pwd: false,
      data_saving: true,
      chgNow: false,
      reset_login: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
      'setToken'
    ]),
    handleChangePwd () {
      this.chgNow = true
      this.$nextTick(() => {
        this.chgNow = false
      })
    },
    handleChgPwdCancel () {
      this.data_saving = false
      this.$nextTick(() => {
        this.data_saving = true
      })
    },
    handleChgPwdSuccess () {
      this.data_saving = false
      this.show_chg_pwd = false
      this.$nextTick(() => {
        this.data_saving = true
      })
    },
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        if (res.code === '000000') {
          if (res.data.needModifyPassword || res.data.firstLogin) {
            this.show_chg_pwd = true
            this.resetLoginForm()
          } else {
            this.setToken(res.data.token)
            this.getUserInfo().then(res => {
              if (res.code === '000000') {
                this.$router.push({
                  name: this.$config.homeName
                })
              }
              this.resetLoginForm()
            }).catch(() => {
              this.resetLoginForm()
            })
          }
        } else {
          this.resetLoginForm()
        }
      }).catch(() => {
        this.resetLoginForm()
      })
    },
    resetLoginForm () {
      this.reset_login = true
      this.$nextTick(() => {
        this.reset_login = false
      })
    }
  }
}
</script>

<style>

</style>
