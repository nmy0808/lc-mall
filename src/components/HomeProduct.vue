<template>
  <div class="home-prod">
    <h2 container>手机</h2>
    <div class="prod-inner" container>
      <div class="prod-left">
        <img
          alt=""
          data-src="/imgs/mix-alpha.jpg"
          v-lazy="'/imgs/mix-alpha.jpg'"
          lazy="loaded"
        />
      </div>
      <div class="prod-right">
        <template v-for="item in data">
          <div class="prod-right__item new-tag" :key="item.id">
            <img v-lazy="item.mainImage" />
            <h3 class="title">{{ item.name }}</h3>
            <p class="sub-title">{{ item.subtitle }}</p>
            <p class="price">
              {{ item.price }}元
              <c-img-icon
                @click.native="handleAddCart(item.id)"
                src="/imgs/icon-cart-hover.png"
                width="22"
                height="22"
                cursor-pointer
              ></c-img-icon>
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  methods: {
    handleAddCart(id) {
      this.$eventBus.$emit("update:showModal", id);
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-prod {
  background: $colorJ;
  padding-bottom: 50px;
  & > h2 {
    height: 80px;
    line-height: 80px;
    font-size: 22px;
    font-weight: bold;
  }
}
.prod-inner {
  display: flex;
  height: 618px;
}
.prod-left {
  flex-shrink: 0;
  width: 224px;
  height: 100%;
  & > img {
    height: 100%;
  }
}
.prod-right {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding-left: 14px;
  box-sizing: border-box;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  &__item {
    position: relative;
    width: 236px;
    height: 302px;
    background: white;
    margin-bottom: 14px;
    & > img {
      padding-top: 24px;
      height: 230px;
      box-sizing: border-box;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      color: $colorI;
    }
    .sub-title {
      font-size: 12px;
      color: $colorD;
    }
    .price {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $colorA;
      font-size: 14px;
      font-weight: bold;
      padding-top: 5px;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    &.new-tag::after {
      content: "新品";
      color: white;
      font-size: 12px;
      width: 67px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background: #7bcb5c;
    }
  }
}
</style>