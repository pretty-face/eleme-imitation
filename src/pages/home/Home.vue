<template>
  <div class='wrapper'>
    <home-header :seller="seller"></home-header>
    <div class='tab border-1px'>
      <div class='tab-item'>
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class='tab-item'>
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class='tab-item'>
        <router-link to='/sellers'>商家</router-link>
      </div>
    </div>
    <router-view :ratings="ratings" :seller="seller"></router-view>
  </div>
</template>

<script>
import HomeHeader from '@/pages/home/components/homeHeader/HomeHeader'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HomeHeader: HomeHeader
  },
  data () {
    return {
      seller: {},
      ratings: [],
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
      this.seller = res.seller
      this.goods = res.goods
      this.ratings = res.ratings
      // console.log('goods:')
      // console.log(this.goods)
      // console.log('ratings:')
      // console.log(this.ratings)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import "../../common/stylus/home.styl"
  .tab
    display flex
    line-height .8rem
    font-size .28rem
    border-bottom-1px(rgba(7,17,27,0.1))
    .tab-item
      flex 1
      text-align center
      color rgb(77,85,93)
      .active
        color rgb(240,20,20)
</style>
