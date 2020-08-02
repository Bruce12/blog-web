<template>
  <main v-loading.fullscreen="loading">
    <div class="tab">
      <TapSwitch
        label="value"
        :list="tabs"
        value="key"
        group
        keep
        :tab-click="tabClick"
      />
    </div>
    <div class="pull_right edit_btn">
      <el-button size="mini" type="danger" @click="save()">保存</el-button>
    </div>
    <div v-if="loadData" class="verwer">
      <MarkdownEditor v-model="content" height="90vh" :default-text="dataObj.content"/>
    </div>
    <div v-if="!dataObj.content && !isEdit" class="empty">
      暂无数据
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import TapSwitch from '@/components/TapSwitch/index.vue'
import { getList, editEssay, saveEssay } from './api'

@Component({
  name: 'InterviewQust',
  components: {
    TapSwitch,
    MarkdownEditor
  }
})

export default class extends Vue {
  private dataObj: any = {}
  private tabs: ICv[] = [
    { code: 'css', value: 'css', selected: true },
    { code: 'js', value: 'javascript' },
    { code: 'arithmetic', value: '算法' },
    { code: 'ts', value: 'Typescript' },
    { code: 'node', value: 'node' },
    { code: 'vue', value: 'Vue' },
    { code: 'wx', value: '微信开发' },
    { code: 'others', value: '其他' }
  ]
  private curentType: string = this.tabs[0].code
  private isEdit: boolean = false
  private content: string = ''
  private loading: boolean = false
  private loadData: boolean = false
  created() {
    this.getList()
  }
  private getList() {
    this.loadData = false
    getList({ type: this.curentType })
      .then(data => {
        this.dataObj = data.data[0] || {}
      })
      .finally(() => {
        this.loadData = true
      })
  }
  // 保存
  private save() {
    let postData = {
      title: this.curentType,
      type: this.curentType,
      content: this.content
    }
    if (this.loading) return
    this.loading = true
    if (this.dataObj._id) {
      editEssay(this.dataObj._id, postData)
        .then(data => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.isEdit = false
          this.getList()
        })
        .finally(() => {
          this.loading = false
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    } else {
      saveEssay(postData)
        .then(data => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getList()
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: e
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
  pageVisible() {
    console.log('页面显示出来了')
  }
  pageHidden() {
    console.log('页面隐藏了')
  }
  private tabClick(item: ICv) {
    this.curentType = item.code
    this.getList()
  }
}
</script>
<style lang="less" scoped>
main {
  padding: 10px;
  height: 100vh;
  max-width: 90vw;
  margin: 0 auto;
  background: #fff;
}
.tab {
  background: #ddd;
  padding: 10px;
  border-radius: 4px;
  display: inline-block;
  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);;
  }
}
.verwer {
  border-top: 1px solid #dfdfde;
  margin-top: 8px;
}
.empty {
  text-align: center;
  padding: 16px 0;
  color: #ddd;
}
.edit_btn {
  margin-top: 12px;
}
</style>
