<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
  }
})
export default class extends Vue {}
</script>
<style lang="less">
body {
  margin: 0px;
}
ul {
  list-style: none;
  padding: 0px;
}
#app {
  overflow: hidden;
  background-color: #296ca8;
  color: #fff;
   min-height: 100vh; //calc(100vh - 50px);
  position: relative;
  width: 100vw;
  margin: 0 auto;
}
</style>
