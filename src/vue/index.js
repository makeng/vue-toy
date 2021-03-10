/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */
import Observer from './Observer'

class Vue {
  constructor () {
    const data = this.data()
    new Observer(data)
    this.data = data
  }

  template () {
    const { data } = this
    let tmplStr = (`
        <div>
          <h3>{{name}}</h3>
          <p>{{day}}</p>
          <p>{{time.hour}} : {{time.min}}</p>
        </div>
    `)
    const replaceTmpl = (tmpl, value) => {
      tmplStr = tmplStr.replace(tmpl, value)
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

    return tmplStr
  }

  data () {
    return {
      name: 'vue-shrime',
      day: 'Monday',
      time: {
        hour: 12,
        min: 25,
      }
    }
  }

  /**
   * 安装在元素上
   * @param id
   */
  mount (id) {
    const ele = document.getElementById(id)
    ele.innerHTML = this.template()
  }
}

export default Vue
