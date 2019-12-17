<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80" inline>
      <Row>
        <Col span="12">
          <FormItem label="排查项目" prop="projectName" class="info_title">
            <Input type="text" :value="formData.projectName" readonly style="width: 395px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="工号" prop="employeeNo" class="info_title">
            <Input type="text" :value="formData.employeeNo" readonly ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="姓名" prop="name" class="info_title">
            <Input type="text" v-model="formData.name" readonly ></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div style="margin-left: 10px;margin-top: 10px;">
      <Table size="small" :height="400" :stripe="true" border ref="table" :columns="cols" :data="dataSet">

      </Table>

      <Form ref="form1" :show-message="false" :model="formData" label-position="top" style="margin-top: 10px;">
        <FormItem label="存在其它异常行为" prop="otherUnusualBehavior" class="info_title">
          <Input type="textarea" show-word-limit :maxlength="200" readonly :value="formData.otherUnusualBehavior" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { getEmpCheckDetails } from '@/api/emp-manage/emp-behavior-inspection'
import { mixinInfo } from './common.js'

export default {
  components: {

  },
  mixins: [ mixinInfo ],
  props: [
    'rowData'
  ],
  data () {
    return {
      dataSet: [],
      formData: this.rowData,
      currentIndex: 0,
      submitData: []
    }
  },
  computed: {

  },
  methods: {
    initInfo () {
      const condition = {
        recordId: this.formData.id
      }

      getEmpCheckDetails(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data
        }
      }).catch(() => {
        this.dataSet = []
      })
    }
  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.formData = val
      this.initInfo()
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
