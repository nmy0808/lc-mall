import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { getCartCount, getUserInfo } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: null,
    cartCount: 0,
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    },
    setCartCount(state, cartCount) {
      state.cartCount = cartCount;
    }
  },
  actions: {
    setUserName(context, userName) {
      context.commit('setUserName', userName);
    },
    setCartCount(context, cartCount) {
      context.commit('setCartCount', cartCount);
    },
    login(context, { username, password }) {
      if (username.trim() !== "" && password.trim() !== "")
        Vue.prototype.axios
          .post("/user/login", {
            username,
            password,
          })
          .then((res) => {
            Vue.prototype.$cookie.set("userId", res.id, { expires: "1D" });
            context.dispatch('setUserName', res.username);
            context.dispatch('getCartCount');
            router.push({ name: "home" });
          });
    },
    loginOut(context) {
      Vue.prototype.$cookie.delete("userId");
      Vue.prototype.axios.post("/user/logout").then(() => {
        context.dispatch('setUserName', null);
        context.dispatch('setCartCount', null);
        // router.push({ name: 'login' });
      });
    },
    getCartCount(context) {
      console.log(123);
      getCartCount().then((res) => {
        context.dispatch('setCartCount', res);
      });
    },
    getUserInfo(context) {
      getUserInfo().then((res) => {
        res !== undefined && context.dispatch('setUserName', res.username);
      });
    },
  },
  modules: {
  }
})
