<template>
  <div class="app-component">
    <Menu/>
    <app-main/>
    <Footer/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppMain, Footer, Menu
} from './components/index'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    Footer,
    Menu
  }
})

export default class extends Vue {

}
</script>
<style lang="less" scoped>
  .app-component {
    overflow: hidden;
  }
</style>
