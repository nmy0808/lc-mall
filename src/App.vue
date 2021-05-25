<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.getUserInfo();
    this.getCartCount();
  },
  methods: {
    getUserInfo() {
      this.axios.get("/user").then((res) => {
        console.log(res);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>