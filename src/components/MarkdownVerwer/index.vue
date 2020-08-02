<template>
  <div style="width: 100%;hegiht: 100%">
    <Viewer
      v-if="value"
      :initial-value="value"
      :height="height"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import 'highlight.js/styles/github.css'
import { Viewer } from '@toast-ui/vue-editor'

@Component({
  name: 'MarkdownVerwer',
  components: {
    Viewer
  }
})

export default class extends Vue {
  @Prop({ default: '' }) private initialValue!: string
  @Prop({ default: '300px' }) private height!: string
  private value: string = this.initialValue
  @Watch('initialValue')
  private onValueChange(value: string) {
    this.value = value
  }
}
</script>
<style lang="less" scoped>

</style>
