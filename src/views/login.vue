<template>
  <div class="login">
    <input type="text" placeholder="用户名" v-model="username" />
    <input type="text" placeholder="密码" v-model="password" />
    <div btn-big @click="handleLogin">登录</div>
    <div btn-big @click="loginOut">退出登录</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(["login", "loginOut"]),
    handleLogin() {
      this.login({ username: this.username, password: this.password });
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 200px;
  height: 30px;
  border: 1px solid;
}
</style>