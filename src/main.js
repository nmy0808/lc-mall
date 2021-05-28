import Vue from 'vue'
import router from './router'
import store from './store'
// import Storage from '@/storage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie'
// import '@/mock'
import '../src/style/index.scss'
import '@/components/index.js'
import '@/eventBus';
import App from './App.vue'
axios.defaults.baseURL = '/api';

axios.defaults.timeout = 7000;
axios.interceptors.response.use(response => {
  const res = response.data;
  const path = location.pathname;
  if (res.status == 0) {
    return res.data;
  }
  else if (res.status == 10) {
    if (path !== '/index') {
      router.push({ name: 'login' }).catch(() => { });
    }
  } else {
    this.$message.error(res.msg);
    return Promise.reject(res.msg);
  }
}, error => {
  let res = error.response;
  Vue.prototype.$message.error(res.data.message);
  return Promise.reject(error);
})
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
