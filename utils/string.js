/* ---------------------------------------------------------------------------------------
* about:字符类工具集
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-05
* ---------------------------------------------------------------------------------------- */

/**
 * 返回一个路径解析函数。
 * @param path
 * @returns {function(*=): *}
 */
function parsePath (path) {
  const bailRE = /^\w\.$/
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    console.log(obj)
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}

export {
  parsePath
}
