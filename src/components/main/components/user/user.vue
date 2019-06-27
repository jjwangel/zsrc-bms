<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="false">
        <Avatar :class="classGender" icon="md-person" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="modify-pwd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <Modal v-model="show_chg_pwd" :loading="data_saving" scrollable title="修改登录密码" width="400" ok-text="提交"
      :mask-closable="false"
      @on-ok="handleChangePwd">
      <ChangePwd @saveCancel="handleChgPwdCancel" @saveSuccess="handleChgPwdSuccess" :saveData="chgNow"></ChangePwd>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions, mapGetters } from 'vuex'
import ChangePwd from '_c/change-pwd'

export default {
  name: 'User',
  components: {
    ChangePwd
  },
  data () {
    return {
      show_chg_pwd: false,
      data_saving: true,
      chgNow: false
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classGender: function () {
      return {
        man_icon: this.gender() === '男',
        woman_icon: this.gender() === '女'
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    ...mapGetters([
      'gender'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    modifyPwd () {
      this.show_chg_pwd = true
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'modify-pwd': this.modifyPwd()
          break
      }
    },
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
    }
  }
}
</script>
<style scoped>
  .man_icon {
    color:white;
    background-color:#2d8cf0;
  }
  .woman_icon {
    color:white;
    background-color:#ed4014;
  }
</style>
