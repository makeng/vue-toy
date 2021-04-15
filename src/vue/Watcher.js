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
    this.vm = vm
    this.cb = cb
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.deps = []
    this.newDeps = []
    // parse expression for getter
    this.getter = typeof expOrFn === 'function'
      ? expOrFn // for component
      : parsePath(expOrFn) // for $watcher
    this.value = this.get()
  }

  get () {
    Dep.target = this
    const value = this.getter.call(this.vm, this.vm) // 唤起 getter
    Dep.target = undefined

    this.cleanupDeps()
    return value
  }

  update () {
    const oldValue = this.value
    this.value = this.get()
    if (this.cb) {
      this.cb.call(this.vm, this.value, oldValue)
    }
  }

  addDep (dep) {
    const { id } = dep
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      // 备份
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
    const len = this.newDepIds.size
    console.log('Watcher newDepIds', len)
  }

  // 清空所有依赖
  cleanupDeps () {
    let i = this.deps.length
    // 如果新的依赖数组不再包含老 dep，则通知 Dep 去掉当前 Watcher
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    // 更新 depsId
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    // 更新 deps
    tmp = this.newDeps
    this.deps = tmp
    this.newDeps = this.deps
    this.newDeps.length = 0

    const len = this.depIds.size
    console.log('Watcher dpeIds', len)
  }
}

export default Watcher
