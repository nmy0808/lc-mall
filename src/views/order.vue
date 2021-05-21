<template>
  <div class="order">
    order
    <OrderHeader />
    <router-view></router-view>
    <NavFooter />
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import NavFooter from "@/components/NavFooter.vue";

export default {
  name: "order",
  components: { OrderHeader, NavFooter },
};
</script>

<style>
</style>