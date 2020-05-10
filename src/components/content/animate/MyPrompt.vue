<template>
  <div class="my-prompt" ref="myprompt">
    <div class="prompt-desc">
      <div class="content-wrap">{{content|checkContent}}</div>
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
      default:"我要提交"
    },
    cancel:{
      default:"取消..."
    }
  },
  filters:{
    checkContent(val){
      if(val.match(/^[ ]*$/)){
        return "还没有内容哦(⊙o⊙)"
      }else{
        return val
      }
    }
  },
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.myprompt,
          duration:200,
          scale:.9,
          opacity:.5,
          easing:'linear',
          direction:'reverse'
        })
      }
      )
    },
    toConfirm(){
      this.$emit("confirm")
    },
    toCancel(){
      this.$emit("cancel")
    }
  },
  mounted(){
    this.run()
  }
}
</script>

<style lang="stylus" scoped>
  .my-prompt
    width 300px
    min-height 300px
    position relative
    background-color #75ef73bf
    border-radius 20px
    overflow hidden
    color $appColor
    letter-spacing 2px
    font-size 15px
    .prompt-desc
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      padding-top 10px
      display flex
      flex-direction column
      align-items center
      .content-wrap
        width 280px
        padding 4px
        word-break break-all
        border-radius 20px
        flex 1
        flex-center()
        background-color #ffffff
        white-space pre-wrap
      .option-box
        font-size 17px
        margin-top 10px
        margin-bottom 10px
        border-radius 20px
        background-color #ffffff
        height 66px
        width 280px
        display flex
        justify-content space-around
        .confirm
          width 50%
          border-right 1px solid #75ef73bf
          flex-center()
        .cancel
          width 50%
          border-left 1px solid #75ef73bf
          flex-center()
</style>
