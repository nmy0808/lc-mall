import Vue from 'vue'
import router from './router'
import store from './store'
// import Storage from '@/storage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import env from './env'

import App from './App.vue'
axios.defaults.baseURL = '/api';
axios.defaults.baseURL = env;

axios.defaults.timeout = 7000;
axios.interceptors.response.use(response => {
  const res = response.data;
  if (res.status == 0) {
    return res.data;
  }
  else if (res.status == 10) {
    router.push({ name: 'login' });
  } else {
    alert(res.msg);
  }
})
Vue.use(VueAxios, axios);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
