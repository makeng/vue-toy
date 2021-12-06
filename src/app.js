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
        <p>classmate0: {{classmate[0].name}} {{classmate[0].cnt}}</p>
        <p>classmate1: {{classmate[1].name}} {{classmate[1].cnt}}</p>
        <p>time: {{time.min}} : {{time.sec}}</p>
        <p>list: [{{list[0].value}}, {{list[1].value}}]</p>
      </div>
    `,
  data() {
    return {
      name: 'vue-shrime',
      classmate: [
        { name: 'Kenny', cnt: 0 },
        { name: 'Eren', cnt: 1 },
      ],
      time: {
        sec: '00',
        min: '00',
      },
      list: [
        { key: 0, value: 0 },
        { key: 1, value: 0 },
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
    const updateClassmate = () => {
      this.data.classmate[0].cnt += 1
      this.data.classmate[1].cnt += 1
    }
    const updateList = () => {
      for (const item of this.data.list) {
        item.value += 1
      }
    }

    setInterval(() => {
      updateTime()
      updateClassmate()
      updateList()
    }, 1000)
  }
})

vue.mount('app')
