/* ---------------------------------------------------------------------------------------
* about:观察者类。
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-07
* ---------------------------------------------------------------------------------------- */
import Dep from '../Dep'
import { arrayMethods } from './array'
import { GLOBAL_HAS_PROTO } from '../../utils/env'
import { isObject } from '../../utils/object'

const OBSERVE_KEY = '__ob__'

// 深度遍历，并用于遍历数据并挂载监听。
class Observer {
  constructor(value) {
    this.value = value

    if (isObject(value)) {
      value[OBSERVE_KEY] = this
    } else {
      return
    }

    // 如果是数组，用别的处理方式
    if (Array.isArray(value)) {
      const augment = GLOBAL_HAS_PROTO ? protoAugment : copyAugment
      augment(value, arrayMethods, Object.getOwnPropertyNames(arrayMethods))
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  // 把每个属性都变成 getter/setter，进行监听。此方法在类型为 Object 时才调用
  walk(obj) {
    const keys = Object.keys(obj)
    for (const key of keys) {
      defineReactive(obj, key, obj[key])
    }
  }

  // 对数组的监听
  observeArray(arr) {
    for (const item of arr) {
      observe(item)
    }
  }
}

/**
 * Augment a target Object or Array by intercepting
 */
function protoAugment(target, src) {
  target.__proto__ = src
}

/**
 * 没有 __proto__ 的，直接把方法挂载到目标上作为属性
 */
function copyAugment(target, src, keys) {
  for (const key of keys) {
    target[key] = src[key]
  }
}

/**
 * 创建 getter/setter
 * @param data 对象
 * @param key 属性值
 * @param val 初始值。定义 getter/setter 必须自定义一个变量用于保存值，否则 get() 找不到值返回
 * @returns {*}
 */
function defineReactive(data, key, val) {
  // 递归属性，进行观察
  observe(val)

  // 挂载
  const dep = new Dep() // 变化收集器
  Object.defineProperty(data, key, {
    configurable: true, enumerable: true, set(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      dep.notify() // 变化时候通知
    }, get() {
      dep.depend() // 收集变化
      return val
    }
  })
}

export function observe(target) {
  if (!isObject(target)) {
    return
  }

  let ob
  if (OBSERVE_KEY in target || target instanceof Observer) {
    ob = target[OBSERVE_KEY]
  } else {
    ob = new Observer(target)
  }
  return ob
}
