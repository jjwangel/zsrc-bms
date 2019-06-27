<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Row>
          <Col span="12">
            <div style="height: 150px;margin-right: 20px;">
              <Form ref="formBase1" :model="formData" :label-width="100">
                <Row>
                  <Col span="12">
                    <FormItem label="员工工号：" prop="employeeNo" class="info_title">
                      <Input type="text" v-model="formData.employeeNo" readonly></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="员工姓名：" prop="name" class="info_title">
                      <Input type="text" v-model="formData.name" readonly></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="性别：" prop="gender" class="info_title">
                      <Input type="text" v-model="formData.gender" readonly></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="人员类别：" prop="employeeType" class="info_title">
                      <Input type="text" v-model="formData.employeeType" readonly></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="身份证号：" prop="idcardNo" class="info_title">
                      <Input type="text" v-model="formData.idcardNo" readonly></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="年龄：" prop="ageYears" class="info_title">
                      <Input type="text" v-model="formData.ageYears" readonly></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="政治面貌：" prop="politicsStatus" class="info_title">
                      <Input type="text" v-model="formData.politicsStatus" readonly></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="联系电话" prop="phone" class="info_title">
                      <Input type="text" v-model="formData.phone" readonly></Input>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col span="12">
            <div>
              <img :src="headImage" height="150px" width="120px" alt="">
            </div>
          </Col>
        </Row>
      </div>

      <Row>
        <Col span="6">
          <Form ref="formBase2" :model="formData" :label-width="100">
            <FormItem label="所属单位：" prop="deptPath" class="formitem info_title">
              <Input type="text" v-model="formData.deptPath" readonly></Input>
            </FormItem>
            <FormItem label="岗位：" prop="postName" class="formitem info_title">
              <Input type="text" v-model="formData.postName" readonly></Input>
            </FormItem>
            <FormItem label="现任职务" prop="duty" class="formitem info_title">
              <Input type="text" v-model="formData.duty" readonly></Input>
            </FormItem>
            <FormItem label="柜员号：" prop="tellerNo" class="formitem info_title">
              <Input type="text" v-model="formData.tellerNo" readonly></Input>
            </FormItem>
            <FormItem label="入行时间：" prop="joinTime" class="formitem info_title">
              <Input type="text" v-model="formData.joinTime" readonly></Input>
            </FormItem>
            <FormItem label="连续工龄" prop="workingAge" class="formitem info_title">
              <Input type="text" v-model="formData.workingAge" readonly></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="6">
          <Form ref="formBase3" :model="formData" :label-width="100">
            <FormItem label="所在部室：" prop="deptName" class="formitem info_title">
              <Input type="text" v-model="formData.deptName" readonly></Input>
            </FormItem>
            <FormItem label="任现岗时间" prop="currentPostTime" class="formitem info_title">
              <Input type="text" v-model="formData.currentPostTime" readonly></Input>
            </FormItem>
            <FormItem label="职务级别" prop="dutyGrade" class="formitem info_title">
              <Input type="text" v-model="formData.dutyGrade" readonly></Input>
            </FormItem>
            <FormItem label="工资账号" prop="salaryAccount" class="formitem info_title">
              <Input type="text" v-model="formData.salaryAccount" readonly></Input>
            </FormItem>
            <FormItem label="参加工作时间" prop="attendJobTime" class="formitem info_title">
              <Input type="text" v-model="formData.attendJobTime" readonly></Input>
            </FormItem>
            <FormItem label="本岗位任职时间" prop="joinHeadSubTime" class="formitem info_title">
              <Input type="text" v-model="formData.joinHeadSubTime" readonly></Input>
            </FormItem>
          </Form>
        </Col>

        <Col span="6">
          <Form ref="formBase4" :model="formData" :label-width="100">
            <FormItem label="户口所在地：" prop="registeredResidence" class="formitem info_title">
              <Input type="text" v-model="formData.registeredResidence" readonly></Input>
            </FormItem>
            <FormItem label="现详细地址：" prop="address" class="formitem info_title">
              <Input type="text" v-model="formData.address" readonly></Input>
            </FormItem>
            <FormItem label="婚姻状况：" prop="maritalStatus" class="formitem info_title">
              <Input type="text" v-model="formData.maritalStatus" readonly></Input>
            </FormItem>
            <FormItem label="籍贯：" prop="nativePlace" class="formitem info_title">
              <Input type="text" v-model="formData.nativePlace" readonly></Input>
            </FormItem>
            <FormItem label="学历：" prop="education" class="formitem info_title">
              <Input type="text" v-model="formData.education" readonly></Input>
            </FormItem>
            <FormItem label="配偶姓名：" prop="spouseName" class="formitem info_title">
              <Input type="text" v-model="formData.spouseName" readonly></Input>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getEmpBaseInfo } from '@/api/emp-manage/emp-search'
import { getUserHeadImage } from '@/api/user'
export default {
  props: [
    'loadData',
    'mainData'],
  components: {

  },
  data () {
    return {
      main_data: this.mainData,
      formData: {},
      headImage: ''
    }
  },
  methods: {
    handleRefreshData () {
      const condition = {
        id: this.main_data.id
      }

      getEmpBaseInfo(condition).then(res => {
        let data = res.data
        if (data.code === '000000') {
          this.formData = data.data
        }
      }).catch(() => {
        this.formData = {}
      })

      getUserHeadImage({ employeeNo: this.main_data.employeeNo }).then(res => {
        let data = res.data
        if (data.code === '000000') {
          if (data.data.image) {
            this.headImage = `data:image/png;base64,${data.data.image}`
          } else {
            this.headImage = ''
          }
        }
      }).catch(() => {
        this.formData = {}
      })
    }
  },
  watch: {
    mainData (val) {
      this.main_data = val
    },
    loadData (val) {
      if (val) this.handleRefreshData()
    }
  }
}
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom: 8px;
  }
  .formitem{
    margin-bottom: 10px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }

</style>
