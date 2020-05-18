import Vue from 'vue';
import router from '@/router/router.js'
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css'; 
import App from './App.vue';
Vue.use(ElementUI);
Vue.config.productionTip = false;
// 导入字体图标
import './assets/fonts/iconfont.css';
// 导入全局样式
import './assets/css/global.css';


// 数据交互
import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
