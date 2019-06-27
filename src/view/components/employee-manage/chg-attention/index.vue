<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form :model="formData" :label-width="80" inline>
          <FormItem label="员工工号" prop="employeeNo" class="info_title">
            <Input v-model="formData.employeeNo"></Input>
          </FormItem>
          <Button type="primary" icon="ios-search"
            @click="handleSearchData"
            :loading="this.searching" :disabled="this.dataSaving">查询</Button>
        </Form>
      </div>
      <Row>
        <Col span="8">
          <Form :model="formData" :label-width="80">
            <FormItem label="员工姓名" prop="employeeName" class="info_title">
              <Input v-model="formData.employeeName" readonly></Input>
            </FormItem>
            <FormItem label="所属单位" prop="headSubName" class="info_title">
              <Input v-model="formData.headSubName" readonly></Input>
            </FormItem>
            <FormItem label="部室/网点" prop="deptName" class="info_title">
              <Input v-model="formData.deptName" readonly></Input>
            </FormItem>
            <FormItem label="调整前" prop="focusTypeBefore" class="info_title">
              <Input v-model="formData.focusTypeBefore" readonly></Input>
            </FormItem>
          </Form>

          <Form :model="formData" ref="formAtt" :rules="ruleAtt" :show-message="false" :label-width="80">
            <FormItem label="调整后" prop="focusType" class="info_title">
              <Select :value="formData.focusType" :label-in-value="true" @on-change="handleFocusChg" :disabled="this.dataSaving || this.formData.focusTypeBefore === ''">
                <Option v-for="item in this.selFocusType" :value="item.key" :key="item.key">{{ item.value }}</Option>
                <Option :value="0" disabled>请选择</Option>
              </Select>
            </FormItem>
            <FormItem label="关注原因" prop="focusReason" class="info_title">
              <Input type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 3 }" v-model="formData.focusReason"
                placeholder="当调整后为重点或一般关注的，关注原因不能为空"></Input>
            </FormItem>
            <FormItem>
              <Button type="success" icon="md-checkbox-outline" long
                @click="handleSumbit"
                :loading="this.dataSaving" :disabled="this.searching || this.formData.focusTypeBefore === ''">提交</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getEmpAttentionInfo, modifyEmpAttentionInfo } from '@/api/emp-manage/chg-attention'
import { getSelectOptionData } from '@/api/base'
import { formatSelectOption } from '@/libs/j-tools.js'

export default {
  data () {
    const validateFocusReason = (rule, value, callback) => {
      if (value === '') {
        if (this.formData.focusTypeText === '重点关注' || this.formData.focusTypeText === '一般关注') {
          this.$Message.warning({
            content: '当调整后为重点或一般关注的，关注原因不能为空！',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      } else {
        if (value.length > 15) {
          this.$Message.warning({
            content: '关注原因长度不能大于15个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    return {
      dataSaving: false,
      searching: false,
      selFocusType: {},
      formData: {
        id: '',
        employeeName: '',
        employeeNo: '',
        headSubName: '',
        deptName: '',
        focusTypeBefore: '',
        focusType: 0,
        focusTypeText: '',
        focusReason: ''
      },
      ruleAtt: {
        focusReason: [
          { validator: validateFocusReason, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    initInfo () {
      const optName = {
        type: [
          'FOCUS_TYPE'
        ]
      }
      getSelectOptionData(optName).then(res => {
        if (res.data.code === '000000') {
          this.selFocusType = formatSelectOption(res.data.data.FOCUS_TYPE)
        }
      }).catch(() => {

      })
    },
    handleFocusChg ({ value, label }) {
      this.formData.focusType = value
      this.formData.focusTypeText = label
    },
    handleSumbit () {
      if (this.dataSaving) return
      this.$Modal.confirm({
        title: '员工关注类别',
        content: '确定调整员工关注类别吗？',
        onOk: this.saveData
      })
    },
    saveData () {
      if (this.formData.focusType === 0) {
        this.$Message.warning({
          content: '请选择调整后级别',
          duration: 5
        })
        return
      } else {
        if (this.formData.focusTypeBefore === this.formData.focusTypeText) {
          this.$Message.warning({
            content: '调整前与调整后的级别不能相同',
            duration: 5
          })
          return
        }
      }

      this.$refs['formAtt'].validate((valid) => {
        if (valid) {
          this.dataSaving = true
          let data = {
            id: this.formData.id,
            focusType: this.formData.focusType,
            focusReason: this.formData.focusReason
          }

          modifyEmpAttentionInfo(data).then(res => {
            if (res.data.code === '000000') {
              this.$Message.success({
                content: '保存数据成功！',
                duration: 3
              })

              this.formData.focusTypeBefore = this.formData.focusTypeText
              this.dataSaving = false
            }
          }).catch(() => {
            this.dataSaving = false
          })
        }
      })
    },
    handleSearchData () {
      if (this.searching) return

      this.formData.employeeNo = this.trimForText(this.formData.employeeNo).toUpperCase()
      if (this.formData.employeeNo === '') {
        this.$Message.warning({
          content: '请输入员工工号进行检索',
          duration: 5
        })
        return
      }

      this.$refs['formAtt'].resetFields()
      this.searching = true
      const formData = {
        employeeNo: this.formData.employeeNo
      }

      getEmpAttentionInfo(formData).then(res => {
        if (res.data.code === '000000') {
          if (Object.keys(res.data.data).length > 0) {
            this.formData.id = res.data.data.id
            this.formData.employeeName = res.data.data.employeeName
            this.formData.headSubName = res.data.data.headSubName
            this.formData.deptName = res.data.data.deptName
            this.formData.focusTypeBefore = res.data.data.focusTypeText
            this.formData.focusType = 0
            this.formData.focusReason = ''
          } else {
            this.formData.id = 0
            this.formData.employeeName = ''
            this.formData.headSubName = ''
            this.formData.deptName = ''
            this.formData.focusType = 0
            this.formData.focusTypeBefore = ''
            this.formData.focusReason = ''

            this.$Message.info({
              content: `找不到员工工员${this.formData.employeeNo}的数据`,
              duration: 3
            })
          }
        }
        this.searching = false
      }).catch(() => {
        this.searching = false
      })
    }
  },
  mounted () {
    this.initInfo()
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
