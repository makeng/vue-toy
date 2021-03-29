/* ---------------------------------------------------------------------------------------
* about:观察者类
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-05
* ---------------------------------------------------------------------------------------- */
import { parsePath } from '../utils/string'
import Dep from './Dep'

class Watcher {
  /**
   * @param vm 渲染模板
   * @param expOrFn 监听的路径
   * @param cb
   */
  constructor (vm, expOrFn, cb) {
    console.log('create Watcher')
    this.vm = vm
    this.cb = cb
    this.deps = []
    this.depIds = []
    this.newDepIds = []
    this.getter = parsePath(expOrFn) // this.getter() 读取 data 的内容
    this.value = this.get()
  }

  get () {
    Dep.target = this
    const value = this.getter.call(this.vm, this.vm) // 唤起 getter
    console.log('watcher get', value)
    Dep.target = undefined

    this.cleanupDeps()
    return value
  }

  update () {
    console.log('Watcher update')
    const oldValue = this.value
    this.value = this.get()
    console.log('cb')
    if (this.cb) {
      this.cb.call(this.vm, this.value, oldValue)
    }
  }

  addDep (dep) {
    const { id } = dep
    if (!this.depIds.includes(id)) {
      this.deps.push(dep)
      this.depIds.push(id)
      dep.addSub(this)
    }
  }

  // 清空所有依赖
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      // dep.removeSub(this)
    }
  }
}

export default Watcher
