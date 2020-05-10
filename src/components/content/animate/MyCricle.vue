<template>
  <div class="my-cricle" ref="mycricle">
    <div class="content">{{txt}}</div>
  </div>  
</template>

<script>
import anime from "animejs"
export default {
  props:{
    txt:{
      default:"样板"
    }
  },
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.mycricle,
          opacity:.1,
          scale:.3,
          delay:500,
          duration:700,
          easing:'linear',
          direction:'reverse',
          complete:()=>{
            anime({
              targets:this.$refs.mycricle,
              scale:.9,
              loop:true,
              duration:500,
              direction: 'alternate',
              opacity:.8,
              easing:'linear'
            })
          }
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
  .my-cricle
    width 70px
    height 70px
    overflow hidden
    border-radius 50%
    .content
      background-image radial-gradient($appColor,#75ef7382)
      width 100%
      height 100%
      color #ffffff
      font-size 16px
      flex-center()
</style>
