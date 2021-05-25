<template>
  <!-- <img class="img-icon" :style="calcStyle" :src="src" /> -->
  <i :style="calcStyle"></i>
</template>

<script>
export default {
  name: "c-img-icon",
  props: {
    height: {
      type: [String, Number],
      default: 14,
    },
    width: {
      type: [String, Number],
      default: 14,
    },
    src: {
      type: String,
      default: "",
    },
  },
  computed: {
    calcStyle() {
      return {
        display: "inline-block",
        height: this.height + "px",
        width: this.width + "px",
        "background": `url(${this.src}) no-repeat center`,
        "background-size": "contain",
      };
    },
  },
};
</script>

<style>

</style>