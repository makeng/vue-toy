/* ---------------------------------------------------------------------------------------
* about:依赖收集类
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-05
* ---------------------------------------------------------------------------------------- */
/**
 * 删除数组中的某项
 * @param arr
 * @param item
 */
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  // 依赖收集
  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    const subs = this.subs.slice() // copy
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

export default Dep
