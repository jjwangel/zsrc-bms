<template>
  <div>
    <Form ref="form" :rules="rules" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="项目名称" prop="xmmc" class="info_title">
            <Input v-model="formData.xmmc" :readonly="this.actionType==='view'"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="年度" prop="nd" :label-width="50" class="info_title">
            <DatePicker type="year" :options="optDate"
            @on-change="handleDateChange"
            :disabled="this.saveData"
            :clearable="false"
            :value="this.formData.date_value"
            style="width: 100%;"
            :editable='false'></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="开始-结束时间" prop="ssdw" :label-width="110" class="info_title">
        <DatePicker type="daterange" placement="bottom-start"
        style="width: 100%"
        :clearable="false"
        :value="formData.jssj"
        @on-change="handleDateChange"
        :editable='false'></DatePicker>
      </FormItem>
      <FormItem label="启动-关闭时间" prop="ssdw" :label-width="110" class="info_title">
        <DatePicker type="daterange" placement="bottom-start"
        style="width: 100%"
        :clearable="false"
        :value="formData.jssj"
        @on-change="handleDateChange"
        :editable='false'></DatePicker>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="formAttentionAV2" :show-message="false" :model="formData" label-position="top">
      <FormItem label="项目说明" prop="yyms" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="200" v-model="formData.yyms" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
    </Form>

    <Row>
      <Col span="4" offset="20">
        <Button type="primary" @click="handleShowDetail">预览排查表</Button>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: [
    'actionType',
    'rowData',
    'saveData'
  ],
  data () {
    return {
      optDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      formData: this.rowData,
      rules: {

      }
    }
  },
  methods: {
    handleDateChange () {

    },
    handleHTypeChg () {

    },
    handleShowDetail () {
      this.showAttentionDetail = true
    },
    handleShowAttached () {
      this.showShowAttached = true
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
