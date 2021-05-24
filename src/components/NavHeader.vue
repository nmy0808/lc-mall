<template>
  <div class="nav-header" bg-b>
    <c-row
      class="nav-header__topbar"
      container
      fz12
      align="middle"
      type="flex"
      justify="start"
      h-100
    >
      <div class="nav-header__topbar-left" h-100 display-flex align-center>
        <router-link to="">小米商城</router-link>
        <router-link to="">MUI</router-link>
        <router-link to="">云服务</router-link>
        <router-link to="">协议规则</router-link>
      </div>
      <div class="nav-header__topbar-right" h-100 display-flex align-center>
        <router-link to="">admin</router-link>
        <router-link to="">登录</router-link>
        <router-link to="">我的订单</router-link>
        <router-link to="">
          <div btn-normal class="nav-header__icon" h-100>
            <c-img-icon src="/imgs/icon-cart-checked.png" mr5></c-img-icon>
            购物车(3)
          </div>
        </router-link>
      </div>
    </c-row>
  </div>
</template>

<script>
export default {
  name: "nav-header",
  mounted() {},
};
</script>

<style lang="scss" scoped>
@include b(nav-header) {
  height: 39px;
  @include e(topbar) {
    a {
      line-height: 39px;
      margin-right: 17px;
      color: $colorD;
      display: inline-block;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  @include e(topbar-left) {
    margin-right: auto;
  }
  @include e(topbar-right) {
  }
}
</style>