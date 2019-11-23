<template>
  <div>
    <Form ref="form" :rules="rules" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="6">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="员工姓名" prop="employeeName" class="info_title">
            <Input v-model="formData.employeeName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属单位" prop="headSubName" class="info_title">
            <Input v-model="formData.headSubName" readonly></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="部室/网点" prop="deptName" class="info_title">
            <Input v-model="formData.deptName" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="关注类别（调整前）" :label-width="150" class="info_title">
            <Input v-model="getBeforeFocusTypeText" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关注类别（调整后）" :label-width="150" class="info_title">
            <Input v-model="getAfterFocusTypeText" readonly></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="关注类型" prop="focusItem" :label-width="80" class="info_title">
            <Input v-model="formData.focusItem" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="" prop="gzlx" :label-width="10" class="info_title">
              <Button type="primary" @click="handleShowAttached" long>浏览上传文件</Button>
            </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :show-message="false" :model="formData" label-position="top">
      <FormItem label="关注原因描述" prop="focusReason" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.focusReason" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' readonly></Input>
      </FormItem>
    </Form>
    <div v-show="this.actionType!=='view'">
      <Form ref="form3" :rules="rules" :show-message="false" :model="formData" label-position="top">
        <FormItem :label="getStatusLabel + '意见'" style="margin-left: 10px;" prop="nodeStatus" class="info_title">
          <Select v-model="formData.nodeStatus" @on-change="handleNodeStatusChg" :label-in-value="true" :disabled="this.actionType==='view'">
            <Option :value="1">同意</Option>
            <Option :value="2">不同意</Option>
          </Select>
        </FormItem>
        <FormItem label="意见内容" prop="nodeComment" style="margin-left: 10px;" class="info_title">
          <Input type="textarea" show-word-limit :maxlength="1000" v-model="formData.nodeComment" :rows="2" :autosize='{ minRows: 6, maxRows: 6 }' :readonly="this.actionType==='view'"></Input>
        </FormItem>
      </Form>
    </div>

    <Divider style="margin-top: 10px;margin-bottom: 10px;" />

    <Steps :current="this.flowLogs.current" size="small" style="margin-left: 10px;">
      <Step v-for="log in this.flowLogs.logs" :title="log.title" :key="log.id">
        <template slot="content">
          <div :class="{'step_div': log.flowNode === 3}">
          <p v-show="log.operatorNo !== ''">{{log.title}}人：{{log.operatorName}}（{{log.operatorNo}}）</p>
          <p v-show="log.operatorNo !== ''">{{log.title}}日期：{{log.createTime}}</p>
          <p v-show="log.flowNode !== 0 && log.operatorNo !== ''">{{log.title}}意见：{{log.nodeStatusText}}</p>
          <p style="word-break:break-all;" v-show="log.flowNode !== 0 && log.operatorNo !== ''">意见内容：{{log.nodeComment}}</p>
        </div>
        </template>
      </Step>
    </Steps>

    <Drawer title="浏览文件" :closable="false" :width="350" v-model="showShowAttached" :transfer="false" inner placement="left">
      <List header="" size="small">
        <ListItem v-for="item in this.files" :key="item.id">
          <ListItemMeta :title="item.name"/>
          <template slot="action">
            <Button type="primary" size="small"
            :to="base_url + '/uploadfile/download/' + item.id" target="_blank">下载</Button>
          </template>
        </ListItem>
      </List>
    </Drawer>

  </div>
</template>

<script>
import { getFocusPersonAdjustFlowData, verifyFocusPersonAdjustFlow, getFocusPersonAdjustFlowlogs } from '@/api/emp-manage/chg-attention'
import { vaildForm } from '@/libs/j-tools.js'
import config from '@/config'

