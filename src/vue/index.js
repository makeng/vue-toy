/* ---------------------------------------------------------------------------------------
* about:渲染层
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-04
* ---------------------------------------------------------------------------------------- */


/**
 * 安装在元素上
 * @param id
 */
function mount (id) {
  const ele = document.getElementById(id)
  ele.innerHTML = '<h1>vue-toy</h1>'
}

const vue = {
  mount
}

export default vue
