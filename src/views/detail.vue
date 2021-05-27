<template>
  <div class="detail">
    <ProductParamBar :title="detail.name" :btnText="null" />
    <div class="detail-info-box" container>
      <swiper :options="swiperOption" ref="mySwiper" class="detail-swiper-box">
        <!-- slides -->
        <swiper-slide
          v-for="item in detailSubImgs"
          :key="item"
          class="swiper-box__item"
        >
          <img :data-src="item" class="swiper-lazy" />
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
      </swiper>
      <div class="detail-params-box">
        <h3>{{ detail.name }}</h3>
        <div class="subTitle">{{ detail.subtitle }}</div>
        <div class="price">{{ detail.price }}</div>
        <div>选择版本</div>
        <c-row type="flex">
          <c-col>6GB+64GB 全网通</c-col>
          <c-col>4GB+64GB 移动4G</c-col>
        </c-row>
        <div>选择颜色</div>
        <c-row type="flex">
          <c-col>深空灰</c-col>
        </c-row>
        <div class="params-sum">
          <div class="sum-left">产品参数总结</div>
          <div class="sum-right">{{ detail.price }}元</div>
          <div>总计{{ detail.price }}元</div>
        </div>
        <div btn-big @click="handleAddCart">加入购物车</div>
      </div>
    </div>
    <Service />
  </div>
</template>

<script>
import ProductParamBar from "@/components/ProductParamBar.vue";
import { getDetailById, addCart } from "@/api";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapActions } from "vuex";
import Service from "@/components/HomeService.vue";

export default {
  name: "detail",
  components: { ProductParamBar, swiper, swiperSlide, Service },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      detail: {},
      detailSubImgs: [
        "/imgs/detail/phone-1.jpg",
        "/imgs/detail/phone-2.jpg",
        "/imgs/detail/phone-3.jpg",
        "/imgs/detail/phone-4.jpg",
      ],
      swiperOption: {
        // 懒加载  https://www.swiper.com.cn/api/lazy/213.html
        lazy: {
          loadPrevNext: true,
        },
      },
    };
  },
  mounted() {
    console.log(this.detail.subImages);
    this.getDetailData();
  },
  methods: {
    ...mapActions(["getCartCount"]),
    async getDetailData() {
      const data = await getDetailById(this.id);
      this.detail = data;
    },
    async handleAddCart() {
      await addCart(this.id).then(() => {
        this.getCartCount();
        this.$message.success("购物车添加成功!");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-info-box {
  display: flex;
}
.detail-swiper-box {
  width: 642px;
  height: 642px;
  margin: 0;
}
</style>