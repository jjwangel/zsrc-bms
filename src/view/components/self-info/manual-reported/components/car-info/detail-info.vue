<template>
  <div>
    <Form ref="formCar" :rules="ruleCar" :show-message="false" :model="formData" :label-width="80">
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="汽车品牌" prop="carVar" class="info_title">
            <Input v-model="formData.carVar" :readonly="this.action==='view'"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="型号" prop="carType" class="info_title">
            <Input v-model="formData.carType" :readonly="this.action==='view'"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="车牌号码" prop="carNo" class="info_title">
            <Input v-model="formData.carNo" :readonly="this.action==='view'"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="购入日期" prop="carBuyDate" class="info_title">
            <DatePicker type="date" :options="optBuyDate" @on-change="handleDateChange" :editable="false" style="width:100%;" :value="formData.carBuyDate" :clearable="false" :disabled="this.action==='view'"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <FormItem label="交易价格" prop="carPrice" class="info_title">
            <div>
              <InputNumber style='width:85%' v-model="formData.carPrice" :min="0" :precision="2" :active-change="false" @on-change="handlePriceChange" :readonly="this.action==='view'"></InputNumber>
              <span style="margin-left: 10px">元</span>
            </div>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="是否按揭" prop="carIsloan" class="info_title">
            <Select :value="formData.carIsloan" :label-in-value="true" @on-change="handleIsloanChg" :disabled="this.action==='view'">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
              <Option :value="0" disabled>请选择</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { modifyEmpCarInfo, addEmpCarInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'action',
    'rowData',
    'saveData'
  ],
  data () {
    const validateCarNo = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '车牌号码不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 20) {
          this.$Message.warning({
            content: '车牌号码长度不能大于20个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateCarVar = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '汽车品牌不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 20) {
          this.$Message.warning({
            content: '汽车品牌长度不能大于20个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateCarType = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '汽车型号不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 20) {
          this.$Message.warning({
            content: '汽车型号长度不能大于20个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateCarPrice = (rule, value, callback) => {
      if (value === 0) {
        this.$Message.warning({
          content: '交易价格必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
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

    const validateBuyDate = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '“购入日期”不能为空 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      formData: this.rowData,
      dataSaving: false,
      optBuyDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      ruleCar: {
        carNo: [
          { validator: validateCarNo, trigger: 'change' }
        ],
        carVar: [
          { validator: validateCarVar, trigger: 'change' }
        ],
        carType: [
          { validator: validateCarType, trigger: 'change' }
        ],
        carPrice: [
          { validator: validateCarPrice, trigger: 'change' }
        ],
        carBuyDate: [
          { validator: validateBuyDate, trigger: 'blur' }
        ],
        carIsloan: [
          { validator: validateIsloan, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handlePriceChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.carPrice = 0
        })
      }
    },
    handleDateChange (val) {
      this.formData.carBuyDate = val
    },
    handleIsloanChg ({ value, label }) {
      this.formData.carIsloan = value
      this.formData.carIsloanText = label
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工汽车信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.dataSaving = true
      this.formData.carNo = this.trimForText(this.formData.carNo)
      this.formData.carVar = this.trimForText(this.formData.carVar)
      this.formData.carType = this.trimForText(this.formData.carType)

      this.$refs['formCar'].validate((valid) => {
        if (valid) {
          let data = {
            carNo: this.formData.carNo,
            carVar: this.formData.carVar,
            carType: this.formData.carType,
            carBuyDate: this.formData.carBuyDate,
            carIsloan: this.formData.carIsloan,
            carPrice: this.formData.carPrice
          }

          if (this.action === 'modify') { // 修改记录
            modifyEmpCarInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, Object.assign({}, data, {
                  carIsloanText: this.formData.carIsloanText
                }))
                this.dataSaving = false
              } else {
                this.$emit('saveCancel')
                this.dataSaving = false
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的车牌号码已存在，不能重复填报！',
                    duration: 3
                  })
                }
              }
            }).catch(() => {
              this.$emit('saveCancel')
              this.dataSaving = false
            })
          } else { // 新增记录
            addEmpCarInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id,
                  carIsloanText: this.formData.carIsloanText
                }))
                this.dataSaving = false
              } else {
                this.$emit('saveCancel')
                this.dataSaving = false
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的车牌号码已存在，不能重复填报！',
                    duration: 3
                  })
                }
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
      this.$refs['formCar'].resetFields()
      this.formData = val
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
