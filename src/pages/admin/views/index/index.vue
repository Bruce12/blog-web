<template>
  <div class="page-container">
    <ul class="blog_list">
      <li class="flex flex_content_center">
        <div class="blog_list__item">
          <img src="http://img.yimutian.com/crm/5d2ea8f3885b930e0b05a8a66e8da8df.png" alt="">
        </div>
        <div class="blog_list__box felx1">
          <span>标题d</span>
          <div class="blog_list__box-content">预览内容</div>
          <div class="blog_list__box-link">链接</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { getList } from './api'

@Component({
  name: 'Index',
  components: {
    MarkdownEditor
  }
})

export default class extends Vue {
  private list: any[] = []
  created() {
    getList()
      .then((data: any) => {
        console.log(data)
        this.list = data.data || []
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.page-container {
  background: #fff;
}
.blog_list {
  li {
    border-bottom: dashed 1px #e5e5e5;
    overflow: hidden;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  &__item {
    width: 28%;
    img {
      width: 100%;
      height: 150px;
    }
  }
  &__box {
    margin-left: 18px;
  }
}
</style>
