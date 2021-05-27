<template>
  <div class="prod-param-box" :class="{ fixed: isFixed }">
    <c-row class="prod-param" container type="flex">
      <c-row class="prod-left">{{ title }}</c-row>
      <c-row class="prod-right" type="flex">
        <c-col class="prod-right__item">概述</c-col>
        <c-col class="prod-right__item">参数</c-col>
        <c-col class="prod-right__item">用户评价</c-col>
        <c-col class="prod-right__item" v-if="btnText">
          <div btn-small @click="handleCB">{{ btnText }}</div>
        </c-col>
      </c-row>
    </c-row>
  </div>
</template>

<script>
export default {
  name: "ProductParamBar",
  props: {
    title: [String, Number],
    btnText: [String],
    callBack: Function,
  },
  data() {
    return {
      isFixed: false,
      limitTop: 0,
    };
  },
  methods: {
    handleCB() {
      if (this.callBack) this.callBack();
    },
    scrollEvent() {
      const top = document.documentElement.scrollTop;
      if (top >= this.limitTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    initScrollEvent() {
      this.limitTop = this.$el.offsetTop;
      window.addEventListener("scroll", this.scrollEvent);
    },
  },
  mounted() {
    this.initScrollEvent();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent, false);
  },
};
</script>

<style lang="scss" scoped>
.prod-param-box {
  width: 100%;
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: white;
  }
}
.prod-param {
  align-items: center;
  height: 70px;
}
.prod-left {
  font-size: 18px;
  font-weight: bold;
  margin-right: auto;
}
.prod-right {
  align-items: center;
  &__item {
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    color: $colorC;
    font-size: 14px;
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 20px;
      background: $colorF;
    }
  }
}
</style>