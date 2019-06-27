<template>
  <div>
    <Card dis-hover>
      <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_model_main" :data="data_model_main"
        :loading="this.searching"
        height=300
        @on-row-dblclick="handelSearchPara">
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current"
            @on-change="searchMain"
            @on-page-size-change="handleChgPageMainSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>

    <Card dis-hover style="height: 300px">
      <div class="para-split">
        <Split v-model="split_para">
            <div slot="left" class="para-split-pane">
              <Form ref="formPara" :model="formData" :label-width="80">
                <Row :gutter="20">
                  <Col span="12">
                    <FormItem label="模型编号" prop="vriskid" class="info_title">
                      <Input v-model="formData.vriskid" :readonly="true"></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="模型名称" prop="riskNm" class="info_title">
                      <Input v-model="formData.riskNm" :readonly="true"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="20">
                  <Col span="12">
                    <FormItem label="运行频率" prop="freq" class="info_title">
                      <Input v-model="formData.freq" :readonly="true"></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="风险级别" prop="riskLvl" class="info_title">
                      <Input v-model="formData.riskLvl" :readonly="true"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <FormItem label="控制目标" prop="ctlDis" class="info_title">
                  <Input type="textarea" v-model="formData.ctlDis" :readonly="true" :rows="2" :autosize='{ minRows: 2, maxRows: 2 }'></Input>
                </FormItem>
                <FormItem label="模型描述" prop="riskDis" class="info_title">
                  <Input type="textarea" v-model="formData.riskDis" :readonly="true" :rows="4"></Input>
                </FormItem>
              </Form>
            </div>
            <div slot="right" class="para-split-pane">
              <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_model_para" :data="data_model_para"
                :loading="this.searching_para"
                :height='245'>
              </Table>
            </div>
        </Split>
    </div>
    </Card>

    <Card dis-hover>
        <Form :model="modelData" :label-width="80" inline>
          <FormItem label="选择模型" prop="vriskid" class="info_title">
            <Select v-model="modelData.vriskid" style="width: 280px" filterable>
              <Option v-for="item in this.modelData.all_model_main" :value="item.vriskid" :key="item.vriskid">{{ item.vriskid }} - {{ item.riskNm }}</Option>
            </Select>
          </FormItem>

          <FormItem label="分组编号" prop="groupNum" class="info_title">
            <Input v-model="modelData.groupNum"></Input>
          </FormItem>

          <FormItem label="数据日期" prop="date_value" class="info_title">
            <DatePicker type="daterange" placement="bottom-start"
              style="width: 200px;margin-right: 10px"
              :clearable="false"
              :value="modelData.date_value"
              @on-change="handleDateChange"
              :editable='false'></DatePicker>
          </FormItem>

          <Button type="primary" icon="ios-search"
            :to="modelDownloadUrl + modelData.downloadPara" target="_blank"
            :disabled="modelData.date_value.length === 0 || modelData.vriskid === ''"
            @click="handleDownloadModelData"
            :loading="this.downloading">下载</Button>
        </Form>
    </Card>
  </div>
</template>

<script>
import { getModelBaseInfoList, getModelParaList } from '@/api/model-manage/model-search'
import { mixinInfo } from './common.js'

export default {
  mixins: [mixinInfo],
  data () {
    return {
      modelData: {
        vriskid: '',
        groupNum: '',
        date_value: [],
        downloadPara: '',
        all_model_main: []
      },
      formData: {
        vriskid: '',
        riskNm: '',
        freq: '',
        riskLvl: '',
        ctlDis: '',
        riskDis: ''
      },
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      pageDetail: {
        total: 0,
        current: 1,
        size: 10
      },
      split_para: 0.6,
      searching: false,
      searching_para: false,
      searching_detail: false,
      data_model_main: [],
      data_model_para: [],
      data_model_data: [],
      downloading: false,
      base_url: '',
      modelDownloadUrl: ''
    }
  },
  methods: {
    handleDateChange (val) {
      this.modelData.date_value = val
    },
    searchAllMain () {
      const condition = {
        orderBy: 'v_riskid'
      }

      getModelBaseInfoList(condition).then(res => {
        if (res.data.code === '000000') {
          this.modelData.all_model_main = res.data.data.rows
        }
      }).catch(() => {
        this.modelData.all_model_main = []
      })
    },
    handleChgPageMainSize (val) {
      this.pageData.size = val
      this.$nextTick(() => {
        this.searchMain()
      })
    },
    handleSearchMain () {
      this.pageData.current = 1
      this.$nextTick(() => {
        this.searchMain()
      })
    },
    searchMain () {
      if (this.searching) return
      this.searching = true

      const condition = {
        page: this.pageData.current,
        pageSize: this.pageData.size,
        orderBy: 'v_riskid'
      }

      getModelBaseInfoList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_model_main = res.data.data.rows
          this.pageData.total = res.data.data.total
        }

        this.searching = false
      }).catch(() => {
        this.data_model_main = []
        this.searching = false
      })

      this.formData.vriskid = ''
      this.formData.riskNm = ''
      this.formData.freq = ''
      this.formData.riskLvl = ''
      this.formData.ctlDis = ''
      this.formData.riskDis = ''
      this.data_model_para = []
    },
    handelSearchPara (row, index) {
      this.formData.vriskid = row.vriskid
      this.formData.riskNm = row.riskNm
      this.formData.freq = row.freq
      this.formData.riskLvl = row.riskLvl
      this.formData.ctlDis = row.ctlDis
      this.formData.riskDis = row.riskDis

      this.searching_para = true

      const condition = {
        moId: row.vriskid,
        orderBy: 'para_id'
      }

      getModelParaList(condition).then(res => {
        if (res.data.code === '000000') {
          this.data_model_para = res.data.data
        }

        this.searching_para = false
      }).catch(() => {
        this.data_model_para = []
        this.searching_para = false
      })
    },
    handleDownloadModelData () {
      if (this.downloading) return

      this.downloading = true
      this.modelData.groupNum = this.trimForText(this.modelData.groupNum)
      this.modelData.downloadPara = `modelCode=${this.modelData.vriskid}&dataDateStart=${this.modelData.date_value[0]}&dataDateEnd=${this.modelData.date_value[1]}`
      if (this.modelData.groupNum !== '') {
        this.modelData.downloadPara = this.modelData.downloadPara + `&groupKey=${this.modelData.groupNum}`
      }

      this.$Message.info({
        content: '正在生成数据，请稍候......',
        duration: 5
      })

      setTimeout(() => {
        this.downloading = false
      }, 5000)
    }
  },
  mounted () {
    this.base_url = (process.env.NODE_ENV === 'production' ? this.$config.baseUrl.pro : this.$config.baseUrl.dev)
    this.modelDownloadUrl = this.base_url + 'modeldata/export?'
    this.searchMain()
    this.searchAllMain()
  }
}
</script>
<style scoped>
  .para-split{
    height: 265px;
    border: 1px solid #dcdee2;
  }
  .para-split-pane{
    padding: 10px;
  }
  .ivu-form-item{
    margin-bottom: 8px;
  }
  .info_title{
    font-weight:bold;
    color: #464c5b;
  }
</style>
