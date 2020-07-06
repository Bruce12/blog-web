<template>
  <div ref="fullScreen" class="full_screen">
    <slot/>
    <i class="iconfont icon-full-screen" @click="fullScreen()"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'FullScreen'
})
/**
 * 浏览器全屏
 */
export default class extends Vue {
  private fullScreen() {
    this.$nextTick(() => {
      (this.$refs.fullScreen as HTMLDivElement).requestFullscreen()
    })
  }
}
</script>
<style lang="less" scoped>
.full_screen {
  position: relative;
}
.full_screen:fullscreen {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.icon-full-screen {
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
