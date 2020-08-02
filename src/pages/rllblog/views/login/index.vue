<template>
  <div class="page-container">
    <main>
      <div class="page-container__title">博客后台登录</div>
      <el-form
        ref="formModel"
        label-width="60px"
        :model="formModel"
        label-position="center"
        class="page-container__form"
      >
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input v-model="formModel.userName" placeholder="user name" type="text"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd"
        >
          <el-input v-model="formModel.pwd" placeholder="password" type="text"/>
        </el-form-item>
        <el-form-item>
          <footer class="text_center">
            <el-button class="btn_submit" type="primary" @click="login()">登录</el-button>
          </footer>
        </el-form-item>
      </el-form>
    </main>
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
    userName: 'lanjianhua',
    pwd: '123456'
  }
  private login() {
    checkLogin({ username: this.formModel.userName, password: this.formModel.pwd })
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
  background-color: #4992d3;
  width: 100vw;
  height:100vh;
  padding: 2px;
  position: relative;
  main {
    background-color: #296ca8;
    padding: 0px 20px;
    padding-top: 20px;
    width: 400px;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 20vh;
    transform: translateX(-50%);
  }
  &__title {
    text-align: center;
    color: #8c888b;
    font-size: 24px;
    font-weight: bold;
    background: -webkit-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
    color: transparent;
    /*设置字体颜色透明*/
    -webkit-background-clip: text;
    /*背景裁剪为文本形式*/
    animation: ran 10s linear infinite;
  }
  &__form {
    margin-top: 10px;
  }
}
.btn_submit {
  width: 250px;
}
/deep/ .el-form-item__label {
  color:#a9d3ff;
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }
  to {
    background-position: 2000px 0;
  }
}
</style>
