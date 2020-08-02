<template>
  <div class="app-component">
    <AppMain/>
    <Bar/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Bar, AppMain } from './components/index'
@Component({
  name: 'Layout',
  components: {
    Bar,
    AppMain
  }
})

export default class extends Vue {

}
</script>
<style lang="less" scoped>
.app-component {
  overflow: hidden;
  background-color: #296ca8;
  color: #fff;
}

</style>
