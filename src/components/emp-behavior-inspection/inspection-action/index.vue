<template>
  <div>
    <Form ref="form" :rules="rules" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="项目名称" prop="name" class="info_title">
            <Input v-model="formData.name" :readonly="this.actionType==='view'"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="年度" prop="year" :label-width="50" class="info_title">
            <DatePicker type="year" :options="optYearAfter"
            @on-change="handleYearChange"
            :disabled="this.actionType==='view'"
            :clearable="false"
            :value="this.formData.year"
            style="width: 100%;"
            :editable='false'></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="开始-结束时间" prop="seTime" :label-width="110" class="info_title">
        <DatePicker type="daterange" placement="bottom-start"
        :disabled="this.actionType==='view'"
        style="width: 100%"
        :clearable="false"
        v-model="formData.seTime"
        @on-change="handleSeTimeChange"
        :editable='false'></DatePicker>
      </FormItem>
      <FormItem label="启动-关闭时间" prop="scTime" :label-width="110" class="info_title">
        <DatePicker type="daterange" placement="bottom-start"
        :disabled="this.actionType==='view'"
        style="width: 100%"
        :clearable="false"
        v-model="formData.scTime"
        @on-change="handleScTimeChange"
        :editable='false'></DatePicker>
      </FormItem>
    </Form>
    <Divider style="margin-top: 10px;margin-bottom: 10px;" />
    <Form ref="form1" :rules="rules" :show-message="false" :model="formData" label-position="top">
      <FormItem label="项目说明" prop="describe" style="margin-left: 10px;" class="info_title">
        <Input type="textarea" show-word-limit :maxlength="200" v-model="formData.describe" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }' :readonly="this.actionType==='view'"></Input>
      </FormItem>
    </Form>

    <div style="width: 100%; height: 30px;">
      <Button style="float: right; " type="primary" @click="handleShowReview">预览排查表</Button>
    </div>

    <Modal v-model="showCheckItemReview" scrollable title="排查表预览" width="700" :styles="{top: '10px'}"
      :mask-closable="true"
      :footer-hide="true">
      <CheckItemReview :prjId="prjId" :refreshNow="refreshNow"></CheckItemReview>
    </Modal>
  </div>
</template>

<script>
import { vaildForm } from '@/libs/j-tools.js'
import { addEmpCheckProject, modifyEmpCheckProject } from '@/api/emp-manage/emp-behavior-inspection'
import CheckItemReview from '_c/emp-behavior-inspection/inspection-action/detail-info.vue'

export default {
  components: {
    CheckItemReview
  },
  props: [
    'actionType',
    'selOption',
    'rowData',
    'saveNow'
  ],
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '项目名称不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateYear = (rule, value, callback) => {
      if (!value || value === '') {
        this.$Message.warning({
          content: '请选择“排查年度”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateSeTime = (rule, value, callback) => {
      if (!value || value.length < 2) {
        this.$Message.warning({
          content: '请选择“项目开始与结束时间”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateScTime = (rule, value, callback) => {
      if (!value || value.length < 2) {
        this.$Message.warning({
          content: '请选择“项目启动与关闭时间”',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateDescribe = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '项目说明不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }
    return {
      optDateAfter: {
        disabledDate (date) {
          return date && date.valueOf() <= Date.now() - 86400000
        }
      },
      optYearAfter: {
        disabledDate (date) {
          return date && date.valueOf() <= Date.now() - 31536000000
        }
      },
      formData: this.rowData,
      showCheckItemReview: false,
      prjId: undefined,
      refreshNow: false,
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        year: [
          { validator: validateYear, trigger: 'blur' }
        ],
        seTime: [
          { validator: validateSeTime, trigger: 'blur' }
        ],
        scTime: [
          { validator: validateScTime, trigger: 'blur' }
        ],
        describe: [
          { validator: validateDescribe, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleYearChange (val) {
      if (val) this.formData.year = val
    },
    handleSeTimeChange (val) {
      if (val) {
        this.formData.startTime = val[0]
        this.formData.endTime = val[1]
      }
    },
    handleScTimeChange (val) {
      if (val) {
        this.formData.projectStartTime = val[0]
        this.formData.projectCloseTime = val[1]
      }
    },
    handleShowReview () {
      this.prjId = this.formData.id
      this.refreshNow = !this.refreshNow
      this.showCheckItemReview = true
    },
    handleSaveDetail () {
      this.vaildData().then(res => {
        this.$Modal.confirm({
          title: '排查项目管理',
          content: '确定保存吗？',
          onOk: this.saveDetail,
          onCancel: () => {
            this.$emit('saveCancel')
          }
        })
      }).catch(() => {
        this.$emit('saveCancel')
      })
    },
    async vaildData () {
      this.formData.name = this.trimForText(this.formData.name)
      this.formData.describe = this.trimForText(this.formData.describe)
      await vaildForm(this, 'form')
      await vaildForm(this, 'form1')
    },
    saveDetail () {
      let data = {
        name: this.formData.name,
        describe: this.formData.describe,
        startTime: this.formData.startTime,
        endTime: this.formData.endTime,
        projectStartTime: this.formData.projectStartTime,
        projectCloseTime: this.formData.projectCloseTime,
        year: this.formData.year,
        type: 1
      }

      if (this.actionType === 'modify') { // 修改记录
        modifyEmpCheckProject(Object.assign({}, data, { id: this.formData.id })).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data))
          } else {
            this.$emit('saveCancel')
          }
        }).catch(() => {
          this.$emit('saveCancel')
        })
      } else { // 新增记录
        addEmpCheckProject(data).then(res => {
          if (res.data.code === '000000') {
            this.$Message.success({
              content: '保存数据成功！',
              duration: 3
            })
            this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, res.data.data))
          } else {
            this.$emit('saveCancel')
          }
        }).catch(() => {
          this.$emit('saveCancel')
        })
      }
    }
  },
  watch: {
    rowData (val) {
      this.$refs['form'].resetFields()
      this.$refs['form1'].resetFields()
      this.formData = Object.assign({}, val)
    },
    saveNow (val) {
      if (val) this.handleSaveDetail()
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
