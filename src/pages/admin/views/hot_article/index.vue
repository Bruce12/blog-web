<template>
  <div class="page-container">
    <div v-for="item in dataList" :key="item._id">
      {{item.title}}
      <MarkdownEditor :default-text="item.content" is-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { getList } from './api'

@Component({
  name: 'Home',
  components: {
    MarkdownEditor
  }
})

export default class extends Vue {
  private dataList: any[] = []
  created() {
    getList({ type: 'interviewQue' })
      .then(data => {
        this.dataList = data.data
      })
  }
}
</script>
<style lang="less" scoped>
</style>
