<template>
  <main class="">
    <el-form
      ref="formModel"
      label-width="60px"
      label-position="left"
      :model="formModel"
    >
      <el-form-item
        label="标题"
        prop="title"
        :rules="[{required: true, trigger: 'blur', message: '标题为必填项'}]"
      >
        <el-input v-model="formModel.title" placeholder="标题"/>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
        :rules="[{required: true, trigger: 'blur', message: '类型为必填项'}]"
      >
        <el-select
          v-model="formModel.type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictList"
            :key="item.dictCode"
            :value="item.dictCode"
            :label="item.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="内容"
        prop="htmlVal"
        :rules="[{required: true, trigger: 'blur', message: '内容为必填项'}]"
      >
        <MarkdownEditor v-model="formModel.htmlVal" height="500px"/>
      </el-form-item>
    </el-form>
    <div class="text_center">
      <el-button type="primary" size="big" @click="save">保存</el-button>
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { getDictList, saveEssay } from './api'

@Component({
  name: 'PublishArticle',
  components: {
    MarkdownEditor
  }
})

export default class extends Vue {
  private dictList: any[] = []
  private formModel = {
    title: '',
    type: '',
    htmlVal: ''
  }
  created() {
    this.getDictList()
  }
  private getDictList() {
    getDictList('ARTICLE_TYPE')
      .then(data => {
        this.dictList = data.data
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  private save() {
    const postData = {
      title: this.formModel.title,
      type: this.formModel.type,
      content: this.formModel.htmlVal
    }
    saveEssay(postData)
      .then((data: any) => {
        this.$message({
          type: 'success',
          message: data.message
        })
      })
      .catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
  }
}
</script>
<style lang="less" scoped>
main {
  padding: 0 15px;
  height: 100vh;
  margin: 15px auto;
}
</style>
