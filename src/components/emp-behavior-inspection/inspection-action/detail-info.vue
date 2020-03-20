<template>
  <div>
    <Form ref="form" :show-message="false" :label-width="80">
        <FormItem v-for="item in this.itemData" :key="item.index" :label="item.typeText" class="info_title">
          <Input :value="item.content" type="textarea" :rows="2" :autosize='{ minRows: 2, maxRows: 2 }' readonly></Input>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import { getEmpCheckPublicParamsNoId, getEmpCheckProjectTypesById } from '@/api/emp-manage/emp-behavior-inspection'

export default {
  props: [
    'prjId',
    'refreshNow'
  ],
  data () {
    return {
      itemData: []
    }
  },
  methods: {
    initInfo () {
      if (this.prjId === undefined) return

      if (this.prjId === 0) {
        const condition = {
          status: 1,
          orderBy: 'type'
        }

        getEmpCheckPublicParamsNoId(condition).then(res => {
          if (res.data.code === '000000') {
            this.itemData = res.data.data
          }
        }).catch(() => {
          this.itemData = []
        })
      } else {
        const condition = {
          projectId: this.prjId
        }

        getEmpCheckProjectTypesById(condition).then(res => {
          if (res.data.code === '000000') {
            this.itemData = res.data.data
          }
        }).catch(() => {
          this.itemData = []
        })
      }
    }
  },
  watch: {
    refreshNow () {
      this.initInfo()
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
