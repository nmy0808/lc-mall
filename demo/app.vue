<template>
  <div>
    <box @click="handle" :msg="msg" :m="m"></box>
  </div>
</template>

<script>
import box from "./box";
export default {
  components: { box },
  data() {
    return {
      msg: 123,
    };
  },
  methods: {
    handle(a, b, c) {
      console.log(a, b, c);
    },
    m() {
      console.log("m");
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          
        })
        .catch(() => {
          
        });
    },
  },
};
</script>

<style>
</style>