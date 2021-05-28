<template>
  <div class="order-pay">
    <OrderHeader
      title="订单支付"
      subTitle="请谨防钓鱼链接或诈骗电话，了解更多"
    />
    <div container>
      <div pv10>订单号：1622164583594</div>
      <div pv10>
        收货信息：{{ shippingVo.receiverName }}
        {{ shippingVo.receiverMobile }}
        {{ shippingVo.receiverProvince }}
        {{ shippingVo.receiverCity }}
        {{ shippingVo.receiverDistrict }}
      </div>
      <div fz22>商品名称：</div>
      <div>
        <template v-for="item in orderItemVoList">
          <div :key="item.productId" pv10>
            {{ item.productName }} | 单价:{{ item.currentUnitPrice }} | 数量:{{
              item.quantity
            }}
            | 总价:{{ item.totalPrice }}元
          </div>
        </template>
      </div>
      <div fz22>总计:{{ payment }}元</div>
      <div>发票信息：电子发票 个人</div>
    </div>
    <div container pt20>
      <div fz22>选择以下支付方式付款</div>
      <c-img-icon
        @click.native="goPay(1)"
        width="190"
        height="66"
        border-all
        src="/imgs/pay/icon-ali.png"
      ></c-img-icon>
      <c-img-icon
        width="190"
        height="66"
        border-all
        @click.native="getWXPayUrl"
        src="/imgs/pay/icon-wechat.png"
      ></c-img-icon>
    </div>
    <Medal v-model="showMedal">
      <template #body>
        <c-img-icon width="200" height="200" :src="codeUrl"></c-img-icon>
      </template>
    </Medal>
    <button @click="$router.push({ name: 'order-list' })">跳转到列表</button>
  </div>
</template>

<script>
import QRCode from "qrcode";
import Medal from "@/components/Medal.vue";
import OrderHeader from "@/components/OrderHeader.vue";
import { findOrderInfoById, pay } from "@/api";
export default {
  name: "order-pay",
  components: { OrderHeader, Medal },
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      shippingVo: {}, // 个人信息,收货地址
      orderItemVoList: [], //订单商品列表
      payment: 0, //总价
      codeUrl: "", //二维码url
      showMedal: false,
      T: null, //微信轮询定时器
    };
  },
  methods: {
    renderOrderInfo() {
      findOrderInfoById(this.$route.query.orderNo).then((res) => {
        console.log(res);
        this.shippingVo = res.shippingVo;
        this.orderItemVoList = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    async goPay(type) {
      const data = await findOrderInfoById(this.orderNo);
      if (data.status == 20) {
        this.$message.error("订单已支付!请去订单列表查看");
        return;
      }
      if (type === 1) {
        let routeUrl = this.$router.resolve({
          name: "alipay",
          query: { orderNo: this.orderNo },
        });
        window.open(routeUrl.href, "_blank");
      }
    },
    // 获取微信url并转换为二维码
    async getWXPayUrl() {
      let data;
      try {
        data = await pay({
          orderId: this.orderNo,
          orderName: "购买商城商品",
          amount: 0.01,
          payType: 2,
        });
      } catch (error) {
        return;
      }
      this.showMedal = true;
      const url = data.content;
      this.codeUrl = await QRCode.toDataURL(url);
      // 轮询微信二维码状态
      this.T = setInterval(async () => {
        const data = await findOrderInfoById(this.orderNo);
        if (data.status == 20) {
          clearInterval(this.T);
          this.$router.push({ name: "order-list" });
        }
      }, 2000);
    },
  },
  mounted() {
    this.renderOrderInfo();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .medal__content {
  height: 350px;
}
</style>