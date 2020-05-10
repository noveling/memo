<template>
  <div class="my-cue">
    <div ref="mycue" class="img-wrap toggle-state"><slot name="img">使用图片</slot></div>
    <div ref="myclock" class="clock" v-if="showTime"><my-clock ref="mytime"></my-clock></div>
  </div>
</template>

<script>
import MyClock from "components/common/myclock/MyClock"
import anime from "animejs"
export default {
  props:{
    showTime:{
      default:true
    }
  },
  components:{
    MyClock
  },
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.myclock,
          duration:1500,
          scale:.2,
          opacity:.5,
          easing:'linear',
          direction:'reverse'
        })
      })
    },
    mycue(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.mycue,
          delay:1000,
          easing:'easeInQuad',
          direction:'reverse',
          translateY:250,
          opacity:.5,
          duration:1300,
          complete:()=>{
            anime({
              targets:this.$refs.mycue,
              delay:100,
              loop:true,
              duration:500,
              direction: 'alternate',
              translateY:15,
              easing:'linear'
            })
          }
        })
      })
    }
  },
  mounted(){
    this.mycue()
    this.run()
  }
}
</script>

<style lang="stylus" scoped>
  img
    max-width 100%
  .my-cue
    position fixed
    bottom 0
    left 0
    right 0
    height 350px
    overflow hidden
    font-size 0
    .img-wrap
      position absolute
      bottom 0
      width 240px
      left 50%
      margin-left -120px
    .toggle-state
      bottom -20px
</style>
