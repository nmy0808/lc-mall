<template>
  <div class="swiper-box" container>
    <div class="swiper-box__menu" pv26 border-box>
      <template
        v-for="(item, i) in [
          '手机 电话卡',
          '电视 盒子',
          '笔记本 平板',
          '家电 插线板',
          '出行 穿戴',
          '智能 路由器',
          '电源 配件',
          '生活 箱包',
        ]"
      >
        <c-box
          w-100
          height="50"
          vertical="center"
          ph30
          border-box
          horizontal="between"
          user-select-none
          cursor-pointer
          class="swiper-box__menu__item"
          :key="item"
          font-g
          fz16
        >
          {{ item }}
          <c-img-icon
            width="10"
            height="15"
            src="/imgs/icon-arrow.png"
          ></c-img-icon>
          <template v-if="i === 0">
            <c-row class="menu-children" border-all>
              <template v-for="item in menuList">
                <router-link
                  :key="item.id"
                  :to="{ name: 'product', params: { id: item.id } }"
                >
                  <c-col class="menu-children__item" :span="6">
                    <img :src="item.img" :alt="item.name" />
                    {{ item.name }}
                  </c-col>
                </router-link>
              </template>
            </c-row>
          </template>
        </c-box>
      </template>
    </div>
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
        :key="item.key"
        class="swiper-box__item"
      >
        <router-link :to="{ name: 'product', params: { id: item.id } }">
          <img :data-src="item.img" class="swiper-lazy" />
          <div class="swiper-lazy-preloader"></div>
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
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
    menuList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
        // 懒加载
        lazy: {
          loadPrevNext: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
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