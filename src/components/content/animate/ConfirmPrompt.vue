<template>
  <div class="prompt" ref="prompt">
    <div class="prompt-wrap">
      <div class="prompt-info">{{content}}</div>
      <div class="option-box">
        <div class="confirm" @click="toConfirm">{{confirm}}</div>
        <div class="cancel" @click="toCancel">{{cancel}}</div>
      </div>
    </div>
  </div>  
</template>

<script>
import anime from "animejs"
export default {
  props:{
    content:{
      default:"还没有内容!"
    },
    confirm:{
      default:"确认"
    },
    cancel:{
      default:"取消"
    }
  },
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.prompt,
          duration:200,
          scale:.8,
          opacity:.5,
          easing:'linear',
          direction:'reverse'
        })
      })
    },
    toConfirm(){
      this.$emit('confirm')
    },
    toCancel(){
      this.$emit('cancel')
    }
  },
  mounted(){
    this.run()
  }
}
</script>

<style lang="stylus" scoped>
  .prompt
    position relative
    width 300px
    height 100px
    background-color #75ef73bf
    border-radius 9px
    font-size 16px
    .prompt-wrap
      position absolute
      display flex
      flex-direction column
      background-color #ffffff
      border-radius 9px
      left 5px
      right 5px 
      top 5px
      bottom 5px
      .prompt-info
        flex-center()
        flex 1
      .option-box
        flex 1
        display flex
        border-top 1px solid rgba(204,204,204,0.212)
        .confirm
          flex 1
          border-right 1px solid rgba(204,204,204,0.212)
          flex-center()
        .cancel
          flex 1
          flex-center()
</style>
