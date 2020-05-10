<template>
  <div class="toast" ref="toast">
    {{toastMsg}}
  </div>
</template>

<script>
import anime from "animejs"
export default {
  props:{
    toastMsg:{
      default:"^_^"
    }
  },
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.toast,
          duration:1000,
          direction: 'reverse',
          opacity:.1,
          easing:'linear'
        })
      })
    }
  },
  mounted(){
    this.run()
  }
}
</script>

<style lang="stylus" scoped>
  .toast
    position fixed
    z-index 999
    color #ffffff
    padding 3px 15px
    font-size 15px
    border-radius 6px
    top 50%
    left 50%
    transform translate(-50%,-50%)
    min-width 80px
    line-height 20px
    background-color rgba(9,9,9,.6)
    flex-center()
</style>
