<template>
  <div class="order-header" container>
    <c-box class="nav-header__body-logo">
      <router-link class="nav-header__body-logo__box" :to="{ name: 'home' }">
        <c-img-icon src="/imgs/mi-logo.png" width="55" height="55" />
        <c-img-icon src="/imgs/mi-home.png" width="55" height="55" />
      </router-link>
    </c-box>
    <h2 fz28 pr20>{{ title }}</h2>
    <div fz14 class="order-subtitle">{{ subTitle }}</div>
    <div>{{$store.state.userName}}</div>
  </div>
</template>

<script>
export default {
  name: "order-header",
  props: {
    title: String,
    subTitle: String,
  },
};
</script>

<style lang="scss" scoped>
@include b(order-header) {
  height: 117px;
  display: flex;
  align-items: center;
}
@include b(nav-header) {
  @include e(body-logo) {
    margin-right: 39px;
    @include dimensions(55px);
    background: $colorA;
    overflow: hidden;
    @include e(box) {
      display: flex;
      @include dimensions(110px, 100%);
      transition: all 0.3s;
      &:hover {
        transform: translateX(-55px);
      }
      a {
        flex-shrink: 0;
      }
    }
  }
}
.order-subtitle{
  margin-right: auto;
}
</style>