export default {
  components: {

  },
  props: [
    'actionType',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateNodeStatus = (rule, value, callback) => {
      if (value === 0) {
        this.$Message.warning({
          content: `请选择“${this.getStatusLabel}意见“`,
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateNodeComment = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '意见内容不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: {},
      files: [],
      flowLogs: {
        current: 0,
        logs: []
      },
      base_url: '',
      showShowAttached: false,
      rules: {
        nodeStatus: [
          { validator: validateNodeStatus, trigger: 'blur' }
        ],
        nodeComment: [
          { validator: validateNodeComment, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getBeforeFocusTypeText: function () {
      switch (this.formData.focusTypeBefore) {
        case 1: return '重点关注'
        case 2: return '一般关注'
        case 3: return '正常'
      }
    },
    getAfterFocusTypeText: function () {
      switch (this.formData.focusTypeAfter) {
        case 1: return '重点关注'
        case 2: return '一般关注'
        case 3: return '正常'
      }
    },
    getStatusLabel: function () {
      switch (this.formData.flowNode) {
        case 1: return '复核'
        case 2: return '审核'
        case 3: return '审批'
      }
    }
  },
  methods: {
    findFlowData () {
      const condition = {
        id: this.rowData.relatedId
      }

      getFocusPersonAdjustFlowData(condition).then(res => {
        if (res.data.code === '000000') {
          this.formData = Object.assign({}, res.data.data, { nodeComment: '', nodeStatus: 0 })
          this.files = this.formData.credentialFiles
        }
      }).catch(() => {

      })

      getFocusPersonAdjustFlowlogs({ flowId: this.rowData.relatedId }).then(res => {
        if (res.data.code === '000000') {
          const data = res.data.data
          this.flowLogs = {
            current: 0,
            logs: []
          }
          for (var i = 0; i < 4; i++) {
            let title = ''
            if (i < data.length) {
              this.flowLogs.current = i + 1
              switch (data[i].flowNode) {
                case 0: title = '发起'
                  break
                case 1: title = '复核'
                  break
                case 2: title = '审核'
                  break
                case 3: title = '审批'
                  break
              }
              this.flowLogs.logs.push({
                id: data[i].id,
                title: title,
                operatorName: data[i].operatorName,
                operatorNo: data[i].operatorNo,
                createTime: data[i].createTime,
                nodeComment: data[i].nodeComment,
                nodeStatusText: data[i].nodeStatus === 1 ? '同意' : '不同意',
                flowNode: data[i].flowNode
              })
            } else {
              switch (i) {
                case 0: title = '发起'
                  break
                case 1: title = '复核'
                  break
                case 2: title = '审核'
                  break
                case 3: title = '审批'
                  break
              }
              this.flowLogs.logs.push({
                id: parseInt(Math.random() * (9999999 - 1000000 + 1) + 1000000, 10),
                title: title,
                operatorName: '',
                operatorNo: '',
                createTime: '',
                nodeComment: '',
                nodeStatusText: '',
                flowNode: i
              })
            }
          }
        }
      }).catch(() => {

      })
    },
    handleNodeStatusChg (item) {
      if (item) {
        switch (item.value) {
          case 1: this.formData.nodeComment = '同意调整'
            break
          case 2: this.formData.nodeComment = ''
            break
        }
      }
    },
    handleShowAttached () {
      this.showShowAttached = true
    },
    handleSaveData () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: `关注人员调整${this.getStatusLabel}`,
          content: '确定提交吗？',
          onOk: this.saveData,
          onCancel: () => {
            this.$emit('saveCancel')
          }
        })
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    saveData () {
      this.formData.nodeComment = this.trimForText(this.formData.nodeComment)

      let data = {
        flowId: this.formData.id,
        flowNode: this.formData.flowNode,
        nodeComment: this.formData.nodeComment,
        nodeStatus: this.formData.nodeStatus
      }
      verifyFocusPersonAdjustFlow(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: `员工关注调整${this.getStatusLabel}提交成功`,
            duration: 5
          })
          this.$emit('saveSuccess', this.rowData._index)
        } else {
          this.$emit('saveCancel')
        }
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      await vaildForm(this, 'form3')
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev)
  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.$refs['form3'].resetFields()
      this.findFlowData()
    },
    saveNow (val) {
      if (val) this.handleSaveData()
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
  .step_div{
    width: 225px;
  }
</style>
