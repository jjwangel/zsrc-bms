<template>
  <div>
    <Card shadow style="height:282px">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        {{this.todo_title}}
      </p>
      <a href="#" slot="extra">
        <Icon custom="iconfont icon-tubiao01"></Icon>
      </a>
      <Table size="small" :loading="this.refreshing" :border="false" :height="200" :show-header="false" ref="table-todo" :columns="col_todo" :data="data_todo">
      </Table>
    </Card>
  </div>
</template>

<script>
import { mixinInfo } from './common.js'
import '@/assets/bms_icons/iconfont.css'
export default {
  mixins: [mixinInfo],
  props: [
    'todo_title'
  ],
  data () {
    return {
      data_todo: [],
      refreshing: false
    }
  },
  mounted () {

  }
}
</script>
