<template>
  <div class="component-wrap"
       :class="{'button_group': group}"
  >
    <template v-for="(item, index) in dataList">
      <el-button
        v-if="!item.hide"
        :key="index"
        :size="size"
        class="component-wrap__btn"
        :style="itemClass"
        :type="item.selected ? 'danger': ''"
        :disabled="item.disabled"
        @click="clickItem(item, index)"
      >
        <i
          v-if="cleanable"
          class="el-icon-error component-wrap__del"
          @click.stop="del(index)"
        />
        <template v-if="label">
          {{ item[label] }}
        </template>
        <template v-else>
          <slot :data="item"/>
        </template>
      </el-button>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'TapSwitch'
})

/**
 *  ckeckebox radio 单选多选
 *  数据格式列：[{label: '选项1', value: 'code1'}]
 */
export default class extends Vue {
  // { name: 'item1', code: 'code1', selected: true, disabeld: true }
  @Prop({ default: [] }) private list!: Array<any>
  @Prop({ default: 'radio' }) private type!: string
  @Prop() private tabClick!: Function
  @Prop({ default: false, type: Boolean }) private keep!: boolean
  @Prop({ default: '' }) private label!: string
  @Prop({ default: 'value' }) private value!: string
  @Prop({ default: false, type: Boolean }) private cleanable!: boolean
  @Prop({ default: 'mini' }) private size!: string
  @Prop({ default: '' }) private itemClass!: string
  @Prop({ default: false, type: Boolean }) private group!: boolean
  // 选中值
  private selectedData!: any
  private dataList: Array<any> = []
  created() {
    this.initPage()
  }
  private initPage() {
    this.dataList = this.list.map((item: any) => {
      if (!item.selected) item.selected = false
      if (!item.disabled) item.disabled = false
      let newItem = Object.assign({}, item)
      return newItem
    })
  }
  @Watch('list', { deep: true })
  private onListChang(value: any[]) {
    this.initPage()
  }
  private clickItem(item: any, index: number) {
    // 处理 checkbox radio 情况， keep： 再次点击取消
    this.dataList.forEach((o:any, inx: number) => {
      if (this.type === 'radio') {
        if (inx === index) {
          o.selected = this.keep ? true : !o.selected
        } else {
          o.selected = false
        }
      } else if (this.type === 'checkbox') {
        if (inx === index) {
          o.selected = this.keep ? true : !o.selected
        }
      }
    })
    this.$set(this.dataList, index, item)
    this.setSelectedItem(item, index)
    this.$emit('update:list', this.dataList)
    if (typeof this.tabClick === 'function') {
      // 返回选中的值，和当前的Item
      this.tabClick(this.selectedData)
    }
  }
  private setSelectedItem(item: any, inx: number) {
    let newItem: any = item
    if (this.type === 'radio') {
      item.selected ? this.selectedData = newItem : this.selectedData = {}
    } else if (this.type === 'checkbox') {
      if (!this.selectedData) {
        this.selectedData = [newItem]
        return
      }
      let list = (this.selectedData as Array<any>)
      let isExist = list.some((o: any) => o[this.value] === item[this.value])
      if (isExist) {
        if (!item.selected) list.splice(inx, 1)
      } else {
        if (item.selected) list.push(newItem)
      }
    }
  }
  private del(index: number) {
    let item = this.dataList.splice(index, 1)
    this.$emit('clear', { index, item: item[0] })
  }
}
</script>
<style lang="less" scoped>
.component-wrap {
  display: inline-block;
  /deep/ .el-button + .el-button {
    margin-left: 5px;
  }
  &__btn {
    position: relative;
    &:hover .component-wrap__del {
      display: block;
    }
  }
  &__del {
    position: absolute;
    right: -1px;
    top: -1px;
    display: none;
  }
}
.button_group {
  /deep/ .el-button--danger:first-child {
    border-right-color: rgba(255, 255, 255, 0.5);
  }
  /deep/ .el-button:not(:last-child) {
    margin-right: -1px;
  }
  /deep/ .el-button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  /deep/ .el-button {
    margin-left: 0px !important;
  }
  /deep/ .el-button:not(:first-child):not(:last-child) {
    border-radius: 0 !important;
  }
  /deep/ .el-button--primary:not(:first-child):not(:last-child) {
    border-left-color:hsla(0,0%,100%,.5);
    border-right-color:hsla(0,0%,100%,.5);
  }
  /deep/ .el-button--primary:last-child {
    border-left-color:hsla(0,0%,100%,.5);
  }
  /deep/ .el-button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
