<template>
  <div class="login">
    <input type="text" placeholder="用户名" v-model="username" />
    <input type="text" placeholder="密码" v-model="password" />
    <div btn-big @click="handleLogin">登录</div>
    <div btn-big @click="handleLoginOut">退出登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    handleLogin() {
      const { username, password } = this;
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          this.$cookie.set("userId", res.id, { expires: "1D" });
          this.$router.push({ name: "home" });
        });
    },
    handleLoginOut() {
      this.$cookie.delete("userId");
      this.axios.post("/user/logout");
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