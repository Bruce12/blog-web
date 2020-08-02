<template>
  <main>
    <h2>{{ title }}</h2>
    <ul>
      <li
        v-for="item in tagList"
        :key="item.code"
        @click="toBlog(item.code)"
      >
        {{ item.value }}
      </li>
    </ul>
    <Footer/>
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Footer from './footer.vue'
@Component({
  name: 'Index',
  components: {
    Footer
  }
})

export default class extends Vue {
  private title: string = 'Welcome to our blog'
  private tagList: ICv[] = [
    { code: 'rllblog', value: '两两的博客' },
    { code: 'ljhblog', value: '兰建华的博客' }
  ]
  private toBlog(code: string) {
    const origin = location.origin
    // 去相应的博客页面
    location.href = origin + '/' + code + '.html'
  }
}
</script>
<style lang="less" scoped>
main {
  text-align: center;
  padding: 32px;
  h2 {
    color: #8c888b;
    background: -webkit-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
    color: transparent;
    /*设置字体颜色透明*/
    -webkit-background-clip: text;
    /*背景裁剪为文本形式*/
    animation: ran 10s linear infinite;
    font-size: 30px;
    font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
  }
  ul {
    text-align: center;
    width: 30vw;
    display: inline-block;
    li {
      background-color: #4992d3;
      border-radius: 3px;
      margin-bottom:18px;
      padding: 18px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
    }
  }
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
