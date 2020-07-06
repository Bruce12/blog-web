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
    { value: '真题', code: 'subject' },
    { value: '搜索', code: 'search' },
    { value: '我的', code: 'mine' }
  ]
}
</script>
<style lang="less" scoped>
.bar-wrap {
  font-size: .4rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  cursor: pointer;
  > li {
    background: #ddd;
    padding: .2rem;
    color: #fff;
  }
}
</style>
