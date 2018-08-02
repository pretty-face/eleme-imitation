<template>
  <div class=‘container’>
    <home-header></home-header>
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
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from '@/pages/home/components/homeHeader/HomeHeader'
export default {
  name: 'Home',
  components: {
    HomeHeader: HomeHeader
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
