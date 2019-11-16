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
          <FormItem label="所属机构" prop="dqzt">
            <Cascader style="width: 300px" :data="dept_list" v-model="formData.deptCode" trigger="hover" :disabled="this.loadData"></Cascader>
          </FormItem>
        </Form>
        <Form ref ="form2" :model="formData" :label-width="80" inline>
          <FormItem label="关注类别" prop="gzlb">
            <Select v-model="formData.gzlb" style="width:100px" :disable="this.loadData">
              <Option :value="1">重点关注 </Option>
              <Option :value="2">一般关注</Option>
            </Select>
          </FormItem>
          <FormItem label="台账状态" prop="tzzt">
            <Select v-model="formData.tzzt" style="width:130px" :disable="this.loadData">
              <Option :value="1">激活 </Option>
              <Option :value="2">关闭</Option>
            </Select>
          </FormItem>
          <FormItem label="关注类型" prop="gzlx">
            <Select v-model="formData.gzlx" style="width:300px" multiple :max-tag-count="2" :max-tag-placeholder="maxTagPlaceholder" :disable="this.loadData">
              <Option :value="1">负债过高 </Option>
              <Option :value="2">担保额度过高</Option>
              <Option :value="3">被强制执行 </Option>
              <Option :value="4">不良贷款</Option>
              <Option :value="5">贷款使用异常 </Option>
              <Option :value="6">经商办企业</Option>
              <Option :value="7">涉诉 </Option>
              <Option :value="8">涉黄</Option>
              <Option :value="9">涉赌 </Option>
              <Option :value="10">涉毒</Option>
              <Option :value="11">工作态度 </Option>
              <Option :value="12">业务差错</Option>
              <Option :value="13">个人性格 </Option>
              <Option :value="14">生活作风</Option>
              <Option :value="15">精神问题 </Option>
              <Option :value="16">家庭原因</Option>
              <Option :value="17">社交圈子 </Option>
              <Option :value="18">其他关注原因</Option>
              <Option :value="19">重点关注 </Option>
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <Button type="primary" icon="ios-search" @click="handleChgPageSize(1)" :loading="this.loadData">查询</Button>
            <Button type="primary" icon="ios-search" @click="handleCreateAttention" :loading="this.loadData">详细（临时）</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :height="windowHeight" @on-row-dblclick="handleShowDetail" :stripe="true" border ref="table-sa" :loading="this.loadData" :columns="cols" :data="dataSet">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current" :disabled="this.dataSet.length > 0 ? false: true"
            @on-change="handleSearchRd"
            @on-page-size-change="handleChgPageSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>

      <Drawer title="选择员工" :closable="false" v-model="showSelectEmp" :transfer="false" inner placement="left">
        <Tree :data="deptEmpList" @on-select-change="handleInstChange"></Tree>
      </Drawer>
    </Card>

    <Modal v-model="showAttentionAction" :loading="dataSaving" scrollable :title="actionTitle" width="1000" ok-text="提交" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <AttStdBookContent :rowData="{}" :selOption="{}" :actionType="this.actionType"></AttStdBookContent>
    </Modal>
  </div>
</template>

<script>
import { getInstEmpList, getInstList } from '@/api/base'
import { mixinInfo } from './common.js'
import AttStdBookContent from '_c/att-std-book-search'

export default {
  components: {
    AttStdBookContent
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
      dept_list: [],
      loadData: false,
      showSelectEmp: false,
      showAttentionAction: false,
      dataSaving: true,
      actionTitle: '',
      actionType: '', // view || create || modify
      saveNow: false,
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

      getInstList().then(res => {
        if (res.data.code === '000000') {
          this.dept_list = res.data.data
        }
      }).catch(() => {

      })
    },
    handleDateChange () {

    },
    handleCreateAttention () {
      this.actionType = 'create'
      this.actionTitle = '关注台账内容'
      this.showAttentionAction = true
    },
    handleSponsorAttention (row, index) {

    },
    handleChgPageSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.handleSearchRd()
      })
    },
    handleSearchRd () {

    },
    handleShowDetail () {

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
    },
    maxTagPlaceholder (num) {
      return '+' + num
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
