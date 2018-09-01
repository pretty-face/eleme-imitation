<template>
  <div class='container'>
    <div class="goods">
      <div ref="menuWrapper" class="menu-wrapper">
        <ul>
          <li class="menu-item" @click="selectMenu(index, $event)" :class="{'current': currentIndex === index}" v-for="(good, index) in goods" :key="index">
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
              <div class="addgoods">
                <Shopcart @drop="drop" :food="item"></Shopcart>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="settle-wrapper">
      <div class="settle">
        <div class="shop-cart" @click="toggleList">
          <div class="cart">
            <span class="icon icon-shopping_cart" :class="{'hight-light':selectedFoods.length}"></span>
            <span class="count" v-show="selectedFoods.length">{{selectedFoods.length}}</span>
          </div>
          <span class="price">¥{{totalPrice}}</span>
          <span class="tips">另需配送费¥{{seller.deliveryPrice}}元</span>
        </div>
        <div class="distribution" :class="payClass">{{payDesc}}</div>
      </div>
      <div class="balls">
        <transition-group name="drop" @before-enter="beforeDrop" @enter="enterDrop" @after-enter="afterDrop">
          <div class="ball" v-if="ball.show" v-for="(ball,index) in balls" :key="index">
            <div class="inner"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="detail-wrapper" v-show="isShow">
          <div class="header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div ref="listWrapper" class="list-wrapper" >
            <ul>
              <li class="list-item" v-for="(food, index) in selectedFoods" :key="index">
                <div class="name">{{food.name}}</div>
                <div class="calculeate">
                  <span class="price">¥{{food.count * food.price}}</span>
                  <Shopcart :food="food"></Shopcart>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="settle-mask" @click="listHide" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Shopcart from '../../../../components/shopcart-template/Shopcart'
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
      scrollY: 0,
      balls: [{
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      }],
      dropBalls: [],
      isShow: false,
      listShow: false
    }
  },
  components: {
    Shopcart
  },
  created () {
    this.getData()
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  mounted () {
  },
  watch: {
    totalCount () {
      if (!this.totalCount) {
        this.isShow = false
        return false
      }
    },
    isShow (totalCount) {
      return this.isShow
    }
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
    },
    selectedFoods () {
      let select = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            select.push(food)
          }
        })
      })
      return select
    },
    totalCount () {
      return this.selectedFoods.length
    },
    totalPrice () {
      let total = 0
      this.selectedFoods.forEach((food) => {
        total += food.count * food.price
      })
      return total
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.seller.minPrice}元起送`
      } else if (this.totalPrice < this.seller.minPrice) {
        let diff = this.seller.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.seller.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
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
      this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true})
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
    toggleList () {
      if (!this.selectedFoods.length) {
        return
      }
      this.isShow = !this.isShow
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.listWrapper) {
            this.listWrapper = new BScroll(this.$refs.listWrapper, {
              click: true
            })
          } else {
            this.listWrapper.refresh()
          }
        })
      }
    },
    empty () {
      this.selectedFoods.forEach((food) => {
        food.count = 0
      })
    },
    listHide () {
      this.isShow = false
    },
    selectMenu (index, event) {
      // console.log(index)
      if (!event._constructed) {
        return
      }
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
    },
    drop (el) {
      let balls = this.balls
      for (var i = 0; i < balls.length; i++) {
        if (!balls[i].show) {
          balls[i].show = true
          balls[i].el = el
          this.dropBalls.push(balls[i])
          return
        }
      }
      // console.log(balls)
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let pos = this.balls[count].el.getBoundingClientRect()
          let x = pos.left - 32
          let y = -(window.innerHeight - pos.top - 24)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,-${y}px,0)`
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enterDrop (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.display = ''
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
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
      position relative
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
        .addgoods
          position absolute
          right .36rem
          bottom .30rem
.settle-wrapper
  position fixed
  bottom 0
  left 0
  z-index 50
  width 100%
  .settle
    display flex
    height .96rem
    background-color #141d27
    color rgba(255,255,255,0.4)
    font-size 0
    .shop-cart
      display flex
      flex 1
      flex-direction row
      .cart
        position relative
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
          &.hight-light
            display inline-block
            padding .15rem
            background-color #00a0dc
            color #fff
            border-radius 50%
        .count
          position absolute
          display inline-block
          right 0
          height .32rem
          line-height .32rem
          width .52rem
          border-radius .32rem
          background-color #f01414
          color #fff
          font-size .18rem
          font-weight 700
          text-align center
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
      &.enough
        background-color#00b43c
        color #fff
      &.not-enough
        background-color #2b333b
  .balls
    .ball
      position fixed
      left .64rem
      bottom .48rem
      z-index 200
      transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        height .32rem
        width .32rem
        border-radius 50%
        background-color #00a0dc
        transition: all .5s linear
  .detail-wrapper
    position absolute
    left 0
    top 0
    width 100%
    z-index -1
    transform translate3d(0,-100%,0)
    &.fold-enter-active, &.fold-leave-active
      transition all .4s
    &.fold-enter, &.fold-leave-to
      transform translate3d(0,0,0)
    .header
      display flex
      justify-content space-between
      height .8rem
      line-height .8rem
      padding 0 .36rem
      background-color #f3f5f7
      font-weight 200
      border-bottom 1px solid rgba(7,17,27,.1)
      .title
        font-size .28rem
        color rgb(7,17,27)
      .empty
        font-size .24rem
        color rgb(0,160,220)
    .list-wrapper
      max-height 4.36rem
      overflow hidden
      padding 0 .36rem
      background-color #fff
      .list-item
        display flex
        flex-direction row
        justify-content space-between
        height .96rem
        line-height .96rem
        border-bottom-1px(rgba(7,17,27,.1))
        .name
          font-size .28rem
          color rgb(7,17,27)
        .calculeate
          display flex
          font-size .2rem
          color rgb(240,20,20)
          font-weight 700
          align-items center
        .price
          font-size .28rem
          margin-right .24rem
.settle-mask
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  z-index 40
  background-color rgba(7,17,27,.6)
  transition all .4s
  &.fade-enter-active, $.fade-leave-active
    opcity 1
  &.fade-enter, &.fade-leave-to
    opcity 0
</style>
