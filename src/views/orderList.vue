<template>
  <div class="order-list">
    <OrderHeader
      title="订单列表"
      subTitle="请谨防钓鱼链接或诈骗电话，了解更多"
    />
    <c-row container>
      <template v-for="order in orderList">
        <c-col :key="order.orderNo" pv30>
          <div>订单号: {{ order.orderNo }}</div>
          <div>创建时间: {{ order.paymentTime }}</div>
          <div>购买人: {{ order.receiverName }}</div>
          <div>支付方式: {{ order.paymentTypeDesc }}</div>
          <div>商品列表</div>
          <template v-for="(item, i) in order.orderItemVoList">
            <div :key="i">
              <c-img-icon :src="item.productImage"></c-img-icon>
              商品名: {{ item.productName }} 价格: {{ item.quantity }} x
              {{ item.currentUnitPrice }}元
            </div>
          </template>
          <div v-if="order.status === 20" fz22>已付款</div>
          <div
            v-if="order.status === 10"
            fz22
            btn-small
            @click="
              $router.push({
                name: 'order-pay',
                query: { orderNo: order.orderNo },
              })
            "
          >
            未付款,去支付
          </div>
        </c-col>
      </template>
    </c-row>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import { getOrders } from "@/api";

export default {
  name: "order-list",
  components: { OrderHeader },
  data() {
    return {
      orderList: [],
      pageNum: 1,
      isGetData: true,
    };
  },
  methods: {
    async getOrderList() {
      const data = await getOrders(this.pageNum);
      this.orderList = this.orderList.concat(data.list);
      if (data.hasNextPage) {
        this.isGetData = true;
      } else {
        this.isGetData = false;
      }
      setTimeout(() => {
         this.initWinSize();
      }, 0);
    },
    initWinSize() {
      this.innerHeight = window.innerHeight;
      this.scrollTop = document.documentElement.scrollTop;
      this.scrollHeight = document.documentElement.scrollHeight;
    },
    initScrollEvent() {
      window.addEventListener("scroll", () => {
         this.initWinSize();
        if (!this.isGetData) return;
        if (this.scrollHeight - 500 <= this.scrollTop + this.innerHeight) {
          console.log(123);
          this.pageNum += 1;
          this.getOrderList();
        }
      });
    },
  },
  mounted() {
    this.getOrderList();
    this.initWinSize();
    this.initScrollEvent();
  },
};
</script>

<style>
</style>