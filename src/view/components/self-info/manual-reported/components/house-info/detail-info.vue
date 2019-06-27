<template>
  <div>
    <Form ref="formHouse" :rules="ruleHouse" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="产权所属" prop="hdPro" class="info_title">
            <Select :value="formData.hdPro" :label-in-value="true" @on-change="handleProChg" :disabled="this.action==='view'">
              <Option v-for="item in this.sel_option.selHdPro" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="房产类型" prop="hdHType" class="info_title">
            <Select :value="formData.hdHType" :label-in-value="true" @on-change="handleHTypeChg" :disabled="this.action==='view'">
              <Option v-for="item in this.sel_option.selHdHType" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="房产来源" prop="hdSour" class="info_title">
            <Select :value="formData.hdSour" :label-in-value="true" @on-change="handleSourChg" :disabled="this.action==='view'">
              <Option v-for="item in this.sel_option.selHdSour" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="房产用途" prop="hdUse" class="info_title">
            <Select :value="formData.hdUse" :label-in-value="true" @on-change="handleUseChg" :disabled="this.action==='view'">
              <Option v-for="item in this.sel_option.selHdUse" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="是否按揭" prop="hdIsloan" class="info_title">
            <Select :value="formData.hdIsloan" :label-in-value="true" @on-change="handleIsloanChg" :disabled="this.action==='view'">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
              <Option :value="0" disabled>请选择</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="建筑面积" prop="hdArea" class="info_title">
            <div>
              <InputNumber style='width:75%' v-model="formData.hdArea" :min="0" :precision="2" :active-change="false" @on-change="handleAreaChange" :readonly="this.action==='view'"></InputNumber>
              <span style="float: right">平方米</span>
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="购入日期" prop="hdBuyDate" class="info_title">
            <DatePicker @on-change="handleDateChange" :options="optBuyDate" type="date" :editable="false" style="width:100%;" :value="formData.hdBuyDate" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="交易价格" prop="hdPrice" class="info_title">
            <div>
              <InputNumber style='width:75%' v-model="formData.hdPrice" :min="0" :precision="2" :active-change="false" @on-change="handlePriceChange" :readonly="this.action==='view'"></InputNumber>
              <span style="float: right;margin-right: 24px">元</span>
            </div>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="具体地址" prop="hdAddr" class="info_title">
          <Input type="textarea" v-model="formData.hdAddr" :rows="2" :autosize='{ minRows: 2, maxRows: 2 }' :readonly="this.action==='view'"></Input>
      </FormItem>
      <FormItem label="备注" prop="bz" class="info_title">
          <Input type="textarea" v-model="formData.bz" :rows="2" :autosize='{ minRows: 2, maxRows: 2 }' :readonly="this.action==='view'"></Input>
          <span>注意：当一项或多项的输入选择“其他”的，必须统一在“备注”栏里简要填写相关内容</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { modifyEmpHouseInfo, addEmpHouseInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'action',
    'selOption',
    'rowData',
    'saveData'
  ],
  data () {
    const validateBz = (rule, value, callback) => {
      if (value === '') {
        if (this.formData.hdHTypeText === '其他' || this.formData.hdProText === '其他' || this.formData.hdSourText === '其他' || this.formData.hdUseText === '其他') {
          this.$Message.warning({
            content: '部份选项存在“其他”，因此备注不能为空！',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      } else {
        if (value.length > 100) {
          this.$Message.warning({
            content: '备注长度不能大于100个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateHdArea = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '“建筑面积”必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    const validateHdPrice = (rule, value, callback) => {
      if (!value || value === 0) {
        if (this.formData.hdSourText === '购买') {
          this.$Message.warning({
            content: '房产来原为“购买”，因此“交易金额”必需大于0 ！',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    const validateBuyDate = (rule, value, callback) => {
      if (value === '') {
        if (this.formData.hdSourText === '购买') {
          this.$Message.warning({
            content: '房产来原为“购买”，因此“购买日期”不能为空 ！',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    const validateAddr = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '具体地址不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 100) {
          this.$Message.warning({
            content: '具体地址长度不能大于100个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateIsloan = (rule, value, callback) => {
      if (value === 0) {
        this.$Message.warning({
          content: '请选择“是否按揭”',
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
      optBuyDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      ruleHouse: {
        hdArea: [
          { validator: validateHdArea, trigger: 'change' }
        ],
        hdPrice: [
          { validator: validateHdPrice, trigger: 'change' }
        ],
        bz: [
          { validator: validateBz, trigger: 'change' }
        ],
        hdAddr: [
          { validator: validateAddr, trigger: 'change' }
        ],
        hdBuyDate: [
          { validator: validateBuyDate, trigger: 'blur' }
        ],
        hdIsloan: [
          { validator: validateIsloan, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleAreaChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.hdArea = 0
        })
      }
    },
    handlePriceChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.hdPrice = 0
        })
      }
    },
    handleDateChange (val) {
      this.formData.hdBuyDate = val
    },
    handleProChg ({ value, label }) {
      this.formData.hdPro = value
      this.formData.hdProText = label
    },
    handleHTypeChg ({ value, label }) {
      this.formData.hdHType = value
      this.formData.hdHTypeText = label
    },
    handleSourChg ({ value, label }) {
      this.formData.hdSour = value
      this.formData.hdSourText = label
    },
    handleUseChg ({ value, label }) {
      this.formData.hdUse = value
      this.formData.hdUseText = label
    },
    handleIsloanChg ({ value, label }) {
      this.formData.hdIsloan = value
      this.formData.hdIsloanText = label
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工房产信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.hdAddr = this.trimForText(this.formData.hdAddr)
      this.formData.bz = this.trimForText(this.formData.bz)

      this.$refs['formHouse'].validate((valid) => {
        if (valid) {
          let data = {
            hdAssType: 1,
            hdHType: this.formData.hdHType,
            hdPro: this.formData.hdPro,
            hdSour: this.formData.hdSour,
            hdUse: this.formData.hdUse,
            hdIsloan: this.formData.hdIsloan,
            hdArea: this.formData.hdArea,
            hdPrice: this.formData.hdPrice,
            hdAddr: this.formData.hdAddr,
            bz: this.formData.bz
          }
          if (this.formData.hdBuyDate && this.formData.hdBuyDate !== '') {
            data.hdBuyDate = this.formData.hdBuyDate
          }

          if (this.action === 'modify') { // 修改记录
            modifyEmpHouseInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                  hdHTypeText: this.formData.hdHTypeText,
                  hdProText: this.formData.hdProText,
                  hdSourText: this.formData.hdSourText,
                  hdUseText: this.formData.hdUseText,
                  hdIsloanText: this.formData.hdIsloanText
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
            addEmpHouseInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id,
                  hdHTypeText: this.formData.hdHTypeText,
                  hdProText: this.formData.hdProText,
                  hdSourText: this.formData.hdSourText,
                  hdUseText: this.formData.hdUseText,
                  hdIsloanText: this.formData.hdIsloanText
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
      this.$refs['formHouse'].resetFields()
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
