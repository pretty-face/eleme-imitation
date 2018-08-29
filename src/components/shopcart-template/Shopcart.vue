<template>
    <div class='shopcart-wrapper'>
      <transition name="fade">
        <div class="decrease" v-show="hasGoods" @click="decreaseGoods">
          <span class="icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="count" v-show="hasGoods">{{food.count}}</div>
      <div class="increase" @click="increaseGoods">
        <span class="icon-add_circle"></span>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Shopcart',
  data () {
    return {
    }
  },
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    hasGoods () {
      return this.food.count
    }
  },
  methods: {
    decreaseGoods () {
      if (this.food.count) {
        this.food.count--
      }
    },
    increaseGoods () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('drop', event.target)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import "../../assets/css/icons.css"
.shopcart-wrapper
  display flex
  font-size .48rem
  color rgb(0,160,220)
  line-height .48rem
  .fade-enter-active, .fade-leave-active
    transition all .4s
  .fade-enter, .fade-leave-to
    transform translateX(20px) rotate(180deg)
    opacity 0
  .count
    width .48rem
    text-align center
    font-size .2rem
    color rgb(147,153,159)
</style>
