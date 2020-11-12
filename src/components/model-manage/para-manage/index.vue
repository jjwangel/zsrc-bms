<template>
  <div>
    <Form ref="form1" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="5">
        <Col span="5">
          <FormItem label="模型编号" prop="vriskid" class="info_title">
            <Input v-model="formData.vriskid" readonly></Input>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem label="模型名称" prop="riskNm" class="info_title">
            <Input v-model="formData.riskNm" readonly></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="创建日期" prop="createTime" class="info_title">
            <Input v-model="formData.createTime" readonly></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="风险等级" prop="riskLvlText" class="info_title">
            <Select v-model="formData.riskLvlText" style="width:80px" :disabled="this.actionType === 'view'">
              <Option value="高">高</Option>
              <Option value="中">中</Option>
              <Option value="低">低</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form2" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="模型描述" prop="riskDis" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :readonly="this.actionType === 'view'" :maxlength="200" v-model="formData.riskDis" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
      </FormItem>
      <FormItem label="控制目标" prop="ctlDis" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :readonly="this.actionType === 'view'" :maxlength="200" v-model="formData.ctlDis" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Table size="small" :height="windowHeight" :stripe="true" border ref="table-para" :loading="this.loadData" :columns="cols" :data="dataSet" style="margin-left: 10px;">
      <template slot-scope="{ row, index }" slot="action">
        <ButtonGroup>
          <Button @click="handleShowDetail (row, index)" type="success" size="small" :disabled="actionType === 'view'">编辑参数</Button>
          <Button @click="handleShowDetail (row, index)" type="primary" size="small" >修改历史</Button>
        </ButtonGroup>
      </template>
    </Table>
  </div>
</template>

<script>
import { vaildForm } from '@/libs/j-tools.js'
import { mixinInfo } from './common.js'
import { getModelParaList } from '@/api/model-manage/model-search'
// import { modifyFollowSuggest, getFocusPersonFollowInfo, getFocusPersonAdjustFlowDetail } from '@/api/emp-manage/follow-attention'

export default {
  props: [
    'actionType',
    'rowData',
    'saveNow'
  ],
  mixins: [ mixinInfo ],
  data () {
    const validateRiskDis = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入模型描述！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateCtlDis = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '请输入控制目标！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      rules: {
        riskDis: [
          { validator: validateRiskDis, trigger: 'blur' }
        ],
        ctlDis: [
          { validator: validateCtlDis, trigger: 'blur' }
        ]
      },
      loadData: false,
      dataSet: [],
      windowHeight: 0
    }
  },
  methods: {
    initInfo () {
      this.loadData = true
      const condition = {
        moId: this.formData.vriskid,
        orderBy: 'para_id'
      }

      getModelParaList(condition).then(res => {
        if (res.data.code === '000000') {
          this.dataSet = res.data.data
        }
        this.loadData = false
      }).catch(() => {
        this.dataSet = []
        this.loadData = false
      })
    },
    handleSaveData () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '模型信息',
          content: '确定提交保存吗？',
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
      let data = {
        id: this.formData.id,
        disposeAdvise: this.formData.disposeAdvise
      }

      modifyFollowSuggest(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '处置建议保存成功！',
            duration: 5
          })
          this.$emit('saveSuccess', { index: this.formData._index, disposeAdvise: this.formData.disposeAdvise })
        } else {
          this.$emit('saveCancel')
        }
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      this.formData.riskDis = this.trimForText(this.formData.riskDis)
      this.formData.ctlDis = this.trimForText(this.formData.ctlDis)
      await vaildForm(this, 'form2')
    }
  },
  mounted () {

  },
  watch: {
    rowData (val) {
      if (Object.keys(val).length === 0) return
      this.$refs['form2'].resetFields()
      this.formData = val
      this.initInfo()
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
</style>
