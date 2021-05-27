<template>
  <div class="nav-header">
    <div bg-b>
      <c-row
        class="nav-header__topbar"
        fz12
        h-100
        container
        align="middle"
        type="flex"
        justify="start"
      >
        <div class="nav-header__topbar-left" h-100 display-flex align-center>
          <router-link to="">小米商城</router-link>
          <router-link to="">MUI</router-link>
          <router-link to="">云服务</router-link>
          <router-link to="">协议规则</router-link>
        </div>
        <div class="nav-header__topbar-right" h-100 display-flex align-center>
          <router-link to="">{{ userName }}</router-link>
          <router-link v-if="!userName" :to="{ name: 'login' }"
            >登录</router-link
          >
          <div
            v-if="userName"
            class="login-out"
            href="javascript:;"
            @click="loginOut"
          >
            退出
          </div>
          <router-link to="">我的订单</router-link>
          <router-link :to="{ name: 'order-cart' }">
            <div btn-normal class="nav-header__icon" h-100>
              <c-img-icon src="/imgs/icon-cart-checked.png" mr5></c-img-icon>
              购物车{{ cartCount }}
            </div>
          </router-link>
        </div>
      </c-row>
    </div>
    <c-box class="nav-header__body" height="112" vertical="center" container>
      <c-box class="nav-header__body-logo">
        <router-link class="nav-header__body-logo__box" :to="{ name: 'home' }">
          <c-img-icon src="/imgs/mi-logo.png" width="55" height="55" />
          <c-img-icon src="/imgs/mi-home.png" width="55" height="55" />
        </router-link>
      </c-box>
      <c-box class="nav-header__body-menu" h-100>
        <div class="nav-header__body-menu__item">
          <router-link to="#">小米手机</router-link>
          <c-box class="nav-header__body-menu__item__children" bg-g>
            <template v-for="item in phoneList">
              <c-box
                cursor-pointer
                class="nav-header__body-menu__item__children__item"
                :key="item.id"
                height="220"
                wrap="wrap"
                align-content-start
                horizontal="center"
              >
                <router-link :to="{ name: 'product', params: { id: item.id } }">
                  <c-box height="161" width="161">
                    <img w-100 :src="item.mainImage" />
                  </c-box>
                  <c-box class="info" wrap="wrap" w-100 text-center>
                    <p w-100 fz12 pt19 pb8>{{ item.name }}</p>
                    <p w-100 fz12 font-a>{{ item.price | currency }}</p>
                  </c-box>
                </router-link>
              </c-box>
            </template>
          </c-box>
        </div>
        <div class="nav-header__body-menu__item">
          <router-link to="#">RedMi红米</router-link>
          <c-box class="nav-header__body-menu__item__children" bg-g
            >213123213</c-box
          >
        </div>
        <div class="nav-header__body-menu__item">
          <router-link to="#">电视</router-link>
          <c-box class="nav-header__body-menu__item__children" bg-g
            >123123</c-box
          >
        </div>
      </c-box>
      <c-box class="nav-header__body-search" border-all>
        <input type="text" border-right />
        <c-box
          vertical="center"
          horizontal="center"
          height="52"
          width="52"
          cursor-pointer
        >
          <router-link to="#">
            <c-img-icon src="/imgs/icon-search.png" width="18" height="18" />
          </router-link>
        </c-box>
      </c-box>
    </c-box>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    ...mapState(["userName", "cartCount"]),
  },
  mounted() {
    this.axios
      .get("/products", {
        params: {
          categoryId: 100012,
          pageSize: 14,
        },
      })
      .then((res) => {
        this.phoneList = res.list.slice(6, 12);
      });
  },
  methods: {
    ...mapActions(["loginOut"]),
  },
  filters: {
    currency: function (value = 0) {
      let temp = value;
      return "¥ " + temp.toFixed(2) + "元";
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(nav-header) {
  @include e(topbar) {
    height: 39px;
    a,
    .login-out {
      line-height: 39px;
      margin-right: 17px;
      color: $colorD;
      display: inline-block;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  @include e(topbar-left) {
    margin-right: auto;
  }
  @include e(body) {
    position: relative;
  }
  @include e(body-logo) {
    margin-right: 209px;
    @include dimensions(55px);
    background: $colorA;
    overflow: hidden;
    @include e(box) {
      display: flex;
      @include dimensions(110px, 100%);
      transition: all 0.3s;
      &:hover {
        transform: translateX(-55px);
      }
      a {
        flex-shrink: 0;
      }
    }
  }
  @include e(body-menu) {
    font-size: 16px;
    font-weight: bold;
    @include e(item) {
      display: inline-block;
      margin-right: 20px;
      height: 100%;
      line-height: 112px;
      user-select: none;
      &:hover {
        & > a {
          color: $colorA;
        }
        .nav-header__body-menu__item__children {
          padding-top: 10px;
          box-sizing: border-box;
          height: 250px;
          transition: height 0.3s;
          border: $border-base;
        }
      }
      @include e(children) {
        position: absolute;
        left: 0;
        right: 0;
        top: 112px;
        z-index: 12;
        height: 0;
        overflow: hidden;
        box-shadow: 0px 7px 6px 0px rgb(0 0 0 / 11%);
        background: white;
        @include e(item) {
          position: relative;
          width: calc(1226px / 6);
          &:not(:last-child):after {
            content: "";
            position: absolute;
            top: 12%;
            right: 0;
            height: 50%;
            width: 1px;
            background: $colorH;
          }
        }
      }
    }
  }
  @include e(body-search) {
    margin-left: auto;
    input {
      @include dimensions(264px, 52px);
      padding-left: 1em;
    }
  }
}
</style>