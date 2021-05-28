<template>
  <div class="alipay">
    <div container v-html="content"></div>
  </div>
</template>

<script>
import { pay } from "@/api";
export default {
  name: "alipay",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    initPayContent() {
      const orderId = this.$route.query.orderNo;
      pay({
        orderId,
        orderName: "购买商城商品",
        amount: 0.01,
        payType: 1,
      })
        .then((res) => {
          this.content = res.content;
          setTimeout(() => {
            document.querySelector("#bestPayForm").submit();
          }, 0);
        })
        .catch((err) => {
          console.log(err.toString());
        });
    },
  },
  mounted() {
    this.initPayContent();
  },
};
</script>

<style>
</style>