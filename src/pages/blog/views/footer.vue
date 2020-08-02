<template>
  <main>
    <a :href="url" target="_blank">去后台</a>
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'Footer'
})

export default class extends Vue {
  get url() {
    const origin = location.origin
    return origin + '/admin.html'
  }
}
</script>
<style lang="less" scoped>
main {
  position: absolute;
  bottom: -18px;
  right: 10px;
  a {
    color: #bac1c7;
  }
}
</style>
