<template>
  <div class="detail">
    <my-scroll class="myscroll">
      <div class="detail-main">
      <p>{{content}}</p>
    </div>
    </my-scroll>
    <div class="close" @click="closeDetail">
      <div class="iconfont icon">
        <span class="icon-baseline-close-px"></span>
      </div>
    </div>
  </div>
</template>

<script>
import MyScroll from 'components/common/myscroll/MyScroll'
export default {
  components:{
    MyScroll
  },
  props:{
    content:{
      default:''
    }
  },
  methods:{
    closeDetail(){
      this.$emit("close")
    }
  },
}
</script>

<style lang="stylus" scoped>
  .detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,.8)
    z-index 999
    color #ffffff
    padding 0 40px
    .myscroll
      height 360px
      margin-top 50%
      overflow hidden
      border 1px solid #ffffff
      padding 0 15px
      border-radius 10px
      .detail-main
        margin 0 auto
        padding 10px 0
        white-space pre-wrap
        word-wrap break-word
        &>p
          padding 0
          margin 0
          letter-spacing 1.3px
          font-size 15px
          line-height 25px
          font-weight 300
    .close
      position absolute
      bottom 35px
      left 50%
      transform translate(-50%,0)
      width 32px
      height 32px
      .icon
        font-size 30px
</style>

