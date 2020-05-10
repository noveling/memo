<template>
  <div class="my-note" @click="toEdit">
    <div class="bg-wrap"><img src="~assets/img/note.png" alt="..."></div>
    <div class="txt" ref="txt">编辑</div>
  </div>  
</template>

<script>
import anime from "animejs"
export default {
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.txt,
          scale:.9,
          loop:true,
          duration:500,
          direction: 'alternate',
          easing:'linear'
        })
      })
    },
    toEdit(){
      this.$router.push('/edit')
    }
  },
  mounted(){
    this.run()
  }
}
</script>

<style lang="stylus" scoped>
  img
    max-width 100%
  .my-note
    position fixed 
    width 140px
    height 140px
    top 44px
    right 10px
    .txt
      position relative
      color #6aa281a6
      font-weight 520
      font-size 20px
      top -110px
      left 46px
      width 100px
      height 40px
      border-radius 15px
      background-color #ffffff
      opacity 0.8
      flex-center()
    .txt:after
      content ''
      position absolute
      top 120%
      left -14px
      width 44px
      height 25px
      border-width 0
      border-style solid
      border-color transparent
      margin-top -13px
      border-right-width 22px
      border-right-color currentColor
      border-radius 0 0 88px 0
      color #ffffff
</style>
