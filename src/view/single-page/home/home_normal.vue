<template>
  <div>
    <Row :gutter="16" >
      <Col span="12">
        <ToDo todo_title="待办事项"></ToDo>
      </Col>
      <Col span="12">
        <ToDo todo_title="已办事项"></ToDo>
      </Col>
    </Row>
  </div>
</template>

<script>
import ToDo from './components/todo'
export default {
  name: 'HomeNormal',
  components: {
    ToDo
  },
  data () {
    return {

    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
