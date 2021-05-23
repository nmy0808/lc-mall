<template>
  <div class="index">
    index
    <c-row>
      <c-col :span="6">1</c-col>
      <c-col :span="6">1</c-col>
      <c-col :span="6">1</c-col>
      <c-col :span="6">1</c-col>
    </c-row>
    <div>
       <button @click="show2 = !show2">Click Me</button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="el-zoom-in-center">
        <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
      </transition>

      <transition name="el-zoom-in-top">
        <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
      </transition>

      <transition name="el-zoom-in-bottom">
        <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
      </transition>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    show2: true,
  }),
};
</script>

<style>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>