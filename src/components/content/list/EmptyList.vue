<template>
  <div class="empty">
    <div class="img-wrap"><slot name="img"><img src="~assets/img/cat.png" alt=""></slot></div>
    <div class="txt">{{txt}}</div>
  </div>
</template>

<script>
export default {
  props:{
    txt:{
      default:"还没有任何内容..."
    }
  }
}
</script>

<style lang="stylus" scoped>
  .empty
    position fixed
    display flex
    width 360px
    height 150px
    top 50%
    left 50%
    margin-top -75px
    margin-left -180px
    .img-wrap
      height 150px
      img
        max-height 100%
    .txt
      flex 1
      flex-center()
      font-size 18px
      font-family $themefont
      letter-spacing 3px
      font-weight 700
      color #444
</style>
