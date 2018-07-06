import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios // 这样设置就可以在组件内使用 this.$http 使用axios了
axios.defaults.baseURL = 'http://localhost:8081/'

// async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
// await 操作符用于等待一个 Promise 对象, 它只能在异步函数 async function 内部使用.
export const request = async (type = 'POST', url = '', data = {}) => {
  let result
  type = type.toUpperCase()
  if (type === 'GET') {
    await axios.get(url, {params: data})
      .then(res => {
        result = res.data
      })
  } else if (type === 'POST') {
    // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
    await axios.post(url, qs.stringify(data))
      .then(res => {
        result = res.data
      })
  }
  return result
}
