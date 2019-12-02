<template>
  <div>
    <Form ref="form" :show-message="false" :model="formData" :label-width="80" inline>
      <Row>
        <Col span="12">
          <FormItem label="排查项目" prop="prjName" class="info_title">
            <Input type="text" v-model="prjName" readonly style="width: 395px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="工号" prop="employeeNo" class="info_title">
            <Input type="text" v-model="formData.employeeNo" readonly ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="姓名" prop="employeeName" class="info_title">
            <Input type="text" v-model="formData.employeeName" readonly ></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <ButtonGroup>
            <Button type="primary" @click="handleBackward" :disabled="this.currentIndex === 0"><Icon type="ios-arrow-back"></Icon>上一条</Button>
            <Button type="primary" @click="handleForward" :disabled="this.currentIndex === this.submitData.length - 1">下一条<Icon type="ios-arrow-forward"></Icon></Button>
            <Button type="success" @click="handleBatchSetCheck">以上排查内容均无异常</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Progress v-show="submitData.length > 1" status="active" style="margin-left: 10px;" :percent="this.getProgressPercent">
      </Progress>
    </Form>

    <div style="margin-left: 10px;margin-top: 10px;">
      <Table size="small" :height="400" :stripe="true" border ref="table" :loading="this.loadData" :columns="cols" :data="formData.CheckList">
        <template slot-scope="{ row, index }" slot="action">
          <RadioGroup v-model="formData.CheckList[index].checkStatusText">
            <Radio label="正常"></Radio>
            <Radio label="异常"></Radio>
            <Radio label="不清楚"></Radio>
          </RadioGroup>
        </template>
      </Table>

      <Form ref="form1" :show-message="false" :model="formData" label-position="top" style="margin-top: 10px;">
        <FormItem label="存在其它异常行为" prop="otherUnusualBehavior" class="info_title">
          <Input type="textarea" show-word-limit :maxlength="200" v-model="formData.otherUnusualBehavior" :rows="2" :autosize='{ minRows: 4, maxRows: 4 }'></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { getEmpCheckProjectTypesById, addEmpCheckRecordByBatch } from '@/api/emp-manage/emp-behavior-inspection'
import { mixinInfo } from './common.js'

export default {
  components: {

  },
  mixins: [ mixinInfo ],
  props: [
    'rowData',
    'saveNow',
    'prjId',
    'initFlag',
    'prjName'
  ],
  data () {
    return {
      loadData: false,
      dataSet: [],
      formData: {
        employeeNo: '',
        employeeName: '',
        prjName: '',
        otherUnusualBehavior: '',
        CheckList: []
      },
      currentIndex: 0,
      submitData: [],
      showInsParaDetail: false,
      showShowAttached: false
    }
  },
  computed: {
    getProgressPercent () {
      if (this.submitData.length <= 1) return 100
      return Math.ceil((this.currentIndex + 1) / this.submitData.length * 100)
    }
  },
  methods: {
    initInfo () {
      this.currentIndex = 0
      const condition = {
        projectId: this.prjId
      }

      getEmpCheckProjectTypesById(condition).then(res => {
        if (res.data.code === '000000') {
          const data = res.data.data
          this.dataSet = []
          this.submitData = []
          for (const elem of data.values()) {
            this.dataSet.push({
              id: elem.id,
              type: elem.type,
              typeText: elem.typeText,
              content: elem.content,
              checkStatusText: ''
            })
          }

          // 构建提交的原始数据
          for (const elem of this.rowData.values()) {
            this.submitData.push({
              employeeNo: elem.employeeNo,
              employeeName: elem.name,
              idcardNo: elem.idcardNo,
              prjName: this.prjName,
              otherUnusualBehavior: '',
              CheckList: JSON.parse(JSON.stringify(this.dataSet))
            })
          }

          this.setFormData(0, 0)
        }
      }).catch(() => {
        this.dataSet = []
      })
    },
    setFormData (sourceIndex, currentIndex) {
      if (sourceIndex !== currentIndex) {
        // 保存formData已修改的数据
        this.submitData[sourceIndex].employeeNo = this.formData.employeeNo
        this.submitData[sourceIndex].employeeName = this.formData.employeeName
        this.submitData[sourceIndex].otherUnusualBehavior = this.formData.otherUnusualBehavior
        this.submitData[sourceIndex].CheckList = JSON.parse(JSON.stringify(this.formData.CheckList))
      }

      // 用下一条数据更新当前formData
      this.formData.employeeNo = this.submitData[currentIndex].employeeNo
      this.formData.employeeName = this.submitData[currentIndex].employeeName
      this.formData.otherUnusualBehavior = this.submitData[currentIndex].otherUnusualBehavior
      this.formData.CheckList = JSON.parse(JSON.stringify(this.submitData[currentIndex].CheckList))
    },
    handleBackward () {
      const sourceIndex = this.currentIndex
      this.currentIndex--

      this.setFormData(sourceIndex, this.currentIndex)
    },
    handleForward () {
      if (this.formData.CheckList.findIndex(v => v.checkStatusText === '') !== -1) {
        this.$Message.warning({
          content: '有未设置“排查情况”的记录！',
          duration: 5
        })
      } else {
        const sourceIndex = this.currentIndex
        this.currentIndex++
        this.setFormData(sourceIndex, this.currentIndex)
      }
    },
    handleBatchSetCheck () {
      for (let item of this.formData.CheckList.values()) {
        item.checkStatusText = '正常'
      }
    },
    handleSaveDetail () {
      if (this.formData.CheckList.findIndex(v => v.checkStatusText === '') !== -1) {
        this.$Message.warning({
          content: '有未设置“排查情况”的记录！',
          duration: 5
        })
        this.$emit('saveCancel')
      } else {
        this.$Modal.confirm({
          title: '排查登记',
          content: '确定保存吗？',
          onOk: this.saveDetail,
          onCancel: () => {
            this.$emit('saveCancel')
          }
        })
      }
    },
    saveDetail () {
      let data = []
      // 保存最后一条数据
      this.submitData[this.currentIndex].employeeNo = this.formData.employeeNo
      this.submitData[this.currentIndex].employeeName = this.formData.employeeName
      this.submitData[this.currentIndex].otherUnusualBehavior = this.formData.otherUnusualBehavior
      this.submitData[this.currentIndex].CheckList = JSON.parse(JSON.stringify(this.formData.CheckList))

      for (let main of this.submitData.values()) {
        let rows = {
          employeeNo: main.employeeNo,
          idcardNo: main.idcardNo,
          otherUnusualBehavior: main.otherUnusualBehavior,
          projectId: this.prjId,
          details: []
        }

        for (let sub of main.CheckList.values()) {
          let listData = {
            recordId: 0,
            status: 0,
            typeId: sub.type
          }
          switch (sub.checkStatusText) {
            case '正常' : listData.status = 1
              break
            case '异常' : listData.status = 2
              break
            case '不清楚' : listData.status = 3
              break
          }
          rows.details.push(listData)
        }
        data.push(rows)
      }

      addEmpCheckRecordByBatch(data).then(res => {
        if (res.data.code === '000000') {
          this.$Message.success({
            content: '保存数据成功！',
            duration: 3
          })
          this.$emit('saveSuccess', this.rowData)
        } else {
          this.$emit('saveCancel')
        }
      }).catch(() => {
        this.$emit('saveCancel')
      })
    }
  },
  watch: {
    saveNow (val) {
      if (val) this.handleSaveDetail()
    },
    initFlag (val) {
      if (val) this.initInfo()
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
