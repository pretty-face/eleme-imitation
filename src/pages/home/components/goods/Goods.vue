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
import axios from 'axios'
export default {
  name: 'Goods',
  props: {
    seller: Object,
    ratings: Array
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('/api/data.json').then((res) => {
        this.distrubuteData(res.data)
      })
    },
    distrubuteData (res) {
      console.log(res)
      this.goods = res.goods
    }
  }
}
</script>

<style lang='stylus' scoped>
.menu{}
</style>
