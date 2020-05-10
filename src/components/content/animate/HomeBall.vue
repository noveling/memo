<template>
  <div class="ball" ref="ball"><div class="count" v-show="count!=0">{{count}}</div>{{txt}}</div>  
</template>

<script>
import anime from "animejs"
export default {
  data(){
    return {
      timer:null
    }
  },
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.ball,
          opacity:.1,
          duration:300,
          scale:.8,
          easing:'linear',
          direction:'reverse',
          translateX:this.drift.x,
          translateY:this.drift.y,
          complete:()=>{resolve("success")}
        })
      })
    },
    fade(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.ball,
          opacity:.1,
          scale:.8,
          duration:300,
          easing:'linear',
          translateX:this.drift.x,
          translateY:this.drift.y,
          complete:()=>{resolve("success")}
        })
      })
    },
    stop(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.ball,
          scale:1,
          translateX:0,
          translateY:0,
          opacity:1,
          duration:0,
          complete:()=>{resolve("success")}
        })
      })
    }
  },
  props:{
    txt:{
      default:"o(>﹏<)o"
    },
    count:{
      default:0
    },
    drift:{
      default(){
        return {
          x:500,
          y:500
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ball
    position relative
    width 100px
    height 100px
    border-radius 50%
    flex-center()
    .count
      position absolute
      top 0
      left 0
      background-color #ffffff
      color $appColor
      font-size 15px
      padding 1px 9px
      border-radius 8px
      box-shadow 3px 3px 3px rgba(9,9,9,.1)
</style>
