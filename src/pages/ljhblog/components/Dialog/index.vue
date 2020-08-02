<template>
  <div>
    <div v-show="innerVisible"
         class="dialog_wrap animated bounceIn">
      <div class="dialog_close" @click="close">关闭</div>
      <div class="dialog_body">
        <slot/>
      </div>
    </div>
    <div v-if="innerVisible" class="overlay"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { eventOn, eventOff } from '@/utils/dom'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  @Prop({ default: false }) private visible!: boolean
  @Prop({ default: '' }) private title!: string
  @Prop({ default: '关闭' }) private closeBtnValue!:string
  @Prop({ default: '确定' }) private confirmBtnValue!: string
  private innerVisible: boolean = this.visible
  created() {
    // eventOn(document, 'click', this.handleClick)
  }
  beforeDestroy() {
    // eventOff(document, 'click', this.handleClick)
  }
  @Watch('visible')
  private onVisibleChange(value: boolean) {
    this.innerVisible = value
    if (value) {
      document.body.style.overflow = 'hidden'
      document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    }
  }
  private comfirm() {
    this.$emit('comfirm', this.close)
  }
  /**
   * 关闭
   */
  private close() {
    this.$emit('update:visible', false)
  }
  private handleClick() {
    this.close()
  }
}
</script>
<style lang="less" scoped>
.dialog_wrap {
  position: absolute;
  z-index: 2003;
  background: #fff;
  font-size: 0;
  border-radius: 10px;
  border-radius: 10px;
  width: 7rem;
  top: 3vh;
  height: 80vh;
  left: 50%;
  margin-left: -3.5rem;
  overflow-y: scroll;
}
.dialog_header {
  padding: 0 .32rem;
  line-height: .8rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  &__title {
    font-size: .32rem;
    color: #333333;
    font-weight: 700;
  }
}
.dialog_body {
  font-size: .28rem;
  padding: .18rem .28rem;
  min-height: 5.88rem;
  max-height: 9rem;
  padding-bottom: .8rem;
  color: #000;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2002;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
}
.mt_24 {
  margin-bottom: .24rem;
}
.bounceIn {
  animation-name: bounceIn;
}
.animated {
  animation-duration: .5s;
  animation-fill-mode: both;
  transform-origin: center;
}
.dialog_close {
  font-size: .3rem;
  position: absolute;
  right: .2rem;
  top: 10px;
  color: #21d863;
  cursor: pointer;
}
@keyframes bounceIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
