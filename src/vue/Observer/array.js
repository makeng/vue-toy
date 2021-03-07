/* ---------------------------------------------------------------------------------------
* about:数组的处理
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-07
* ---------------------------------------------------------------------------------------- */

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto) // 复制原型用于改造，避免直接改造原型

const methodsToPatch = [
  'shift',
  'unshift',
  'push',
  'pop',
  'splice',
  'reverse',
  'sort'
]

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method]
  Object.defineProperty(arrayMethods, method, {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function mutator (...args) {
      return original.apply(this, args)
    }
  })
})

export {
  arrayMethods
}
