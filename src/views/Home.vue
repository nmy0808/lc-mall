<template>
  <div class="home">
    home
    <NavHeader />
    <router-view></router-view>
    <NavFooter />
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";

export default {
  name: "home",
  components: { NavHeader, NavFooter },
};
</script>

<style>
</style>