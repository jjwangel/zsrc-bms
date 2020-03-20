<template>
  <div>
    <div v-if="userRole.findIndex((val) => val ==='bms_admin' || val === 'bms_01' || val === 'bms_02' || val === 'bms_03' || val === 'bms_04' || val === 'bms_11') !== -1">
      <HomeLevel1/>
    </div>
    <div v-else>
      <HomeNormal/>
    </div>
  </div>
</template>

<script>
import { HomeLevel1, HomeNormal } from './home_by_role.js'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    HomeLevel1,
    HomeNormal
  },
  data () {
    return {
      userRole: this.rolesCodeShort()
    }
  },
  methods: {
    ...mapGetters([
      'rolesCodeShort'
    ])
  },
  mounted () {

  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
