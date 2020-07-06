<template>
  <div class="page-container">
    <el-form
      ref="formModel"
      inline
      label-width="60px"
      :model="formModel"
    >
      <el-form-item
        label="用户名"
        prop="userName"
      >
        <el-input v-model="formModel.userName" type="text"/>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pwd"
      >
        <el-input v-model="formModel.pwd" type="text"/>
      </el-form-item>
    </el-form>
    <div class="text_center">
      <el-button type="primary" @click="login()">登录</el-button>
      <el-button type="danger">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkLogin } from './api'
import { Message } from 'element-ui'
@Component({
  name: 'Login',
  components: {
  }
})

export default class extends Vue {
  private formModel: { userName: string, pwd: string } = {
    userName: '',
    pwd: ''
  }
  private login() {
    checkLogin({ userName: this.formModel.userName, pwd: this.formModel.pwd })
      .then(res => {
        if (res.status === 0) {
          Message({
            type: 'success',
            message: '登录成功'
          })
        }
      })
      .catch(() => {
        Message({
          type: 'error',
          message: '账号或密码错误'
        })
      })
  }
}
</script>
<style lang="less" scoped>
.page-container {
  margin: 20px auto;
  width: 300px;
}
</style>
