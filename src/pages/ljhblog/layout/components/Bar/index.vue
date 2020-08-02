<template>
  <div class="app-component">
    <ul class="flex bar-wrap text_center">
      <li
        v-for="item in tags"
        :key="item.code"
        class="flex1"
      >
        {{item.value}}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'Bar'
})

export default class extends Vue {
  private tags: ICv[] = [
    { value: '首页', code: 'home', selected: true },
    { value: '笔记', code: 'note' },
    { value: '搜索', code: 'search' },
    { value: '关于', code: 'about' }
  ]
}
</script>
<style lang="less" scoped>
.bar-wrap {
  font-size: .25rem;
  position: fixed;
  bottom: .2rem;
  border-radius: .3rem;
  cursor: pointer;
  width: 50%;
  overflow: hidden;
  transform: translateX(-50%);
  left: 50%;
  > li {
    background: #ddd;
    padding: .2rem;
    color: #fff;
  }
}
</style>
