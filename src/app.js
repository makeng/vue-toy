/* ---------------------------------------------------------------------------------------
* about:总入口
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-06
* ---------------------------------------------------------------------------------------- */

import Vue from './vue'

const vue = new Vue({
  template:
    `
      <div>
        <h3>{{name}}</h3>
        <p>{{day}}</p>
        <p>{{time.hour}} : {{time.min}}</p>
      </div>
    `,
  data () {
    return {
      name: 'vue-shrime',
      day: 'Monday',
      time: {
        hour: '00',
        min: '00',
      }
    }
  },
  mounted () {
    this.timeUpdate()
  },
  /* ----------------------------------------- 自定义函数 ----------------------------------------- */
  timeUpdate () {
    const getTime = () => {
      const date = new Date()
      const hour = date.getHours()    // 获取当前小时数(0-23)
      const min = date.getMinutes()   // 获取当前分钟数(0-59)
      this.data.time.hour = hour
      this.data.time.min = min
      console.log('time update')
    }
    setInterval(() => getTime(), 1000)
  }
})

vue.mount('app')
