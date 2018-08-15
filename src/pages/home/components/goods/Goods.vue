<template>
  <div class='container'>
    <div class="goods">
      <div class="menu"></div>
      <div class="goods-list"></div>
    </div>
    <div class="settle-wrapper">
      <div class="shop-cart"></div>
      <div class="price"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: {
    seller: Object,
    goods: Array,
    ratings: Array
  }
}
</script>

<style lang='stylus' scoped>
.menu{}
</style>
