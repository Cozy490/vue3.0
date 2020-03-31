import Vue from 'vue'
import httpRequest from './http'
Vue.use(httpRequest)
let path
/* eslint-disable */
if (LIMI_ENV === 'dev') {
  path = 'http://dev-api-xueguan.limiketang.com';
}
if (LIMI_ENV === 'qa') {
  path = 'http://qa-api-xueguan.limiketang.com';
}
if (LIMI_ENV === 'qa2') {
  path = 'http://qa2-api-xueguan.limiketang.com';
}
if (LIMI_ENV === 'release') {
  path = 'http://release-api-xueguan.limiketang.com';
}



// 获取 JSSDK 配置信息
const api = {

  login: (param) => {
    // 登陆接口
    return Vue.$http.post(path + '/api/privilege/auth/teacherLogin', param);
  },
};

export default {
  install() {
    Vue.prototype.$api = api;
    Vue.$api = api;
  },
  $api: api,
};
