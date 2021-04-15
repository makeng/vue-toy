/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */
import Observer from './Observer'
import Watcher from './Watcher'

class Vue {
  constructor ({ data, ...conf }) {
    const { template } = conf

    // 初始化
    this.ele = undefined
    this.data = data()
    Object.assign(this, conf)
    // 监听数据
    new Observer(this.data)
    // 监听属性
    new Watcher(this, 'data.classmate', (vm, value) => {
      this.render()
    })
    // 监听对象
    new Watcher(this, 'data.time', (vm, value) => {
      this.render()
    })
  }

  render () {
    let { data, template } = this
    // 模板替换
    const replaceTmpl = (tmpl, value) => {
      template = template.replace(tmpl, value)
    }
    // 模板字符换成数据
    for (let key in data) {
      const item = this.data[key]
      // 合成类型
      if (typeof item === 'object') {
        if (Array.isArray(item)) {
          item.forEach((sub,index)=>{
            for (let itemKey in sub) {
              replaceTmpl(`{{${key}[${index}].${itemKey}}}`, sub[itemKey])
            }
          })
        }
        // 对象
        else {
          for (let itemKey in item) {
            replaceTmpl(`{{${key}.${itemKey}}}`, item[itemKey])
          }
        }
      }
      // 常量
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
  mount (id) {
    this.ele = document.getElementById(id)
    this.render()
    this.mounted && this.mounted()
  }
}

export default Vue
