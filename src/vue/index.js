/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */
import Observer from './Observer'
import Watcher from './Watcher'

class Vue {
  constructor({ data, ...conf }) {
    // 初始化
    this.ele = undefined
    this.data = data()
    // 监听当前对象的某个数据
    const watchThisProp = (propName) => {
      return new Watcher(this, propName, (vm, value) => {
        this.render()
      })
    }

    Object.assign(this, conf)
    // 监听数据
    new Observer(this.data)
    // 监听属性
    watchThisProp('data.classmate')
    watchThisProp('data.time')
    watchThisProp('data.list')
  }

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
    this.mounted && this.mounted()
  }
}

export default Vue
