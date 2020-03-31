import axios from 'axios'
import Vue from 'vue'
import router from '../router'
let path

if (process.env.NODE_ENV === 'dev') {
  path = 'http://dev-api-xueguan.limiketang.com/'
} else if (process.env.NODE_ENV === 'qa') {
  path = 'http://qa2-api-xueguan.limiketang.com/'
} else if (process.env.NODE_ENV === 'prod') {
  path = 'http://qa2-api-xueguan.limiketang.com/'
}

// 创建一个axios的实例
const instance = axios.create({
  baseURL: path,
  timeout: 1000
})

// request拦截器 ===> 对请求参数进行处理
instance.interceptors.request.use(
  config => {
    // const token = Vue.cookie.get('登录是存的') // 注意使用的时候需要引入cookie方法，推荐js-cookie
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      // 'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Authorization': token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器 ===> 对相应处理
instance.interceptors.response.use(
  response => {
    if (response.data.code === 401 || response.data.code === '401') {
      router.push({
        path: '/login',
        querry: {
          redirect: router.currentRoute.fullPath
        } // 从哪个页面跳转
      })
      // return;
      // location.reload(); // 重新初始化vue-router实例
    }
    return response
  },
  error => {
    if (error.message.includes('timeout')) {
      console.log('错误回调', error)
      // MessageBox.alert('网络超时，请稍后重试！');
      // return Promise.reject(error);
      this.$toast('网络超时，请稍后重试！')
    }
    // return Promise.reject(error);
    console.log('错误回调', error)
  }
)
const httprequest = {
  /**
   * 封装get方法
   * @param {String} url
   * @param {Object} params
   * @param {Number} myTime
   * @returns {Promise}
   */
  get (url, params = {}, myTime = 10000) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params,
        timeout: myTime
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      }).catch({

      })
    })
  },

  /**
   * 封装post请求
   * @param {String} url
   * @param {Object} params
   * @returns {Promise}
   */

  post (url, params = {}, timeout = 10000) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        timeout
      }).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      }).catch({

      })
    })
  },
  postFile (url, params = {}, timeout = 10000) {
    console.log(params)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout
    }
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      }).catch({

      })
    })
  },
  exportAudio (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, {
        ...params
      }, {
        responseType: 'blob'
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  export (url, params = {}, myTime = 10000) {
    // const loadingInstance = Loading.service({
    //   text: '下载中.....',
    //   fullscreen: true,
    //   background: 'rgba(0,0,0,0.4)'
    // })

    return new Promise((resolve, reject) => {
      axios.post(url, {
        ...params
      }, {
        timeout: myTime,
        responseType: 'blob'
      })
        .then(res => {
          console.log(res)
          let data
          if (params.is_down === 1) {
            data = { type: 'text/csv,charset=utf-8' } // 格式
          } else {
            data = { type: 'application/vnd.ms-excel,charset=utf-8' } // excel格式
          }
          const blob = new Blob([res.data], data)
          console.log(blob)
          const reader = new FileReader()
          reader.onload = e => {
            try {
              const result = JSON.parse(e.target.result)
              console.log(result)
              if (result.code && result.code !== 200) {
                resolve({
                  code: result.code,
                  msg: result.msg
                })
              }
            } catch (err) {
              console.log(err)
              const objectUrl = URL.createObjectURL(blob) // 生成一个url
              console.log(objectUrl)
              const a = document.createElement('a')
              let filename = res.headers['content-disposition'].split(';')[1].split('filename=')[1]
              filename = decodeURIComponent(filename).replace(/"/g, '')
              a.download = String(filename)
              a.href = objectUrl
              a.click()
              window.URL.revokeObjectURL(a.href)
              resolve({
                code: 200
              })
            }
          }
          reader.readAsText(blob)
          setTimeout(() => {
            // loadingInstance.close()
          })
        })
        .catch(err => {
          reject(err)
          setTimeout(() => {
            // loadingInstance.close()
          })
        })
    })
  },

  /**
   * 封装patch请求
   * @param url
   * @param data
   * @returns {Promise}
   */

  patch (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      }).catch({

      })
    })
  },

  /**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */

  put (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      }).catch({

      })
    })
  }
}
export default {
  install () {
    Vue.prototype.$http = httprequest
    Vue.$http = httprequest
  },
  $http: httprequest
}

export const $http = httprequest
