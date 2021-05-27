<template>
  <div class="product">
    <ProductParamBar
      :title="name"
      btnText="立即购买"
      :callBack="handleToDetail"
    />
    <ProductCarousel :slideList="carouselList" />
    <div class="product-video">
      <img src="/imgs/product/gallery-1.png" @click="showVideo = true" />
    </div>
    <ProductVideo class="video-box" v-model="showVideo" :url="videoUrl" />
  </div>
</template>

<script>
import ProductParamBar from "@/components/ProductParamBar.vue";
import ProductCarousel from "@/components/ProductCarousel.vue";
import ProductVideo from "@/components/ProductVideo.vue";
import { getDetailById } from "@/api";
export default {
  name: "product",
  components: { ProductParamBar, ProductCarousel, ProductVideo },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      name: "",
      commodityId: null,
      mainImage: null,
      price: null,
      subtitle: null,
      carouselList: [
        { id: 2, url: "/imgs/product/gallery-2.png" },
        { id: 3, url: "/imgs/product/gallery-3.png" },
        { id: 4, url: "/imgs/product/gallery-4.png" },
        { id: 5, url: "/imgs/product/gallery-5.jpg" },
        { id: 6, url: "/imgs/product/gallery-6.jpg" },
      ],
      videoUrl: "/imgs/product/video.mp4",
      showVideo: false,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    handleToDetail() {
      this.$router.push({ name: "detail", params: { id: this.id } });
    },
    async getDetail() {
      const data = await getDetailById(this.id);
      this.name = data.name;
      this.commodityId = data.id;
      this.mainImage = data.mainImage;
      this.price = data.price;
      this.subtitle = data.subtitle;
    },
  },
};
</script>
<style lang="scss" scoped>
.product-video {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 900px;
  background: black;
  & > img {
    width: 1226px;
    height: 540px;
    cursor: pointer;
  }
}
.video-box {
  width: 400px;
}
</style>