var webpack = require('webpack');

//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {//注意这里是exports不是export
  entry: __dirname + '/main.js',//唯一入口文件
  output: {//输出目录
    path: __dirname + '/dist',//打包后的js文件存放的地方
    filename: 'app.js',//打包后输出的js的文件名
    publicPath: '/'
  },
  //webpack-dev-server配置
  devServer: {
    contentBase: __dirname + "/",
    historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    port: 8084, //设置默认监听端口，如果省略，默认为"8080"
    inline: true,//设置为true，当源文件改变时会自动刷新页面
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()//热模块替换插件
  ]
}
