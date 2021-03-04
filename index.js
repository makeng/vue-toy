/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */

function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    set(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      console.log('set', val)
    },
    get() {
      console.log('get', val)
      return val
    }
  })
}

const vue = {}
defineReactive(vue, 'watcher', 'old')
vue.watcher // get
vue.watcher = 'change'
