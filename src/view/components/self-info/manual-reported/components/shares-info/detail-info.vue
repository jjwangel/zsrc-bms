<template>
  <div>
      <Form ref="formShares" :rules="ruleShares" :show-message="false" :model="formData" :label-width="130">
        <FormItem label="">
          <p class="memo_info">请填报员工持有农合机构（含中山农商银行）、村集体、企业的股金信息</p>
        </FormItem>
        <FormItem label="股金所属单位全称" prop="capName" class="info_title">
          <Input v-model="formData.capName" :readonly="this.action==='view'"></Input>
        </FormItem>
        <FormItem label="持有股金数" prop="capNum" class="info_title">
          <InputNumber style='width:100%' v-model="formData.capNum" :min="0" :precision="2" :active-change="false" @on-change="handleNumChange" :readonly="this.action==='view'"></InputNumber>
        </FormItem>
        <FormItem label="购入股金出资额" prop="capPrice" class="info_title">
          <div>
            <InputNumber style='width:85%' v-model="formData.capPrice" :min="0" :precision="2" :active-change="false" @on-change="handlePriceChange" :readonly="this.action==='view'"></InputNumber>
            <span style="margin-left: 10px">元</span>
          </div>
        </FormItem>
        <FormItem label="">
          <p class="memo_info">当持有某单位股金是无需出资购入的，“购入股金出资额”处可以输入0元，如果存在部分或全部是出资购入的，按实际出资额填报。</p>
        </FormItem>
      </Form>
  </div>
</template>

<script>
import { modifyEmpSharesInfo, addEmpSharesInfo } from '@/api/self-info/info-fill'
import { mapGetters } from 'vuex'
export default {
  props: [
    'action',
    'rowData',
    'saveData'
  ],
  data () {
    const validateCapName = (rule, value, callback) => {
      if (value === '') {
        this.$Message.warning({
          content: '股金所属单位全称不能为空！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        if (value.length > 50) {
          this.$Message.warning({
            content: '股金所属单位全称长度不能大于50个字符',
            duration: 5
          })
          callback(new Error(''))
        } else {
          callback()
        }
      }
    }

    const validateCapNum = (rule, value, callback) => {
      if (!value || value === 0) {
        this.$Message.warning({
          content: '持有股金数必需大于0 ！',
          duration: 5
        })
        callback(new Error(''))
      } else {
        callback()
      }
    }

    // const validateCapPrice = (rule, value, callback) => {
    //   if (!value || value === 0) {
    //     this.$Message.warning({
    //       content: '购入股金出资额必需大于0 ！',
    //       duration: 5
    //     })
    //     callback(new Error(''))
    //   } else {
    //     callback()
    //   }
    // }

    return {
      formData: this.rowData,
      ruleShares: {
        capNum: [
          { validator: validateCapNum, trigger: 'change' }
        ],
        // capPrice: [
        //   { validator: validateCapPrice, trigger: 'change' }
        // ],
        capName: [
          { validator: validateCapName, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapGetters([
      'employeeNo'
    ]),
    handleNumChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.capNum = 0
        })
      }
    },
    handlePriceChange (val) {
      if (val === null) {
        this.$nextTick(() => {
          this.formData.capPrice = 0
        })
      }
    },
    handleSaveDetail () {
      this.$Modal.confirm({
        title: '员工股金信息',
        content: '确定保存当前数据吗？',
        onOk: this.saveDetail,
        onCancel: () => {
          this.$emit('saveCancel')
        }
      })
    },
    saveDetail () {
      this.formData.capName = this.trimForText(this.formData.capName)

      this.$refs['formShares'].validate((valid) => {
        if (valid) {
          let data = {
            capType: 1,
            capName: this.formData.capName,
            capNum: this.formData.capNum,
            capPrice: this.formData.capPrice
          }

          if (this.action === 'modify') { // 修改记录
            modifyEmpSharesInfo(Object.assign({}, data, { id: this.formData.id })).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', false, this.formData._index, data)
              } else {
                this.$emit('saveCancel')
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的股金单位名称已存在，不能重复填报！',
                    duration: 3
                  })
                }
              }
            }).catch(() => {
              this.$emit('saveCancel')
            })
          } else { // 新增记录
            addEmpSharesInfo(data).then(res => {
              if (res.data.code === '000000') {
                this.$Message.success({
                  content: '保存数据成功！',
                  duration: 3
                })
                this.$emit('saveSuccess', true, this.formData._index, Object.assign({}, data, {
                  id: res.data.data.id
                }))
              } else {
                this.$emit('saveCancel')
                if (res.data.code === '003304') {
                  this.$Message.warning({
                    content: '你填报的股金单位名称已存在，不能重复填报！',
                    duration: 3
                  })
                }
              }
            }).catch(() => {
              this.$emit('saveCancel')
            })
          }
        } else {
          this.$emit('saveCancel')
        }
      })
    }
  },
  watch: {
    rowData (val) {
      this.$refs['formShares'].resetFields()
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
  .memo_info{
    font-size:xx-small;
    line-height:20px;
  }
</style>
