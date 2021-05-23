<script>
export default {
  name: "c-container",
  render: (h) => {
    return h("div", { class: ["container"] }, this.$slot.default);
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1260px;
  margin: 0 auto;
}
</style>