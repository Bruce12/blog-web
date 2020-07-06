/** 自定义生命周期函数 */
import Vue from 'vue'
const notifyVisibilityChange = (lifeCycleName: string, vm: Vue) => {
  const lifeCycles = (vm.$options as any)[lifeCycleName]
  console.log('lifeCycles', vm)
  // 生命周期函数存在 $options 中
  if (lifeCycles && lifeCycles.length) {
    lifeCycles.forEach((lifecycle: any) => {
      lifecycle.call(vm)
    })
  }
  // 遍历所有的子组件，然后依次递归执行
  if (vm.$children && vm.$children.length) {
    vm.$children.forEach(child => {
      notifyVisibilityChange(lifeCycleName, child)
    })
  }
}
/**
 * 添加生命周期钩子函数
 */
export function init() {
  const optionMergeStrategies = Vue.config.optionMergeStrategies
  optionMergeStrategies.pageVisible = optionMergeStrategies.beforeCreate
  optionMergeStrategies.pageHidden = optionMergeStrategies.created
  console.log('optionMergeStrategies', Vue.config.optionMergeStrategies)
}
/**
 * 将事件绑定到根节点上
 */
export function bind(rootVm: any) {
  addEventListener('visibilitychange', () => {
    // 判断调用哪个生命周期函数
    let lifeCycleName: any = ''
    if (document.visibilityState === 'hidden') {
      lifeCycleName = 'pageHidden'
    } else if (document.visibilityState === 'visible') {
      lifeCycleName = 'pageVisible'
    }
    if (lifeCycleName) {
      // 通知所有组件生命周期发生变化了
      notifyVisibilityChange(lifeCycleName, rootVm)
    }
  })
}
