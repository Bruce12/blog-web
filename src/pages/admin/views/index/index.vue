<template>
  <main class="">

    neir
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getList } from './api'

@Component({
  name: 'Index'
})

export default class extends Vue {
  created() {
    getList()
      .then(data => {
        console.log(data)
      })
      .catch(() => {
        this.$message({
          message: '请求失败',
          type: 'error'
        })
      })
  }
}
</script>
<style lang="less" scoped>
</style>
