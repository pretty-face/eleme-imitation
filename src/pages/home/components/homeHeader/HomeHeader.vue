<template>
  <div class="wrapper">
    <div class='container'>
      <div class="mian">
        <div class="avatar">
          <img :src="seller.avatar"  width="100%" height="100%"/>
        </div>
        <div class="info">
          <div class="name">
            <span class="brand"></span>
            <span class="title">{{seller.name}}</span>
          </div>
          <div class="time">
            <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div v-if="seller.supports" class="sale">
            <span class="discount" :class="classMap[seller.supports[0].type]"></span>
            <span class="illustrate">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="info-more" @click="showDetailsFun">
          <span class="count">5个</span>
          <span class="icon icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="bulletin">
        <span class="notice"></span>
        <span class="brief">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
        <span class="icon icon-keyboard_arrow_right"></span>
      </div>
      <div class="bg-img">
        <img :src="seller.avatar"  width="100%" height="100%"/>
      </div>
    </div>
    <transition name="fade">
      <div class="discount-detail" v-show="showDetails">
        <div class="content">
          <div class="title">{{seller.name}}</div>
          <star :score="seller.score"></star>
          <div class="cut-line-wrap">
            <span class="cut-line"></span>
            <span class="title">优惠信息</span>
            <span class="cut-line"></span>
          </div>
          <div class="discount-info">
            <div v-for="item in seller.supports" :key="item.type" class="describe-wrapper">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="describe">{{item.description}}</span>
            </div>
          </div>
          <div class="cut-line-wrap">
            <span class="cut-line"></span>
            <span class="title">商家公告</span>
            <span class="cut-line"></span>
          </div>
          <p class="seller-bulletin">
            {{seller.bulletin}}
          </p>
        </div>
        <div class="footer">
          <span class="icon-close" @click="closeDetailFun"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '../../../../components/stars-template/Star'
export default {
  name: 'HomeHeader',
  props: {
    seller: Object
  },
  components: {
    Star
  },
  data () {
    return {
      showDetails: false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  mounted () {
  },
  methods: {
    closeDetailFun () {
      this.showDetails = false
    },
    showDetailsFun () {
      this.showDetails = true
    }
  }
}
</script>

<style lang='stylus' scoped>
 @import "../../../../assets/css/icons.css"
@import "../../../../common/stylus/home.styl"

  .container
    position relative
    overflow hidden
    width 100%
    height 0
    padding-bottom 36%
    background-color rgba(7,17,27,.5)
    font-size 0
    color #fff
    font-weight 200
    .mian
      display flex
      padding .48rem .24rem .36rem .48rem
      color rgb(255,255,255)
      & > div
        flex-direction row
      .avatar
        width 1.28rem
        height 1.28rem
        img
          border-radius .04rem
      .info
        margin-left .32rem
        & > div
          flex-direction column
        .name
          flex-direction column
          font-size 0rem
          font-weight bold
          .brand
            display inline-block
            margin-top .04rem
            width .6rem
            height .36rem
            background-size .6rem .36rem
            bg-image('brand')
          .title
            vertical-align text-bottom
            margin-left .12rem
            font-size .32rem
        .time
          flex-direction column
          margin-top .16rem
          line-height .24rem
          font-size .24rem
          font-weight 200
        .sale
          line-height .24rem
          font-size .0rem
          font-weight 200
          .discount
            display inline-block
            width .24rem
            height .24rem
            margin-top .2rem
            background-size .24rem .24rem
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .illustrate
            vertical-align super
            font-size .2rem
            margin-left .08rem
      .info-more
        position absolute
        right .24rem
        bottom .86rem
        display inline-block
        padding 0 .16rem
        width .6rem
        height .48rem
        line-height .48rem
        background-color rgba(0,0,0,.2)
        border-radius .3rem
        .count
         font-size .2rem
        .icon
          display inline-block
          margin-left .03rem
          width .18rem
          font-size:.2rem
    .bulletin
      position absolute
      z-index 10
      display flex
      left 0
      bottom 0
      width 100%
      line-height .56rem
      background-color rgba(7,17,27,.2)
      padding 0 .24rem
      font-size 0
      .notice
        display inline-block
        width .44rem
        height .24rem
        background-size .44rem .24rem
        margin-top .16rem
        margin-right .08rem
        bg-image('bulletin')
      .brief
        overflow hidden
        display inline-block
        flex 1
        min-width 0
        white-space nowrap
        text-overflow ellipsis
        font-size .2rem
       .icon
         display inline-block
         line-height .56rem
         width .6rem
         font-size .3rem
    .bg-img
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      height 100%
      filter blur(10px)
  .discount-detail
    position absolute
    left 0
    top 0
    z-index 99
    width 100%
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /*height 100%*/
    background rgba(7,17,27,.8)
    color #fff
    .content
      flex 1
      .title
        font-size .32rem
        font-weight 700
        line-height .32rem
        text-align center
        padding-top 1.28rem
      .cut-line-wrap
        display flex
        padding 0 .72rem
        .cut-line
          flex 1
          width 0
          height 0
          margin-top .14rem
          border-top 1px solid rgba(255,255,255,.2)
        .title
          padding 0 .24rem
          font-size .32rem
          font-weight 700
          line-height .32rem
          text-align center
      .discount-info
        font-size 0
        padding .48rem .96rem .54rem
        .describe-wrapper
          height .32rem
          margin-bottom .24rem
          .icon
            display inline-block
            width .32rem
            height .32rem
            background-size .32rem .32rem
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')
          .describe
            display inline-block
            margin-top .02rem
            margin-left .12rem
            font-size .24rem
            line-height .24rem
            vertical-align top
      .seller-bulletin
        font-size .24rem
        line-height .48rem
        padding .48rem .96rem
    .footer
      flex 0
      height 1.28rem
      text-align center
      .icon-close
        display inline-block
        font-size .64rem
        color rgba(255,255,255,.5)
.fade-enter-active, .fade-leave-active {
 transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
 opacity: 0;
}
</style>
