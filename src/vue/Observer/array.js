/* ---------------------------------------------------------------------------------------
* about:数组的处理
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-07
* ---------------------------------------------------------------------------------------- */
import { def } from '../../utils/lang'

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto) // 避免直接改造原型，但是同时能还能用原型的方法

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
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, ...args)
    const ob = this.__ob__
    ob.dep.notify()
    return result
  })
})

export {
  arrayMethods
}
