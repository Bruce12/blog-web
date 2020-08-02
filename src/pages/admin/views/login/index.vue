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
            <el-button :loading="loading" class="btn_submit" type="primary" @click="login()">登录</el-button>
          </footer>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { checkLogin } from '../../api/users'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { UserModule } from '../../store/modules/user'

@Component({
  name: 'Login',
  components: {
  }
})

export default class extends Vue {
  private redirect?: string
  private loading: boolean = false
  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      // this.otherQuery = this.getOtherQuery(query)
    }
  }
  private formModel: { userName: string, pwd: string } = {
    userName: 'lanjianhua',
    pwd: '123456'
  }
  private login() {
    this.loading = true
    checkLogin(this.formModel.userName, this.formModel.pwd)
      .then(res => {
        // 设置登录信息
        UserModule.setAuth({ token: res.access_token, refreshToken: res.refresh_token, tokenType: res.token_type })
        // 获取用户信息
        Message({
          type: 'success',
          message: '登录成功'
        })
        // 页面跳转
        this.$router.push({
          path: this.redirect || '/index'
          // query: this.otherQuery
        })
      })
      .catch(() => {
        Message({
          type: 'error',
          message: '账号或密码错误'
        })
      })
      .finally(() => {
        this.loading = false
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
