<template>
  <div>
    <Form ref="formInline" :label-width="100">
        <FormItem label="征信报告日期">
          <DatePicker type="date" :editable="false" style="width:150px;"></DatePicker>
        </FormItem>
        <FormItem label="">
            <Upload
            ref="upload"
            action="//jsonplaceholder.typicode.com/posts/"
            multiple
            :default-file-list="DefaultFileList"
            :format="['jpg','bmp','png']"
            :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
        </FormItem>
      </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      DefaultFileList: [
        {
          name: 'img1.jpg',
          url: 'http://www.xxx.com/img1.jpg'
        },
        {
          name: 'img2.jpg',
          url: 'http://www.xxx.com/img2.jpg'
        }
      ]
    }
  },
  methods: {
    handleUpload (file) {
      this.$refs.upload.fileList.push(file)
      return false
    }
  }
}
</script>
