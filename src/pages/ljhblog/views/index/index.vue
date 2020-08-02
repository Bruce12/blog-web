<template>
  <main class="main">
    <!-- <article class="crad-wrap">
      <header class="crad-wrap_th">
        <span>标题</span>
        <span>2020-05-05</span>
      </header>
      <footer class="crad-wrap_td">
        之二是内容啊阿斯顿发洛杉矶两三点积分老师就地方了
      </footer>
    </article> -->
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { getList } from './api'

@Component({
  name: 'PublishArticle',
  components: {
    MarkdownEditor
  }
})

export default class extends Vue {
  created() {
    // getList().then().catch().finally()
  }
}
</script>
<style lang="less" scoped>
.main {
  padding: 0 .2rem;
  font-size: .4rem;
}
.crad-wrap {
  box-shadow: 10px 10px 6px red ;
}
</style>
