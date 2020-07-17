<template>
  <div>
    <Form ref="formII" :model="formData" :label-width="100" :show-message="false">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="员工姓名" prop="name" class="info_title">
            <Input v-model="formData.name" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="所在单位" prop="deptType" class="info_title">
            <Input v-model="formData.deptType" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部室/网点" prop="deptName" class="info_title">
            <Input v-model="formData.deptName" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col span="8">
          <FormItem label="处罚日期" prop="pushDate" class="info_title">
            <DatePicker type="date" @on-change="handlePushDateChange" :editable="false" style="width:100%;" :value="formData.pushDate" :clearable="false" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否解除" prop="isFree" class="info_title">
            <Input v-model="formData.isFree" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="解除日期" prop="freeDate" class="info_title">
            <DatePicker type="date" @on-change="handleFreeDateChange" :editable="false" style="width:100%;" :value="formData.freeDate" :clearable="false" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="违规问题" prop="ouquQues" class="info_title">
        <Input type="textarea" v-model="formData.ouquQues" show-word-limit :maxlength="500" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="党内处分" prop="partPush" class="info_title">
        <Input type="textarea" v-model="formData.partPush" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="纪律处分" prop="discPush" class="info_title">
        <Input type="textarea" v-model="formData.discPush" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="人事处理" prop="humaDeal" class="info_title">
        <Input type="textarea" v-model="formData.humaDeal" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="其他处理" prop="othDeal" class="info_title">
        <Input type="textarea" v-model="formData.othDeal" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="经济处理" prop="econDeal" class="info_title">
        <Input type="textarea" v-model="formData.econDeal" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="备注" prop="bz" class="info_title">
        <Input type="textarea" v-model="formData.bz" show-word-limit :maxlength="200" :rows="3" :autosize='{ minRows: 3, maxRows: 3 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="导入员工工号" prop="impNo" class="info_title">
            <Input v-model="formData.impNo" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="导入员工姓名" prop="impName" class="info_title">
            <Input v-model="formData.impName" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="导入日期" prop="impDate" class="info_title">
            <Input v-model="formData.impDate" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="修改员工工号" prop="updateUser" class="info_title">
            <Input v-model="formData.updateUser" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="修改员工姓名" prop="updateUser" class="info_title">
            <Input v-model="formData.updateUser" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="修改日期" prop="updateTime" class="info_title">
            <Input v-model="formData.updateTime" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { modifyEmpDiscipline } from '@/api/emp-manage/emp-import'
import { mapGetters } from 'vuex'
import { getFormatDate } from '@/libs/j-tools.js'

export default {
  props: [
    'action',
    'rowData',
    'saveData'
  ],
  data () {
    return {
      formData: this.rowData,
      dataSaving: false
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo',
      'userName'
    ]),
    handlePushDateChange (val) {
      this.formData.pushDate = val
    },
    handleFreeDateChange (val) {
      this.formData.freeDate = val
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '违规违纪信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.discPush = this.trimForText(this.formData.discPush)
      this.formData.econDeal = this.trimForText(this.formData.econDeal)
      this.formData.humaDeal = this.trimForText(this.formData.humaDeal)
      this.formData.othDeal = this.trimForText(this.formData.othDeal)
      this.formData.ouquQues = this.trimForText(this.formData.ouquQues)
      this.formData.partPush = this.trimForText(this.formData.partPush)
      this.formData.bz = this.trimForText(this.formData.bz)

      let data = {
        id: this.formData.id,
        pushDate: this.formData.pushDate,
        isFree: this.formData.isFree,
        freeDate: this.formData.freeDate,
        discPush: this.formData.discPush,
        econDeal: this.formData.econDeal,
        humaDeal: this.formData.humaDeal,
        othDeal: this.formData.othDeal,
        ouquQues: this.formData.ouquQues,
        partPush: this.formData.partPush,
        bz: this.formData.bz
      }

      modifyEmpDiscipline(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '保存数据成功！',
            duration: 3
          })
          this.$emit('saveSuccess', this.formData._index, Object.assign({}, data, {
            updateUser: this.employeeNo(),
            updateName: this.userName(),
            updateTime: getFormatDate('yyyy-MM-dd hh:mm:ss')
          }))
          this.dataSaving = false
        } else {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
      }).catch(() => {
        this.$emit('saveCancel')
        this.dataSaving = false
      })
    }
  },
  watch: {
    rowData (val) {
      this.formData = Object.assign({}, val)
    },
    saveData (val) {
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
