<template>
  <div class="page-container">
    <Slider class="banner pull_left"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Slider from '@/components/Slider/index.vue'
@Component({
  name: 'Home',
  components: {
    Slider
  }
})

export default class extends Vue {

}
</script>
<style lang="less" scoped>
.banner {
  width: 68%;
  height: 406px;
  background: yellow;
}
</style>
