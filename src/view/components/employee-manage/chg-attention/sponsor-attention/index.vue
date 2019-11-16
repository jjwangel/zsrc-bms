<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" inline>
          <FormItem label="员工工号" prop="employeeNo" :label-width="80">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="name" :label-width="80">
            <Input type="text" v-model="formData.name" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(1)" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleSponsorAttention" :loading="this.loadData">创建（临时）</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="handleSponsorAttention (row, index)">调整</Button>
        </template>

        <div slot="footer" style="width:100%;text-align: center">
          <Page size="small" show-elevator show-sizer
            :total="pageData.total"
            :current.sync="pageData.current"
            :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"/>
        </div>
      </Table>

      <Drawer title="选择员工" :closable="false" v-model="showSelectEmp" :transfer="false" inner placement="left">
        <Tree :data="deptEmpList" @on-select-change="handleInstChange"></Tree>
      </Drawer>
    </Card>

    <Modal v-model="showAttentionAction" :loading="dataSaving" scrollable title="发起调整关注类别" width="700" ok-text="提交"
      :styles="{top: '10px'}"
      :mask-closable="false"
      @on-ok="handleSaveChange">
      <AttentionAction @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveData="saveNow" :rowData="{}" :selOption="{}"></AttentionAction>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList } from '@/api/base'
import { mixinInfo } from './common.js'
import AttentionAction from '_c/chg-attention/attention-action'

export default {
  components: {
    AttentionAction
  },
  mixins: [ mixinInfo ],
  data () {
    return {
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      formData: {
        employeeNo: '',
        name: ''
      },
      dataSet: [],
      deptEmpList: [],
      loadData: false,
      showSelectEmp: false,
      showAttentionAction: false,
      saveNow: false,
      dataSaving: true,
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {
      const condition = {
        employee: true
      }

      getInstEmpList(condition).then(res => {
        if (res.data.code === '000000') {
          this.deptEmpList = res.data.data
        }
      }).catch(() => {

      })

      // 获取关注类型字选项
    },
    handleSponsorAttention (row, index) {
      // 发起调整
      this.showAttentionAction = true
    },
    handleSaveChange () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveCancel () {

    },
    handleSaveSuccess () {

    },
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {
      if (this.loadData) return
      this.loadData = true
    },
    handleSelectEmp () {
      this.showSelectEmp = true
    },
    handleInstChange (item) {
      if (item[0]) {
        item[0].expand = !item[0].expand
        item[0].selected = !item[0].selected

        if (item[0].is_emp) {
          this.formData.name = item[0].title
          this.formData.employeeNo = item[0].num
          this.showSelectEmp = false
        }
      }
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 230
    }
  },
  mounted () {
    this.initInfo()
  },
  created () {
    window.addEventListener('resize', this.setWindowHeight)
    this.setWindowHeight()
  },
  destroyed () {
    window.removeEventListener('resize', this.setWindowHeight)
  }
}
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 0px;
  }
</style>
