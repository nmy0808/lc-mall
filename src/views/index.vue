<template>
  <div class="index">
    <div class="carousel-box">
      <Carousel :slideList="slideList" :menuList="menuList" />
    </div>
    <div class="ads-box">
      <Ads :adsList="adsList" />
    </div>
    <div class="banner-box">
      <Banner :src="bannerUrl" />
    </div>
    <div class="product-box">
      <Product :data="phoneList" />
    </div>
    <div class="service-box">
      <Service />
    </div>
    <Medal v-model="showModal" btn-type="1" @confirm="handleCommitCard">
      <template #body> 确定要加入购物车吗? </template>
    </Medal>
  </div>
</template>

<script>
import Medal from "@/components/Medal.vue";
import Carousel from "@/components/Carousel.vue";
import Ads from "@/components/HomeAds.vue";
import Banner from "@/components/HomeBanner.vue";
import Product from "@/components/HomeProduct.vue";
import Service from "@/components/HomeService.vue";

export default {
  components: { Carousel, Ads, Banner, Product, Service, Medal },
  name: "index",
  data: () => ({
    showModal: false,
    addCartId: null,
    slideList: [
      {
        id: "42",
        img: "/imgs/slider/slide-1.jpg",
      },
      {
        id: "45",
        img: "/imgs/slider/slide-2.jpg",
      },
      {
        id: "46",
        img: "/imgs/slider/slide-3.jpg",
      },
      {
        id: "46",
        img: "/imgs/slider/slide-4.jpg",
      },
    ],
    menuList: [
      {
        id: 30,
        img: "/imgs/item-box-1.png",
        name: "小米CC9",
      },
      {
        id: 31,
        img: "/imgs/item-box-2.png",
        name: "小米8青春版",
      },
      {
        id: 32,
        img: "/imgs/item-box-3.jpg",
        name: "Redmi K20 Pro",
      },
      {
        id: 33,
        img: "/imgs/item-box-1.png",
        name: "小米CC9",
      },
      {
        id: 34,
        img: "/imgs/item-box-2.png",
        name: "小米8青春版",
      },
      {
        id: 35,
        img: "/imgs/item-box-3.jpg",
        name: "Redmi K20 Pro",
      },
    ],
    adsList: [
      {
        id: 33,
        img: "/imgs/ads/ads-1.png",
      },
      {
        id: 48,
        img: "/imgs/ads/ads-2.jpg",
      },
      {
        id: 45,
        img: "/imgs/ads/ads-3.png",
      },
      {
        id: 47,
        img: "/imgs/ads/ads-4.jpg",
      },
    ],
    bannerUrl: "/imgs/banner-1.png",
    phoneList: [],
  }),
  mounted() {
    this.$eventBus.$on("update:showModal", (id) => {
      this.showModal = true;
      this.addCartId = id;
    });
    this.getProductData();
  },
  watch: {
    //  modal 弹窗关闭时清空id
    showModal: {
      handler() {
        if (!this.showModal) {
          this.addCartId = null;
        }
      },
    },
  },
  destroyed() {
    this.$eventBus.$off("update:showModal");
  },
  methods: {
    handleCommitCard() {
      console.log('??',this.addCartId);
      this.showModal = false;
    },
    getProductData() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          this.phoneList = res.list.slice(6, 14);
        });
    },
  },
};
</script>

