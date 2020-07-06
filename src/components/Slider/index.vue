<template>
  <div class="slider-component">
    图片轮播
  </div>
</template>
<script lang="ts">
// 图片轮播滑动
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'VueSlider'
})

export default class extends Vue {

}
</script>
<style lang="less" scoped>
.slider-component {
  width: 100%;
  height: 100%;
}
</style>
