<template>
  <div @click="handle">{{ msg }}</div>
</template>

<script>
export default {
  props: { click: Function, msg: [String, Number],m: Function },
  methods: {
    handle() {
      this.m()
    },
  },
};
</script>

<style>
</style>