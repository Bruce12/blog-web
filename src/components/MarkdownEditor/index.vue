<template>
  <div>
    <editor
      ref="toastuiEditor"
      v-model="val"
      :initial-value="defaultText"
      :options="editorOptions"
      :height="height"
      initial-edit-type="markdown"
      preview-style="tab"
      @change="onEditorChange"
    />
  </div>
</template>

<script lang="ts">
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'highlight.js/styles/github.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import { Editor } from '@toast-ui/vue-editor'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import defaultOptions from './default-options'
@Component({
  name: 'MarkdownEditor',
  components: {
    Editor
  }
})
export default class extends Vue {
  @Prop({ default: () => defaultOptions }) private options!: any
  @Prop({ default: 'markdown' }) private mode!: string
  @Prop({ default: '300px' }) private height!: string
  @Prop({ default: '' }) private defaultText!: string
  // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
  @Prop({ default: 'en_US' }) private language!: string
  private markdownEditor?: Editor
  private val: string = ''
  private timer!: NodeJS.Timer
  get editorOptions() {
    const options = Object.assign({}, defaultOptions, this.options)
    options.initialEditType = this.mode
    options.height = this.height
    options.language = this.language
    options.plugins = [[ codeSyntaxHighlight, { hljs } ]]
    return options
  }
  private onEditorChange(val: string) {
    clearTimeout(this.timer)
    setTimeout(() => {
      let html = (this.$refs.toastuiEditor as Editor).invoke('getMarkdown')
      this.$emit('input', html)
    }, 600)
  }
}
</script>
<style lang="less" scoped>

</style>
