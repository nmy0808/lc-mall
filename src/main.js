import Vue from 'vue'
import router from './router'
import store from './store'
// import Storage from '@/storage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import '@/mock'
import '../src/style/index.scss'
import '@/components/index.js'
import App from './App.vue'
// axios.defaults.baseURL = '/api';

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
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});
axios.get('/aaa').then(res => console.log(res))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
