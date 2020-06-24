<template>
  <div class="edit">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont" @click="goBack"><span class="icon-back"></span></div>
      <div slot="center">嗯,添加点内容吧!</div>
    </nav-bar>
    <div class="input-wrap">
      <div class="bg-wrap"><input id="edit" ref="editInput" type="text" placeholder="输入内容"></div>
      <div class="bg-desc"><label for="edit">日程</label></div>
    </div>
    <my-cricle class="my-cricle" txt="提交" @click.native="submitEvent" v-show="!showPrompt"></my-cricle>
    <my-cue class="my-cue" ref="myclock" @click.native="toList"><img src="~assets/img/cute.png" alt="..." slot="img"></my-cue>
    <div class="prompt" v-if="showPrompt"><my-prompt @cancel="cancelSubmit" @confirm="confirmSubmit" :content="submitContent"></my-prompt></div>
    <toast :toastMsg="toastData" v-if="toastState" class="toast"></toast>
    <div class="mask" v-if="showPrompt"></div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Toast from "components/content/animate/Toast"
import MyCue from "components/content/animate/MyCue"
import MyCricle from "components/content/animate/MyCricle"
import MyPrompt from "components/content/animate/MyPrompt"
import {mapMutations} from "vuex"
export default {
  data(){
    return {
      showPrompt:false,
      submitContent:'',
      toastData:'emmm',
      toastState:false,
      timer:null
    }
  },
  components:{
    NavBar,
    MyCue,
    MyCricle,
    MyPrompt,
    Toast
  },
  methods:{
    ...mapMutations(['ADD_INTO_EVENT']),
    goBack(){
      this.$router.goBack()
    },
    toList(){
      this.$router.push('/list')
    },
    submitEvent(){
      this.submitContent = this.$refs.editInput.value
      this.$refs.editInput.value = ""
      this.showPrompt = !this.showPrompt
    },
    cancelSubmit(){
      this.showPrompt = false
    },
    confirmSubmit(){
      if(this.timer != null){
        clearTimeout(this.timer)
      } 
      if(this.submitContent.match(/^[ ]*$/)){
        this.toastData = "还没输入内容..."
        this.toastState = true
      }else{
        this.toastData = "成功!"
        this.toastState = true
        let event = {
          time:this.$refs.myclock.$refs.mytime.time,
          date:this.$refs.myclock.$refs.mytime.date,
          content:this.submitContent,
          state:1
        }
        this.ADD_INTO_EVENT(event)
      }
      this.timer = setTimeout(()=>{
        this.toastState = false
      },1500)
      this.showPrompt = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .edit
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-image $themebg1
    .nav-bar
      background-color $appColor
      color #ffffff
      font-size 17px
      box-shadow 2px 1px 3px rgba(0, 0, 0, 0.1)
      .iconfont
        font-size 20px
    .input-wrap
      position relative
      margin 90px auto 0
      width 350px
      height 50px
      border-radius 8px
      overflow hidden
      .bg-desc
        position absolute
        flex-center()
        width 86px
        font-size 18px
        height 100%
        background-color #347f6b
        color #ffffff
      .bg-wrap
        position absolute
        flex-center()
        top 0
        left 0
        width 100%
        height 100%
        background-color #ffffff
        padding-left 95px
        padding-right 5px
        input 
          font-size 16px
          width 100%
          border 0
          line-height 30px
          outline none
          color #666
    .my-cricle
      margin 30px auto 0
    .prompt
      position fixed 
      top 80px
      left 50%
      margin-left -150px
      z-index 99
    .my-cue
      @media screen and (max-height 550px)
        display none
    .mask
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      z-index 98
      background-color $mask
</style>
