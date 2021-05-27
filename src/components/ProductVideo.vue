<template>
  <transition
    mode="out-in"
    @before-enter="handleBeforeEnter"
    @leave="handleLeave"
  >
    <div v-if="showVideo">
      <div class="video-mask" @click="handleClose"></div>
      <div ref="video" class="video-box">
        <video
          src="/imgs/product/video.mp4"
          muted
          autoplay
          controls="controls"
        ></video>
      </div>
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";
export default {
  model: {
    prop: "showVideo",
    event: "update:showVideo",
  },
  props: {
    url: String,
    showVideo: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit("update:showVideo", !this.showVideo);
    },
    handleBeforeEnter() {
      gsap.to(this.$refs.video, {
        "margin-top": "auto", //目标值
        opacity: 1,
        duration: 0.3, //完成时间
      });
    },
    handleLeave(el, done) {
      gsap.to(this.$refs.video, {
        "margin-top": "-50%", //目标值
        opacity: 0,
        duration: 0.3, //完成时间
      });
      setTimeout(() => {
        //执行完动画在隐藏元素
        done();
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.video-mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.6);
}
.video-box {
  z-index: 999;
  width: 1000px;
  height: 536px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: -50%;
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  outline: none;
}
</style>