/* ---------------------------------------------------------------------------------------
* about:本地 node 运行的启动文件
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-06
* ---------------------------------------------------------------------------------------- */

require('babel-register') ({
  presets: [ 'env' ]
})

module.exports = require('./core/index.js')
