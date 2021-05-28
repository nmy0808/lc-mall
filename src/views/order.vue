<template>
  <div class="order">
    <router-view></router-view>
    <NavFooter />
  </div>
</template>

<script>

import NavFooter from "@/components/NavFooter.vue";

export default {
  name: "order",
  components: { NavFooter },
 
};
</script>

<style>
</style>