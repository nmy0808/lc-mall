<template>
  <div container class="home-banner">
    <router-link to="#">
      <img v-lazy="src" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ads",
  props: {
    src: String,
  },
};
</script>

<style lang="scss" scoped>
.home-banner {
  padding: 10px 0;
  height: 130px;
  img{
    height: 100%;
  }
}
</style>