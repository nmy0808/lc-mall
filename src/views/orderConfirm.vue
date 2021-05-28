<template>
  <div class="order-confirm">
    <OrderHeader title="订单确认" subTitle="请认真填写收货地址" />
    <div class="confirm-address-box" container>
      <h3 fz24 pv30>收货地址:</h3>
      <c-row type="flex" pb30>
        <template v-for="(item, i) in addressList">
          <c-col
            class="order-address-item"
            :span="4"
            :class="{ active: curAddressIndex == i }"
            :key="item.id"
          >
            <!-- @click.native.once="handleUpdateOrder(item, i)" -->
            <p>{{ item.receiverName }}</p>
            <p>{{ item.receiverMobile }}</p>
            <p>
              {{ item.receiverProvince }}-{{ item.receiverCity }}-{{
                item.receiverDistrict
              }}
            </p>
            <span cursor-pointer @click="handleRemoveOrder(item.id)"
              >[删除]</span
            >
            <span> | </span>
            <span cursor-pointer @click="showModel(item.id)">[编辑]</span>
          </c-col>
        </template>
        <c-col :span="6">
          <div btn-normal @click="showModel('add')">添加地址</div>
        </c-col>
      </c-row>
      <h3 fz24 pv30 border-top>商品:</h3>
      <c-row>
        <template v-for="item in cartProductVoList">
          <c-col :key="item.productId" pv10>
            <c-img-icon :src="item.productMainImage"></c-img-icon>
            [{{ item.productName }}] - {{ item.productPrice }}x{{
              item.quantity
            }}个 - {{ item.productPrice * item.quantity }}元
          </c-col>
        </template>
      </c-row>
      <c-row border-top>
        <c-col pv10>商品件数：{{ calcCommoditySum }}件</c-col>
        <c-col pv10>应付总额：{{ cartTotalPrice }}元</c-col>
      </c-row>
      <c-row pt20>
        <c-col :span="4" btn-normal @click="$route.push({ name: 'order-cart' })"
          >返回购物车</c-col
        >
        <c-col
          :offset="1"
          :span="4"
          btn-normal
          @click.native="handleCreateOrder"
          >去结算</c-col
        >
      </c-row>
    </div>
    <Medal
      v-model="showEmitAddressMedal"
      @confirm="handleCommitFrom"
      @cancel="handleCloseAddressMedal"
    >
      <template #body>
        <div pv10>
          <input
            v-model="addressForm.receiverName"
            border-all
            type="text"
            placeholder="姓名"
          />
        </div>
        <div pv10>
          <input
            v-model="addressForm.receiverMobile"
            border-all
            type="text"
            placeholder="手机号"
          />
        </div>
        <div pv10>
          <select v-model="addressForm.receiverProvince">
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option>
            <option value="安徽省">安徽省</option>
          </select>
          <select v-model="addressForm.receiverCity">
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="石家庄">石家庄</option>
          </select>
          <select v-model="addressForm.receiverDistrict">
            <option value="北京">昌平区</option>
            <option value="天津">海淀区</option>
            <option value="河北">东城区</option>
            <option value="天津">西城区</option>
            <option value="河北">顺义区</option>
            <option value="天津">房山区</option>
          </select>
        </div>
      </template>
    </Medal>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import Medal from "@/components/Medal.vue";
import {
  getCart,
  getAddressList,
  removeOrderById,
  updateOrder,
  addOrder,
  findOrderById,
  createOrder,
} from "@/api";
export default {
  name: "order-confirm",
  components: { OrderHeader, Medal },
  data() {
    return {
      showEmitAddressMedal: false,
      addressList: [],
      cartProductVoList: [], // 购物车商品列表
      cartTotalPrice: 0, // 总价
      cartTotalQuantity: 0, //总共商品
      curAddressIndex: 0, // 当前激活的地址索引
      addressType: 0, // 当前地址是 `编辑` 还是 `新增` 状态. ( 1: 新增, 2: 编辑 )
      addressForm: {
        id: "",
        // 地址表单
        receiverName: "",
        receiverMobile: "",
        receiverProvince: "",
        receiverCity: "",
        receiverDistrict: "",
      },
    };
  },
  methods: {
    handleCommitFrom() {
      if (this.addressType === 1) {
        this.handleAddAddress();
      } else {
        this.handleUpdateOrder(this.addressForm);
      }
    },
    showModel(orderId) {
      if (orderId == "add") {
        this.showEmitAddressMedal = true;
        this.addressType = 1;
      } else {
        findOrderById(orderId).then((res) => {
          this.addressForm.id = orderId;
          this.addressForm.receiverName = res.receiverName;
          this.addressForm.receiverMobile = res.receiverMobile;
          this.addressForm.receiverProvince = res.receiverProvince;
          this.addressForm.receiverCity = res.receiverCity;
          this.addressForm.receiverDistrict = res.receiverDistrict;
          this.showEmitAddressMedal = true;
          this.addressType = 2;
        });
      }
    },
    handleRemoveOrder(shippingId) {
      removeOrderById(shippingId).then(() => {
        this.renderAddressList();
        this.$message.success("删除成功!");
      });
    },
    // 渲染订单列表
    renderAddressList() {
      getAddressList().then((res) => {
        this.addressList = res.list;
        console.log(res);
      });
    },
    // 渲染购物车列表
    renderCartList() {
      getCart().then((res) => {
        this.cartProductVoList = res.cartProductVoList;
        this.cartTotalPrice = res.cartTotalPrice;
        this.cartTotalQuantity = res.cartTotalQuantity;
        console.log(res);
      });
    },
    // 新增地址
    handleAddAddress() {
      const {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
      } = this.addressForm;
      if (
        receiverName == "" ||
        receiverMobile == "" ||
        receiverProvince == "" ||
        receiverCity == "" ||
        receiverDistrict == ""
      ) {
        this.$message.error("请检查表单内容");
        return;
      }
      addOrder({
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
      }).then(() => {
        this.clearEmitAddressMedal();
        this.$message.success("新增成功!");
      });
    },
    // 切换更新地址
    handleUpdateOrder({
      id,
      receiverName,
      receiverMobile,
      receiverProvince,
      receiverCity,
      receiverDistrict,
    }) {
      updateOrder(id, {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
      }).then(() => {
        this.clearEmitAddressMedal();
        this.$message.success("切换地址成功");
      });
    },
    handleCloseAddressMedal() {
      this.showEmitAddressMedal = false;
      this.addressForm = {};
      this.addressType = 0;
    },
    clearEmitAddressMedal() {
      this.renderAddressList();
      this.showEmitAddressMedal = false;
      this.addressForm = {};
      this.addressType = 0;
    },
    // 创建订单
    handleCreateOrder() {
      const shippingId = this.addressList[this.curAddressIndex].id;
      createOrder(shippingId).then((res) => {
        const { orderNo } = res;
        this.$router.push({ name: "order-pay", query: { orderNo } });
      });
    },

  },
  mounted() {
    this.renderAddressList();
    this.renderCartList();
  },
  computed: {
    // 商品总数
    calcCommoditySum() {
      console.log(this.cartProductVoList, "?");
      return this.cartProductVoList.reduce((pre, cur) => {
        if (cur.productSelected) {
          return (pre += cur.quantity);
        }
        return pre;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-address-item {
  padding: 10px;
  &.active {
    border: 1px solid $colorA;
  }
}
.confirm-address-box {
  border-bottom: $border-base;
  padding: 40px 0;
}
</style>