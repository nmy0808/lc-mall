<template>
  <div class="nav-footer">
    <c-img-icon width="53" height="36" src="/imgs/logo-footer.png" />
    <p mb10 mt10>小米商城</p>
    <p>xxxx | xxxx | xxxx | xxxx | xxxx</p>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
};
</script>
<style lang="scss" scoped>
.nav-footer {
  font-size: 14px;
  color: $colorD;
  text-align: center;
  border-top: 4px solid $colorA;
  background: $colorB;
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>