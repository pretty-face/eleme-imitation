<template>
  <div class='container'>
    <div class="goods">
      <div ref="menuWrapper" class="menu-wrapper">
        <ul>
          <li class="menu-item" @click="selectMenu(index)" :class="{'current': currentIndex === index}" v-for="(good, index) in goods" :key="index">
            <div class="menu-inner">
              <span v-show="good.type >= 0" class="icon" :class="classMap[good.type]"></span>
              <span class="title">{{good.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div ref="foodsWrapper" class="foods-wrapper">
        <ul>
          <li ref="goodsContent" class="goods-content" v-for="(good, index) in goods" :key="index">
            <div class="title">{{good.name}}</div>
            <div class="content" v-for="(item, index ) in good.foods" :key="index">
              <div class="left-img">
                <img :src="item.image" width="100%">
              </div>
              <div class="brief">
                <div class="name">{{item.name}}</div>
                <div class="desc">{{item.description}}</div>
                <div class="sell-condiction">
                  月售<span class="sellCount">{{item.sellCount}}</span>
                  好评率<span class="rating">{{item.rating}}</span>
                </div>
                <div class="sell-price">
                  <span class="price">¥{{item.price}}</span>
                  <span class="old-price" v-show="item.oldprice">¥{{item.oldprice}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="settle-wrapper">
      <div class="shop-cart">
        <div class="cart">
          <span class="icon icon-shopping_cart"></span>
        </div>
        <span class="price">¥0</span>
        <span class="tips">另需配送费¥4元</span>
      </div>
      <div class="distribution">¥20元起送</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  name: 'Goods',
  props: {
    seller: Object,
    ratings: Array
  },
  data () {
    return {
      goods: [],
      heightList: [],
      scrollY: 0
    }
  },
  created () {
    this.getData()
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  mounted () {
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        let h1 = this.heightList[i]
        let h2 = this.heightList[i + 1]
        if (this.scrollY >= h1 && this.scrollY < h2) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    getData () {
      axios.get('/api/data.json').then((res) => {
        this.distrubuteData(res.data)
      })
    },
    _initScroll () {
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {click: true})
      this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {probeType: 3})
      this.foodsWrapper.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    _calculateHeight () {
      let foodsList = this.$refs.goodsContent
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodsList.length; i++) {
        height += foodsList[i].clientHeight
        this.heightList.push(height)
      }
    },
    selectMenu (index) {
      console.log(index)
      let el = this.$refs.goodsContent[index]
      console.log(el)
      this.foodsWrapper.scrollToElement(el, 300)
    },
    distrubuteData (res) {
      this.goods = res.goods
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import "../../../../assets/css/icons.css"
@import '../../../../common/stylus/mixin.styl'
.goods
  display flex
  overflow hidden
  position absolute
  top 3.5rem
  bottom .96rem
  .menu-wrapper
    box-sizing border-box
    width 1.6rem
    overflow hidden
    background-color #f3f5f7
    .menu-item
      display table
      box-sizing border-box
      width 100%
      height 1.08rem
      font-size 0
      padding 0 .2rem
      &.current
        background-color #fff
        color rgb(240, 20, 20)
      .menu-inner
        display table-cell
        vertical-align middle
        border-bottom-1px(rgba(7,17,27,.1))
        .icon
          display inline-block
          vertical-align bottom
          width .24rem
          height .24rem
          background-size .24rem .24rem
          margin-right .05rem
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .title
          text-align center
          font-size .24rem
          color #07111b
  .foods-wrapper
    flex 1
    overflow hidden
    .goods-content
      display inherit
      .title
        height .52rem
        line-height .52rem
        border-left .02rem solid #dedde1
        padding-left .26rem
        font-size .24rem
        color rgb(147,153,159)
        background-color #f3f5f7
      .content
        display flex
        flex-direction row
        margin 0 .36rem
        padding .36rem 0
        border-bottom-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
        .left-img
          width 1.16rem
          height 1.16rem
        .brief
          flex 1
          flex-direction column
          margin-left .2rem
          .name
            font-size .28rem
            color rgb(7, 17, 27)
          .desc
            line-height .28rem
            font-size .2rem
            color #93999f
            margin .16rem 0
          .sell-condiction
            font-size .2rem
            color #93999f
            .sellCount
              padding-right .24rem
          .sell-price
            flex-direction column
            font-size 0
            margin-top .18rem
            .price
              padding-right .16rem
              font-size .28rem
              color #f01414
              font-weight 700
            .old-price
              color rgb(147,153,159)
              font-size .2rem
              text-decoration line-through
.settle-wrapper
  position fixed
  display flex
  bottom 0
  left 0
  z-index 50
  width 100%
  height .96rem
  background-color #141d27
  color rgba(255,255,255,0.4)
  font-size 0
  .shop-cart
    display flex
    flex 1
    flex-direction row
    .cart
      background-color #141d27
      height 1.08rem
      width 1.08rem
      border-radius 50%
      margin-top -.15rem
      margin-left .28rem
      text-align center
      margin-right .24rem
      &::after
        content ''
        display inline-block
        width 0
        height 100%
        vertical-align middle
      .icon
        font-size .48rem
        display inline-block
        vertical-align middle
    .price, .tips
      display inline-block
      line-height .96rem
      font-size .32rem
      font-weight 700
    .tips
      margin-left .48rem
  .distribution
    box-sizing border-box
    line-height .96rem
    width 2.1rem
    text-align center
    font-size .24rem
    font-weight 700
</style>
