<template>
  <div class="cart">
    <OrderHeader
      title="我的购物车"
      subTitle="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
    />
    <c-row container>
      <c-row type="flex" class="order-item">
        <c-col :span="2">
          <input
            type="checkbox"
            :checked="selectedAll"
            @click="handleSwitchSelectAll(!selectedAll)"
          />
          全选</c-col
        >
        <c-col :span="6">商品名称</c-col>
        <c-col :span="2">单价</c-col>
        <c-col :span="6">数量</c-col>
        <c-col :span="4">小计</c-col>
        <c-col :span="4">操作</c-col>
      </c-row>
      <template v-for="item in prodList">
        <c-row type="flex" class="order-item" :key="item.productId">
          <c-col :span="2">
            <input
              type="checkbox"
              :checked="item.productSelected"
              @click="
                unSelectedOne(
                  item.productId,
                  item.quantity,
                  !item.productSelected
                )
              "
            />
          </c-col>
          <c-col :span="6" class="order-item-img">
            <c-img-icon
              :src="item.productMainImage"
              width="80"
              height="80"
            ></c-img-icon>
            {{ item.productName }}</c-col
          >
          <c-col user-select-none :span="2">{{ item.productPrice }}</c-col>
          <c-col user-select-none :span="6">
            <span
              cursor-pointer
              @click="updateCartData(item, item.quantity - 1)"
              >-
            </span>
            {{ item.quantity }}
            <span
              cursor-pointer
              @click="updateCartData(item, item.quantity + 1)"
              >+</span
            >
          </c-col>
          <c-col user-select-none :span="4">{{
            item.quantity * item.productPrice
          }}</c-col>
          <c-col user-select-none :span="4">
            <span
              user-select-none
              cursor-pointer
              @click="removeCartData(item.productId)"
              >X</span
            >
          </c-col>
        </c-row>
      </template>
      <c-row type="flex" class="order-item">
        <c-col>共{{ prodSumNum }}件商品, 已选择{{ prodCheckedNum }}件</c-col>
        <c-col>总价格{{ cartTotalPrice }}</c-col>
        <c-col btn-normal :span="4">
          <router-link :to="{ name: 'order-confirm' }">去结算</router-link>
        </c-col>
      </c-row>
    </c-row>
  </div>
</template>

<script>
import { getCart, removeCart, updateCart, selectAll, unSelectAll } from "@/api";
import OrderHeader from "@/components/OrderHeader.vue";

export default {
  name: "cart",
  components: { OrderHeader },
  data() {
    return {
      selectedAll: false,
      prodList: [],
      cartTotalPrice: 0,
    };
  },
  computed: {
    prodSumNum() {
      // return this.prodList.length;
      return this.prodList.reduce((prev, cur) => {
        return prev + cur.quantity;
      }, 0);
    },
    prodCheckedNum() {
      return this.prodList.filter((it) => it.productSelected).length;
    },
  },
  mounted() {
    this.getCartData();
  },
  methods: {
    async handleSwitchSelectAll(flag) {
      !flag && this.unSelectAllData();
      flag && this.selectAllData();
      await this.getCartData();
    },
    getCartData() {
      getCart().then(async (res) => {
        const data = await res;
        this.prodList = data.cartProductVoList;
        this.selectedAll = data.selectedAll;
        this.cartTotalPrice = data.cartTotalPrice;
      });
    },
    removeCartData(productId) {
      removeCart(productId).then(() => {
        this.renderData().then(() => {
          this.$message.success("删除成功!");
        });
      });
    },
    async unSelectedOne(productId, quantity, selectedState) {
      await updateCart(productId, quantity, selectedState);
      await this.renderData();
    },
    async updateCartData(product, quantity) {
      const { productId, productStock } = product;
      if (quantity < 1) {
        this.$message.warning("数量最小值为 1");
        return;
      }
      if (quantity > productStock) {
        this.$message.warning("超过库存");
        return;
      }
      await updateCart(productId, quantity);
      await this.renderData();
    },
    async selectAllData() {
      await selectAll();
      await this.renderData();
    },
    async unSelectAllData() {
      await unSelectAll();
      await this.renderData();
    },
    async renderData() {
      await this.getCartData();
      this.$store.dispatch("getCartCount");
    },
  },
};
</script>

<style lang="scss" scoped>
.order-item {
  height: 79px;
  align-items: center;
  border-bottom: $border-base;
}
.order-item-img {
  display: flex;
  align-items: center;
}
</style>