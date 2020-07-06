<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  created() {

  }
}

</script>
<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 10px;
  background: #fff;
}
</style>
