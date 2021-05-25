<template>
  <div container>
    <c-row class="ads" :gutter="10">
      <template v-for="item in adsList">
        <c-col class="ads__item" :span="6" :key="item.id">
          <router-link :to="{ name: 'product', params: { id: item.id } }">
            <img v-lazy="item.img" />
          </router-link>
        </c-col>
      </template>
    </c-row>
  </div>
</template>

<script>
export default {
  name: "ads",
  props: {
    adsList: Array,
  },
};
</script>

<style lang="scss" scoped>
.ads {
  padding-top: 10px;
  &__item {
    box-sizing: border-box;
    height: 160px;
    overflow: hidden;
    & > img {
      width: 100%;
    }
  }
}
</style>