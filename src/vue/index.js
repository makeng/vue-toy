/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */
import { observe, OBSERVE_KEY } from './Observer'
import Watcher from './Watcher'
import { isObject } from '../utils/object'
import { parsePath } from '../utils/string'

class Vue {
  constructor({ data, ...conf }) {
    // 初始化
    this.ele = undefined
    this.data = data()
    // 监听当前对象的某个数据
    const watchProp = (target, propName, cb) => {

      if (typeof propName === 'string') {
        const getter = parsePath(propName) // 产生函数
        const value = getter(target)

        if (isObject(value)) {
          for (const key in value) {
            if (key !== OBSERVE_KEY) {
              watchProp(target, `${propName}.${key}`, cb)
            }
          }
        }
      }
      return new Watcher(target, propName, cb)
    }

    Object.assign(this, conf)
    // 监听数据
    observe(this.data)
    // 监听属性
    console.log('this.data', this.data)
    for (const key in this.data) {
      if (key !== OBSERVE_KEY) {
        const propName = `data.${key}`
        watchProp(this, propName, (vm, value) => {
          this.render() // 侦测到变化，就更新
        })
      }
    }
  }

  // 初始化生命周期
  mounted() {}

  render() {
    let { data, template } = this
    // 模板替换
    function replaceTmpl(tmpl, value) {
      template = template.replace(tmpl, value)
    }
    function replaceTmplForArray(item, key) {
      item.forEach((sub, index) => {
        for (let itemKey in sub) {
          replaceTmpl(`{{${key}[${index}].${itemKey}}}`, sub[itemKey])
        }
      })
    }
    function replaceTmplForObject(item, key) {
      for (let itemKey in item) {
        replaceTmpl(`{{${key}.${itemKey}}}`, item[itemKey])
      }
    }

    // 模板字符换成数据
    for (let key in data) {
      const item = this.data[key]
      // 合成类型
      if (typeof item === 'object') {
        if (Array.isArray(item)) {
          replaceTmplForArray(item, key)
        } else {
          replaceTmplForObject(item, key)
        }
      }
      // 基础类型
      else {
        replaceTmpl(`{{${key}}}`, item)
      }
    }

    this.ele.innerHTML = template
  }

  /**
   * 安装在元素上
   * @param id
   */
  mount(id) {
    this.ele = document.getElementById(id)
    this.render()
    this.mounted && this.mounted() // 手动生命周期
  }
}

export default Vue
