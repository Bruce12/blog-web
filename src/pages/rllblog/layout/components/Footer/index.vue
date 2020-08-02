<template>
  <div class="footer_wrap">
    Design by <a href="" target="_blank">建华个人博客</a>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'Footer'
})

export default class extends Vue {
  
}
</script>
<style lang="less" scoped>
.footer_wrap {
  text-align: center;
  padding: 20px;
  color: #a5a4a4;
  clear: both;
  text-shadow: #fff 1px 0 2px, #fff 0 1px 2px, #fff -1px 0 2px, #fff 0 -1px 2px;
}
a:hover {
  text-decoration: none;
  color: #000;
}
</style>