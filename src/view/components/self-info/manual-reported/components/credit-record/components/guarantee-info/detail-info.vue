<template>
    <div>
      <Form ref="formAssu" :rules="ruleAssu" :show-message="false" :model="formData" :label-width="110">
        <FormItem label="贷款发放机构" prop="loanOrgName" class="info_title">
          <Input v-model="formData.loanOrgName" :readonly="this.operate==='view'"></Input>
        </FormItem>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="担保金额" prop="assuBal" class="info_title">
              <div>
                <InputNumber style='width:80%' v-model="formData.assuBal" :min="0" :precision="2" :active-change="false" @on-change="handleBalChange" :readonly="this.operate==='view'"></InputNumber>
                <span style="margin-left: 10px">元</span>
              </div>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="担保贷款发放日期" prop="loanOpenDate" class="info_title">
              <DatePicker type="date" :options="optLoanOpenDate" :editable="false" style="width:100%;" :value="formData.loanOpenDate" @on-change="handleOpenChange" :clearable="false" :disabled="this.operate==='view'"></DatePicker>
            </FormItem>
            <!-- <FormItem label=" 担保方式" prop="assuMode" class="info_title">
              <Select :value="formData.assuMode" :label-in-value="true" @on-change="handleAssuModeChg" :disabled="this.operate==='view'">
                <Option v-for="item in this.sel_option.selAssuMode" :value="item.key" :key="item.key">{{ item.value }}</Option>
              </Select>
            </FormItem> -->
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="被担保人姓名" prop="assuName" class="info_title">
              <Input v-model="formData.assuName" :readonly="this.operate==='view'"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="与本人关系" prop="assuRale" class="info_title">
              <Input v-model="formData.assuRale" :readonly="this.operate==='view'"></Input>
            </FormItem>
          </Col>
          </Row>
          <Row :gutter="20">
            <Col span="12">
              <!-- <FormItem label="担保贷款五级分类" prop="loan5sta" class="info_title">
                <Select :value="formData.loan5sta" :label-in-value="true" @on-change="handleLoan5StaChg" :disabled="this.operate==='view'">
                  <Option v-for="item in this.sel_option.selLoan5sta" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
              </FormItem> -->
            </Col>
            <Col span="12">

            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="12">
              <!-- <FormItem label="担保贷款到期日期" prop="loanEndDate" class="info_title">
                <DatePicker type="date" :editable="false" style="width:100%;" :value="formData.loanEndDate" @on-change="handleEndChange" :clearable="false" :disabled="this.operate==='view'"></DatePicker>
              </FormItem> -->
            </Col>
            <Col span="12">
              <FormItem label="担保状态" prop="assuStau" class="info_title">
                <Select :value="formData.assuStau" :label-in-value="true" @on-change="handleAssuStauChg" :disabled="this.operate==='view'">
                  <Option v-for="item in this.sel_option.selAssuStau" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
      </Form>
    </div>
  </template>

<script>
import { modifyEmpAssuInfo, addEmpAssuInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'operate',
    'selOption',
    'rowData',
    'saveData',
    'rptDate'
  ],
  data () {
    const validateOrgName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '贷款发放机构不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateAssuName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '被担保人姓名不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateAssuRale = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '与本人关系不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateAssuBal = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '担保金额必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateLoanOpenDate = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '“担保贷款发放日期”不能为空 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      sel_option: this.selOption,
      dataSaving: false,
      ruleAssu: {
        loanOrgName: [
          { validator: validateOrgName, trigger: 'change' }
        ],
        assuBal: [
          { validator: validateAssuBal, trigger: 'change' }
        ],
        assuName: [
          { validator: validateAssuName, trigger: 'change' }
        ],
        assuRale: [
          { validator: validateAssuRale, trigger: 'change' }
        ],
        loanOpenDate: [
          { validator: validateLoanOpenDate, trigger: 'blur' }
        ]
      },
      optLoanOpenDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleBalChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.assuBal = 0
        })
      }
    },
    handleAssuModeChg ({ value, label }) {
      this.formData.assuMode = value
      this.formData.assuModeText = label
    },
    handleLoan5StaChg ({ value, label }) {
      this.formData.loan5sta = value
      this.formData.loan5staText = label
    },
    handleAssuStauChg ({ value, label }) {
      this.formData.assuStau = value
      this.formData.assuStauText = label
    },
    handleOpenChange (val) {
      this.formData.loanOpenDate = val
    },
    handleEndChange (val) {
      this.formData.loanEndDate = val
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工对外担保信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.loanOrgName = this.trimForText(this.formData.loanOrgName)
      this.formData.assuName = this.trimForText(this.formData.assuName)
      this.formData.assuRale = this.trimForText(this.formData.assuRale)

      this.$refs['formAssu'].validate((valid) => {
        if (valid) {
          let data = {
            credDate: this.rptDate,
            loanOrgName: this.formData.loanOrgName,
            assuBal: this.formData.assuBal,
            // assuMode: this.formData.assuMode,
            assuName: this.formData.assuName,
            assuRale: this.formData.assuRale,
            // loan5sta: this.formData.loan5sta,
            loanOpenDate: this.formData.loanOpenDate,
            // loanEndDate: this.formData.loanEndDate,
            assuStau: this.formData.assuStau
          }

          if (this.operate === 'modify') { // 修改记录
            modifyEmpAssuInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                  assuModeText: this.formData.assuModeText,
                  loan5staText: this.formData.loan5staText,
                  assuStauText: this.formData.assuStauText
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
          } else { // 新增记录
            addEmpAssuInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id,
                  assuModeText: this.formData.assuModeText,
                  loan5staText: this.formData.loan5staText,
                  assuStauText: this.formData.assuStauText
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
        } else {
          this.$emit('saveCancel')
          this.dataSaving = false
        }
      })
    }
  },
  watch: {
    rowData (val) {
      this.$refs['formAssu'].resetFields()
      this.formData = Object.assign({}, val)
    },
    selOption (val) {
      this.sel_option = val
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
