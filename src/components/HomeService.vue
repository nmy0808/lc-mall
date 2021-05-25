<template>
  <c-box container class="home-service">
    <div :key="1" class="service-item">
      <c-img-icon
        src="/imgs/icon-setting.png"
        width="20"
        height="20"
      ></c-img-icon>
      <span>预约维修服务</span>
    </div>
    <div :key="2" class="service-item">
      <c-img-icon src="/imgs/icon-7day.png" width="20" height="20"></c-img-icon>
      <span>7天无理由退货</span>
    </div>
    <div :key="3" class="service-item">
      <c-img-icon
        src="/imgs/icon-15day.png"
        width="20"
        height="20"
      ></c-img-icon>
      <span>15天免费换货</span>
    </div>
    <div :key="4" class="service-item">
      <c-img-icon src="/imgs/icon-post.png" width="20" height="20"></c-img-icon>
      <span>满150元包邮</span>
    </div>
  </c-box>
</template>

<script>
export default {
  name: "service",
};
</script>

<style lang="scss" scoped>
.service-item {
  position: relative;
  height: 90px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 24%;
    width: 1px;
    background: $colorH;
  }
  & > span {
    display: inline-block;
    padding-left: 0.3em;
  }
}
</style>