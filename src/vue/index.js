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
          <p>{{time}}</p>
        </div>
    `)
    // 模板字符换成数据
    const keys = Object.getOwnPropertyNames(data)
    keys.forEach(key => {
      tmplStr = tmplStr.replace(`{{${key}}}`, data[key])
    })

    return tmplStr
  }

  data () {
    return {
      name: 'vue-shrime',
      time: 0
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

const vue = new Vue()
vue.mount('app')
console.log(vue)

export default vue
