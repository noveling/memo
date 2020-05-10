<template>
  <div class="my-bubble">{{info}}</div>
</template>

<script>
export default {
  props:{
    info:{
      default:"还没有内容"
    }
  },
  data(){
    return {
      time:0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-bubble:after
    content ''
    position absolute
    right 100%
    bottom 0px
    width 16px
    height 16px
    border-width 0
    border-style solid
    border-color transparent
    border-top-width 10px
    border-top-color currentColor
    border-radius 32px 0 0 0
    color #dddddd
  .my-bubble
    position fixed
    left 150px
    bottom 80px
    background-color #dddddd
    padding 9px
    border-radius 13px
    font-size 15px
    color #ffffff
    max-width 55%
    max-height 100%
    word-break break-all
</style>
