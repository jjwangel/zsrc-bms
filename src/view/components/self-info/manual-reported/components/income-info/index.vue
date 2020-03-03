<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <span class="info_title" style="margin-left: 55px">填报年份</span>
        <DatePicker type="year" :options="optSelDate"
          @on-change="handleDateChange"
          :disabled="this.searching || this.dataSaving"
          :clearable="false"
          :value="this.formData.date_value"
          style="width: 100px;margin-right: 10px;margin-left: 18px"
          :editable='false'></DatePicker>
      </div>
      <Form ref="formOI" :rules="ruleOI" :model="formData" :show-message="false" :label-width="130">
        <FormItem label="其他收入（累计）" prop="incoTol" class="info_title">
          <InputNumber :min="0" :precision="2" :active-change="false" @on-change="handleTolChange" placeholder="填报除本行收入、本行股金分红以外的收入" style="width: 280px;" v-model="formData.incoTol" :readonly="this.searching || this.dataSaving">
          </InputNumber>
          <span> 元 （填报除本行收入、本行股金分红以外的收入）</span>
        </FormItem>
        <FormItem label="收入类型" prop="incoType" class="info_title">
            <Input type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 3 }" v-model="formData.incoType" style="width: 530px;"
              placeholder="可输入100字以内，不同类型用“，”隔开，如：租金收入、房产转卖，汽车转卖" :readonly="this.searching || this.dataSaving"></Input>
        </FormItem>
        <FormItem>
          <div style="width: 530px">
            <Button type="success" icon="md-checkbox-outline" long
            @click="handleSumbit"
            :loading="this.searching" :disabled="this.dataSaving">提交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOtherIncomeList, modifyEmpOtherIncome, addEmpOtherIncome } from '@/api/self-info/info-fill'
import { getFormatDate } from '@/libs/j-tools.js'
export default {
  data () {
    const validateIncoType = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '收入类型不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 100) {
          this.$Message.warning({
            content: '收入类型长度不能大于100个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateIncoTol = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '年度收入必需大于0',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    return {
      dataSaving: false,
      searching: false,
      optSelDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      formData: {
        id: '',
        date_value: '',
        incoTol: 0,
        incoType: ''
      },
      ruleOI: {
        incoType: [
          { validator: validateIncoType, trigger: 'change' }
        ],
        incoTol: [
          { validator: validateIncoTol, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleTolChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.incoTol = 0
        })
      }
    },
    handleDateChange (val) {
      this.formData.date_value = val
      this.handleSearchData(this.date_value)
    },
    handleSumbit () {
      this.$Modal.confirm({
        title: '员工其他收入',
        content: '确定保存当前数据吗？',
        onOk: this.saveData
      })
    },
    saveData () {
      this.dataSaving = true
      this.formData.incoType = this.trimForText(this.formData.incoType)

      this.$refs['formOI'].validate((valid) => {
        if (valid) {
          if (this.formData.id === '') { // 新增年度数据
            let data = {
              incoTol: this.formData.incoTol,
              incoType: this.formData.incoType,
              year: new Date(this.formData.date_value).getFullYear(),
              employeeNo: this.employeeNo()
            }

            addEmpOtherIncome(data).then(res => {
              if (res.data.code === '000000') {
                this.formData.id = res.data.data.id
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.dataSaving = false
              }
            }).catch(() => {
              this.dataSaving = false
            })
          } else { // 修改年度数据
            let data = {
              id: this.formData.id,
              incoTol: this.formData.incoTol,
              incoType: this.formData.incoType
            }

            modifyEmpOtherIncome(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.dataSaving = false
              }
            }).catch(() => {
              this.dataSaving = false
            })
          }
        } else {
          this.dataSaving = false
        }
      })
    },
    handleSearchData (year) {
      this.$refs['formOI'].resetFields()
      if (this.searching) return

      this.searching = true
      const formData = {
        year: new Date(this.formData.date_value).getFullYear(),
        employeeNo: this.employeeNo()
      }

      getOtherIncomeList(formData).then(res => {
        if (res.data.code === '000000') {
          if (Object.keys(res.data.data).length > 0) {
            this.formData.id = res.data.data.id
            this.formData.incoTol = res.data.data.incoTol
            this.formData.incoType = res.data.data.incoType
          } else {
            this.formData.id = ''
            this.formData.incoTol = 0
            this.formData.incoType = ''

            this.$Message.info({
              content: `找不到${new Date(this.formData.date_value).getFullYear()}年度的数据`,
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
    this.formData.date_value = getFormatDate('yyyy-MM-dd')
    this.handleSearchData(this.formData.date_value)
  }
}
</script>

<style scoped>
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
