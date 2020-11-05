<template>
  <div>
    <Card dis-hover>
      <div slot="title">
        <Form :model="modelData" :label-width="80" inline>
          <FormItem label="选择模型" prop="vriskid" class="info_title">
            <Select v-model="modelData.vriskid" style="width: 280px" @on-change="handleSelectModelChg" :label-in-value="true" clearable>
              <Option v-for="item in this.modelData.all_model_main" :value="item.vriskid" :key="item.vriskid">{{ item.vriskid }} - {{ item.riskNm }}</Option>
            </Select>
          </FormItem>

          <FormItem label="模型编号" prop="modelNum" class="info_title">
            <Input v-model="modelData.modelNum"></Input>
          </FormItem>

          <FormItem label="模型名称" prop="modelName" class="info_title">
            <Input v-model="modelData.modelName"></Input>
          </FormItem>

          <FormItem :label-width="5">
            <Button type="primary" icon="ios-search" @click="handleChgPageMainSize(pageData.size,1)" :loading="this.searching">查询</Button>
          </FormItem>
        </Form>
      </div>

      <Table size="small" :highlight-row="true" :stripe="true" border :columns="col_model_main" :data="data_model_main"
        :loading="this.searching"
        :height="windowHeight"
        @on-row-dblclick="handelShowModelInfo">
        <template slot-scope="{ row, index }" slot="action">
          <ButtonGroup>
            <Button @click="handleModifyModelInfo (row, index)" type="success" size="small">信息编辑</Button>
            <Button @click="handleModifyModelPara (row, index)" type="primary" size="small">参数设置</Button>
          </ButtonGroup>
        </template>
        <div slot="footer" style="width:100%;text-align: center">
          <Page :total="pageData.total" :current.sync="pageData.current"
            @on-change="searchMain"
            @on-page-size-change="handleChgPageMainSize"
            size="small" show-elevator show-sizer />
        </div>
      </Table>
    </Card>
  </div>
</template>

<script>
import { getModelBaseInfoList } from '@/api/model-manage/model-search'
import { mixinInfo } from './common.js'

export default {
  mixins: [mixinInfo],
  data () {
    return {
      modelData: {
        vriskid: '',
        all_model_main: [],
        modelNum: '',
        modelName: ''
      },
      formData: {
        vriskid: '',
        riskNm: '',
        freq: '',
        riskLvlText: '',
        ctlDis: '',
        riskDis: ''
      },
      pageData: {
        total: 0,
        current: 1,
        size: 10
      },
      searching: false,
      data_model_main: [],
      windowHeight: 0
    }
  },
  methods: {
    searchAllMain () {
      const condition = {
        page: 1,
        pageSize: 10000,
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
    handleChgPageMainSize (size, current) {
      if (current) this.pageData.current = current
      this.pageData.size = size
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

      if (this.modelData.modelNum !== '') {
        condition.VRiskid = this.modelData.modelNum
      }
      if (this.modelData.modelName !== '') {
        condition.riskNm = this.modelData.modelName
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
      this.formData.riskLvlText = ''
      this.formData.ctlDis = ''
      this.formData.riskDis = ''
    },
    handelShowModelInfo (row, index) {
      console.log(row)
      console.log(index)
    },
    handleModifyModelInfo (row, index) {
      console.log(row)
      console.log(index)
    },
    handleModifyModelPara (row, index) {
      console.log(row)
      console.log(index)
    },
    handleSelectModelChg (item) {
      if (item) {
        this.modelData.modelNum = item.label.split(' - ')[0]
        this.modelData.modelName = item.label.split(' - ')[1]
      } else {
        this.modelData.modelNum = ''
        this.modelData.modelName = ''
      }

      this.$nextTick(() => {
        this.searchMain()
      })
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight - 230
    }
  },
  mounted () {
    this.searchMain()
    this.searchAllMain()
  },
  created () {
    window.addEventListener('resize', this.setWindowHeight)
    this.setWindowHeight()
  },
  destroyed () {
    window.removeEventListener('resize', this.setWindowHeight)
  }
}
</script>
<style scoped>
  .ivu-form-item{
    margin-bottom: 8px;
  }
</style>
