<template>
  <transition @before-enter="handleBeforeEnter" @leave="handleLeave">
    <div class="medal" v-show="showModal">
      <div class="medal__mask"></div>
      <div class="medal__content" ref="content">
        <c-row
          class="medal__header"
          type="flex"
          justify="space-between"
          align="middle"
          ph25
          fz16
          bg-j
          user-select-none
        >
          {{ title }}
          <c-img-icon
            cursor-pointer
            src="/imgs/icon-close.png"
            @click.native="handleClose"
          />
        </c-row>
        <div class="medal__body" pa25>
          <slot name="body"></slot>
        </div>
        <div class="medal__footer" bg-j>
          <template v-if="btnType == 3">
            <div btn-small @click="handleConfirm">{{ confirmText }}</div>
            <div btn-small btn-cancel @click="handleCancel">
              {{ cancelText }}
            </div>
          </template>
          <template v-if="btnType == 2">
            <div btn-small @click="handleCancel">{{ cancelText }}</div>
          </template>
          <template v-if="btnType == 1">
            <div btn-small @click="handleConfirm">{{ confirmText }}</div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";
export default {
  name: "medal",
  model: {
    prop: "showModal",
    event: "update:showModal",
  },
  data() {
    return {
      oContent: null,
    };
  },
  mounted() {
    this.oContent = this.$refs.content;
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
    },
    // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
    btnType: {
      type: [Number, String],
      default: 3,
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
  },
  methods: {
    handleBeforeEnter() {
      gsap.to(this.oContent, {
        top: "40%", //目标值
        opacity: 1,
        duration: 0.3, //完成时间
      });
    },
    handleLeave(el, done) {
      gsap.to(this.oContent, {
        top: "-50%", //目标值
        opacity: 0,
        duration: 0.3, //完成时间
      });
      setTimeout(() => {
        done();
      }, 300);
    },
    handleClose() {
      console.log(!this.showModal);
      this.$emit("update:showModal", !this.showModal);
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(medal) {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  @include e(mask) {
    @include dimensions(100%);
    background: rgba($color: #000000, $alpha: 0.3);
  }
  @include e(content) {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -60%);
    @include dimensions(660px, 259px);
    background: white;
  }
  @include e(header) {
    height: 60px;
  }
  @include e(body) {
      
  }
  @include e(footer) {
    @include dimensions(100%, 52px);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    [btn-small] {
      user-select: none;
      margin: 0 1em;
    }
  }
}
</style>