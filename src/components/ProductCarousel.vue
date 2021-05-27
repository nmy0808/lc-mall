<template>
  <div class="swiper-box">
    <swiper
      class="swiper-box__carousel"
      v-if="slideList"
      :options="swiperOption"
      ref="mySwiper"
      w-100
      h-100
    >
      <!-- slides -->
      <swiper-slide
        v-for="item in slideList"
        :key="item.id"
        class="swiper-box__item"
      >
        <img :data-src="item.url" class="swiper-lazy" />
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <!-- Optional controls -->
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    slideList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        loop: true, // 循环模式选项
        // 懒加载
        lazy: {
          loadPrevNext: true,
        },
        slidesPerView: 3,
        autoplay: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@include b(swiper-box) {
  position: relative;
  height: 451px;
  @include e(item) {
    @include dimensions(100%);
  }
  @include e(menu) {
    position: absolute;
    left: 0;
    top: 0;
    width: 265px;
    background: rgba($color: #000000, $alpha: 0.3);
    z-index: 10;

    @include e(item) {
      &:hover {
        @include b(menu-children) {
          display: block;
        }
        &:hover {
          background: $colorA;
        }
      }
    }
  }
  @include e(carousel) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
@include b(menu-children) {
  display: none;
  position: absolute;
  left: 265px;
  top: 0;
  width: 962px;
  height: 100%;
  background: white;
  color: red;
  padding: 0 50px;
  @include e(item) {
    height: 75px;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: $colorB;
    & > img {
      width: 42px;
      padding-right: 15px;
    }
  }
}
@include b(swiper-button-prev) {
  left: 270px;
}
</style>