<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form ref ="form" :model="formData" :label-width="80" inline>
          <FormItem label="员工工号" prop="employeeNo">
            <Input type="text" v-model="formData.employeeNo" :readonly="this.loadData" style="width:100px;"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="name">
            <Input type="text" v-model="formData.name" :readonly="this.loadData" style="width:130px;">
              <Button slot="append" icon="md-apps" @click="handleSelectEmp" :disabled="this.loadData"></Button>
            </Input>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(pageData.size,1)" :loading="this.loadData">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="dataSet">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" :disabled="row.existFlow === 1" @click="handleSponsorAttention (row, index)">调整</Button>
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
      <AttentionAction @saveCancel="handleSaveCancel" @saveSuccess="handleSaveSuccess" :saveNow="saveNow" :rowData="this.selRow" :selOption="this.selOption"></AttentionAction>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList, getSingleSelectOptionData } from '@/api/base'
import { getFocuspersonsList } from '@/api/emp-manage/chg-attention'
import { formatSingleSelectOption } from '@/libs/j-tools.js'
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
      selRow: {},
      selOption: {},
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

      getSingleSelectOptionData({ type: 'FOCUS_ITEM' }).then(res => {
        if (res.data.code === '000000') {
          this.selOption = {
            selFocusItem: formatSingleSelectOption(res.data.data)
          }
        }
      }).catch(() => {

      })
    },
    handleSponsorAttention (row, index) {
      this.selRow = Object.assign({}, row, { focusItem: [], focusItemText: '', focusReason: '', newFocusType: 0, focusItemBefore: '' })
      this.showAttentionAction = true
    },
    handleSaveChange () {
      this.saveNow = true
      this.$nextTick(() => {
        this.saveNow = false
      })
    },
    handleSaveCancel () {
      this.dataSaving = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    },
    handleSaveSuccess (rowIndex) {
      this.dataSet[rowIndex].existFlow = 1 // 设置正在走流程的标志
      this.dataSaving = false
      this.showAttentionAction = false
      this.$nextTick(() => {
        this.dataSaving = true
      })
    },
    handleChgPageSize (size, current) {
      if (current) this.pageData.current = current
      this.pageData.size = size
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {
      if (this.loadData) return
      this.loadData = true

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      this.formData.name = this.trimForText(this.formData.name)
      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size
      }
      if (this.formData.employeeNo !== '') {
        condition.employeeNo = this.formData.employeeNo
      }
      if (this.formData.name !== '') {
        condition.employeeName = this.formData.name
      }

      getFocuspersonsList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data.rows
          this.pageData.total = res.data.data.total
        }
        this.loadData = false
      }).catch(() => {
        this.dataSet = []
        this.loadData = false
      })
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
