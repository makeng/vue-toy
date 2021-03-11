/* ---------------------------------------------------------------------------------------
* about:观察者类
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-05
* ---------------------------------------------------------------------------------------- */
import { parsePath } from '../utils/string'

class Watcher {
  /**
   * @param vm 渲染模板
   * @param expOrFn 监听的路径
   * @param cb
   */
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb
    this.getter = parsePath(expOrFn) // this.getter() 读取 data 的内容
    this.value = this.get()
  }

  get () {
    window.target = this
    const value = this.getter.call(this.vm, this.vm) // 唤起 getter
    window.target = undefined
    return value
  }

  update () {
    const oldValue = this.value
    this.value = this.get()
    if (this.cb) {
      this.cb.call(this.vm, this.value, oldValue)
    }
  }
}

export default Watcher
