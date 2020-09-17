import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from "axios";
import VueAxios from "vue-axios";
import VueLazyload from "vue-lazyload";
import VueCookie from "vue-cookie";

// axios.defaults.baseURL = 'http://mall-pre.springboot.cn'
axios.defaults.baseURL = '/api'
axios.interceptors.response.use(response => {
  let res = response.data;
  let path = location.hash;
  console.log(res.status)
  if (res.status === 0) {
    return res;
  } else if (res.status == 10) {
    if (path != '#/index') {
      window.location.href = '/#/login'
    }
  } else {
    return Promise.reject(res)
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')