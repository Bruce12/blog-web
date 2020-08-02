<template>
  <div class="note_wrap">
    <h2 class="text_center note_wrap__title">{{ title }}</h2>
    <ul>
      <li
        v-for="item in tagList"
        :key="item.code"
        @click="showDetail(item.code)"
      >
        {{ item.value }}
      </li>
    </ul>
    <Dialog :visible.sync="isShow">
      <h3>{{ dataObj.title }}</h3>
      <MarkdownVerwer :initial-value="dataObj.content" />
    </Dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Dialog from '../../components/Dialog/index.vue'
import { getList } from './api'
import MarkdownVerwer from '@/components/MarkdownVerwer/index.vue'

@Component({
  name: 'Note',
  components: {
    Dialog,
    MarkdownVerwer
  }
})

export default class extends Vue {
  title: string = ''
  isShow: boolean = false
  dataObj: any = {}
  tagList: ICv[] = [
    { code: 'css', value: 'css' },
    { code: 'js', value: 'javascript' },
    { code: 'arithmetic', value: '算法' },
    { code: 'ts', value: 'Typescript' },
    { code: 'node', value: 'node' },
    { code: 'vue', value: 'Vue' },
    { code: 'wx', value: '微信开发' },
    { code: 'others', value: '其他' }
  ]
  created() {
    this.title = (this.$route.meta as any).title || ''
  }
  private showDetail(code: string) {
    this.isShow = true
    if (!code) return
    this.dataObj = {}
    getList({ type: code })
      .then(data => {
        const resData = data.data[0]
        this.dataObj = resData || {}
      })
  }
}
</script>
<style lang="less" scoped>
.note_wrap {
  color: fff;
  font-size: .3rem;
  padding-bottom: .8rem;
  ul {
    text-align: center;
    li {
      background-color: #4992d3;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      margin-bottom: .2rem;
      padding: .24rem 0;
      cursor: pointer;
    }
  }
  &__title {
    color: #8c888b;
    background: -webkit-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
    color: transparent;
    /*设置字体颜色透明*/
    -webkit-background-clip: text;
    /*背景裁剪为文本形式*/
    animation: ran 10s linear infinite;
  }
}
h3 {
  text-align: center;
  font-size: .5rem;
  color: yellowgreen;
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }
  to {
    background-position: 2000px 0;
  }
}
</style>
