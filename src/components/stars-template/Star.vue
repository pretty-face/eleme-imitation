<template>
    <div class='stars-wrapper'>
      <span class="star" :class="classMap[item]" v-for="(item,index) in sortArray" :key="index"></span>
    </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    score: Number
  },
  created () {
    this.classMap = ['off', 'on', 'half']
  },
  computed: {
    sortArray: function () {
      var count = Math.floor(this.score * 2) / 2 * 10
      var countArray = count.toString().split('')
      var sortArray = []
      for (var i = 0; i < 5; i++) {
        if (i < countArray[0]) {
          sortArray.push(1)
        } else {
          sortArray.push(0)
          if (countArray[1] === '5') {
            sortArray[countArray[0]] = 2
          }
        }
      }
      return sortArray
    }
  },
  methods: {
  }
}
</script>

<style lang='stylus' scoped>
  @import "../../common/stylus/home.styl"
  .stars-wrapper
    font-size 0
    text-align center
    margin .32rem auto .56rem
    .star
      display inline-block
      width .48rem
      height .48rem
      background-size .48rem .48rem
      margin-right .4rem
      &:last-child
        margin-right 0
      &.on
        bg-image("star48_on")
      &.off
        bg-image("star48_off")
      &.half
        bg-image("star48_half")
</style>
