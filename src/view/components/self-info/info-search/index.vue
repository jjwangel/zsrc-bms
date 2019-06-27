<template>
  <div>
    <Tabs type="card" value="illegal_integral" :animated="false" name='tab-is'>
      <TabPane label="违规积分信息" name="illegal_integral" tab="tab-is">
        <IllegalIntegral></IllegalIntegral>
      </TabPane>
      <TabPane label="违规违纪信息" name="discipline" tab="tab-is">
        <Discipline></Discipline>
      </TabPane>
      <TabPane label="经济处罚" name="economic_punish" tab="tab-is">
        <EconomicPunish></EconomicPunish>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import IllegalIntegral from './components/illegal-integral'
import Discipline from './components/discipline'
import EconomicPunish from './components/economic-punish'

export default {
  name: 'SelfInfoSearch',
  components: {
    IllegalIntegral,
    Discipline,
    EconomicPunish
  },
  data () {
    return {
      abc: 123
    }
  }
}
</script>
