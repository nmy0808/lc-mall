<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.getUserInfo();
    this.getCartCount();
  },
  methods: {
    ...mapActions(["getCartCount", "getUserInfo"]),
  },
};
</script>