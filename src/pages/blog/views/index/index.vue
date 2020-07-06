<template>
  <main class="">
    我是首页
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'

@Component({
  name: 'PublishArticle',
  components: {
    MarkdownEditor
  }
})

export default class extends Vue {

}
</script>
<style lang="less" scoped>

</style>
