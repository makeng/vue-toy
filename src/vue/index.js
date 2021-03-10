/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */
import Observer from './Observer'

class Vue {
  constructor ({ data, ...conf }) {
    // 初始化
    this.data = data()
    Object.assign(this, conf)
    // 监听
    new Observer(this.data)
  }

  render () {
    let { data, template } = this
    // 模板替换
    const replaceTmpl = (tmpl, value) => {
      template = template.replace(tmpl, value)
    }

    // 模板字符换成数据
    for (let key in data) {
      const item = data[key]
      // 常量
      if (!(typeof item === 'object')) {
        replaceTmpl(`{{${key}}}`, item)
      } else {
        // 对象
        for (let itemKey in item) {
          replaceTmpl(`{{${key}.${itemKey}}}`, item[itemKey])
        }
      }
    }

    return template
  }

  /**
   * 安装在元素上
   * @param id
   */
  mount (id) {
    const ele = document.getElementById(id)
    ele.innerHTML = this.render()
    this.mounted && this.mounted()
  }
}

export default Vue
