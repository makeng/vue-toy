/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */
import Dep from './Dep'

function defineReactive (data, key, val) {
  const dep = new Dep() // 变化收集器
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    set (newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      dep.notify()
      console.log('set', val)
    },
    get () {
      console.log('get', val)
      dep.depend()
      return val
    }
  })
}

const vue = {
  defineReactive
}

export default vue
