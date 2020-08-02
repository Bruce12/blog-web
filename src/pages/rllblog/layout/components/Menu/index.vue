<template>
  <div class="header-component">
    <div class="header-wrap">
      <nav class="flex">
        <div class="header-component__logo">
          <a href="/">{{logoTitle}}</a>
        </div>
        <div class="header-component__menu-list">
          <ul>
            <li
              v-for="item in menuList"
              :key="item.code"
              :class="{selected: item.selected}"
              @click="menuClick(item)"
            >
              <a href="javascript:;">{{ item.value }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ITap } from '../../type'

@Component({
  name: 'Menu'
})

export default class extends Vue {
  private menuList: ITap[] = [
    { code: 'home', value: '首页', selected: true },
    { code: 'hot_article', value: '精选文章', selected: false },
    { code: 'pic_exhibition', value: '旅行图片', selected: false },
    { code: 'snake', value: '学习工厂', selected: false },
    { code: 'tag', value: '标签', selected: false },
    { code: 'time_line', value: '时间线', selected: false }
  ]
  private currentMenu: string = 'home'
  private logoTitle: string = 'XX的博客'
  created() {
    const currentRoute = this.$router.currentRoute
    if (currentRoute) {
      const resData = this.menuList.filter(item => item.code === currentRoute.name)
      if (resData.length) this.menuClick(resData[0])
    }
  }
  private menuClick(item: ITap) {
    if (item.code === this.currentMenu) return
    // this.menuList.forEach(item => item.selected = false)
    item.selected = true
    this.currentMenu = item.code
    const res = this.$router.resolve(`/${item.code}`)
    this.$router.push(res.location)
    document.title = this.logoTitle + '-' + res.route.meta.title
  }
}
</script>
<style lang="less" scoped>
.header-component {
  height: 60px;
  width: 100%;
  line-height: 60px;
  position: fixed;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 1px rgba(0,0,0,.04);
  z-index: 9999;
  &__logo {
    font-size: 22px;
    a {
      text-decoration: none;
      color: #444;
    }
  }
  &__menu-list {
    margin-left: 50px;
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
      li {
        display: inline-block;
        color: #000;
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
        margin-right: 5px;
        &:hover {
          background: #3690cf;
          color: #fff;
        }
      }
      .selected {
        background: #3690cf;
        color: #fff;
      }
    }
  }
}
.header-wrap {
  width: 1000px;
  margin: 0 auto;
}
</style>
