/* ---------------------------------------------------------------------------------------
* about:总入口
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-06
* ---------------------------------------------------------------------------------------- */

import Vue from './vue'

let timer = 0
const vue = new Vue({
  template:
    `
      <div>
        <h1>{{name}}</h1>
        <h2>object update</h2>
        <p>time: {{time.min}} : {{time.sec}}</p>
        
        <h2>array update</h2>
        <p>classmateList[0]: {{classmateList[0].name}} {{classmateList[0].cnt}}</p>
        <p>classmateList[1]: {{classmateList[1].name}} {{classmateList[1].cnt}}</p>
      </div>
    `,
  data() {
    return {
      name: 'vue-toy',
      time: {
        sec: '00',
        min: '00',
      },
      classmateList: [
        { name: 'Kenny', cnt: 0 },
        { name: 'Eren', cnt: 1 },
      ]
    }
  },
  mounted() {
    this.timeUpdate()
  },
  /* ----------------------------------------- 自定义函数 ----------------------------------------- */
  timeUpdate() {
    const updateTime = () => {
      const date = new Date()
      const min = date.getMinutes()    // 获取当前小时数(0-23)
      const sec = date.getSeconds()      // 获取当前分钟数(0-59)

      this.data.time = { min, sec }
    }
    const updateClassmateList = () => {
      for (const item of this.data.classmateList) {
        item.cnt += 1
      }
    }

    clearInterval(timer)
    timer = setInterval(() => {
      updateTime()
      // updateClassmateList()
    }, 1000)
  }
})

vue.mount('app')
