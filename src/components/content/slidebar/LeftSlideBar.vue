<template>
  <transition name="slide">
    <div class="slide-bar"><slot></slot></div>
  </transition> 
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    transition all .2s linear
  .slide-enter,.slide-leave-active
    transform translate3d(-100%,0,0)
  .slide-bar
    height 100%
    width 100%
</style>
