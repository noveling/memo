<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont" @click="toggleSlideBar"><span class="icon-cat1"></span></div>
      <div slot="center">Fancy Memo!</div>
    </nav-bar>
    <div class="content">
      <daily-list class="daily-list"></daily-list>
    </div>
    <left-slide-bar class="slide-bar" v-show="slidebarState">
      <div class="content">
        <div class="edit-data"><span @click="goToEdit">编辑数据</span></div>
        <div class="clear-data"><span @click="confirmCancel">清除数据</span></div>
        <div class="load-data"><span @click="loadData">导入数据</span></div>
        <div class="dowmload-data"><span @click="downloadData('notepad.txt',getData)">下载数据</span></div>
      </div>
    </left-slide-bar>
    <my-cat></my-cat>
    <my-bubble :info="'待处理:' + todo.length + ' 已完成:' + complete.length + ' 已取消:' + cancel.length" v-if="event.length > 0"></my-bubble>
    <my-note></my-note>
    <confirm-prompt class="prompt" content='是否清除所有内容?' v-if="promptState" @confirm="confirmDelete" @cancel="toCancel"></confirm-prompt>
    <div class="mask" v-show="slidebarState" @click="toggleSlideBar"></div>
    <div class="prompt-mask" v-show="tipState"></div>
    <div class="prompt-mask" v-show="promptState"></div>
    <load-tip class="load-tip" v-show="tipState" @cancel="cancelLoad" @success="imported"></load-tip>
    <toast toastMsg="修改成功!"  v-if="toastState" class="toast"></toast>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import DailyList from "./childComps/DailyList"
import MyCat from "components/content/animate/MyCat"
import MyBubble from "components/content/bubble/MyBubble"
import ConfirmPrompt from "components/content/animate/ConfirmPrompt"
import MyNote from "components/content/animate/MyNote"
import LeftSlideBar from "components/content/slidebar/LeftSlideBar"
import LoadTip from "components/content/dialog/LoadTip"
import {mapState,mapMutations,mapGetters} from "vuex"
import Toast from "components/content/animate/Toast"
export default {
  components:{
    NavBar,
    DailyList,
    MyCat,
    MyBubble,
    MyNote,
    LeftSlideBar,
    ConfirmPrompt,
    LoadTip,
    Toast
  },
  data(){
    return {
      slidebarState:false,
      promptState:false,
      tipState:false,
      toastState:false,
      timer:null
    }
  },
  computed:{
    ...mapState(['event']),
    ...mapGetters(['todo','complete','cancel']),
    getData(){
      return JSON.stringify(this.event)
    }
  },
  methods:{
    ...mapMutations(['CLEAR_ALL']),
    toggleSlideBar(){
      this.slidebarState = !this.slidebarState
    },
    goToEdit(){
      this.$router.push('/edit')
    },
    confirmCancel(){
      this.promptState = true
    },
    confirmDelete(){
      this.CLEAR_ALL()
      this.promptState = false
    },
    toCancel(){
      this.promptState = false
    },
    downloadData(fileName, content){
        let aTag = document.createElement('a');
        let blob = new Blob([content]);
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
        aTag.remove()
    },
    loadData($event){
      this.tipState = true
    },
    imported(){
      this.tipState = false
      if(this.timer != null){
        clearTimeout(this.timer)
      }
      this.toastState = true
      this.timer = setTimeout(()=>{
        this.toastState = false
      },1500)
    },
    cancelLoad(){
      this.tipState = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    background-image $themebg1
    .nav-bar
      background-color $appColor
      color #ffffff
      font-size 16px
      box-shadow 2px 1px 3px rgba(0, 0, 0, 0.1)
      .iconfont
        font-size 30px
    .content
      width 100%
      height 100%
      .daily-list
        position relative
        top 50%
        left 50%
        transform translate(-50%,-50%)
    .slide-bar
      position fixed
      top 44px
      bottom 0px
      background-image url('~@/assets/img/nightstar.png'),linear-gradient(180deg,#80d2bc,#87d2e5 36%,#93d6e7 77%,#eff9fd)
      background-repeat no-repeat
      background-size 100% auto
      z-index 8
      width 230px
      box-shadow 0 -2px 10px rgba(0, 0, 0, 0.1)
      .content
        height calc(100vh - 44px)
        display flex
        flex-direction column
        justify-content space-around
        &>div
          flex 1
          flex-center()
          color #ffffff
          &>span
            padding 20px 40px
            background-color #b8e4f0
            opacity .6
            border-radius 8px
            letter-spacing 3px
    .mask
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      opacity 0
      z-index 7
    .prompt
      position fixed
      font-size 16px
      top 50%
      left 50%
      margin-left -150px
      margin-top -50px
      z-index 11
      color #999
    .load-tip
      position fixed
      font-size 16px
      top 50%
      left 50%
      margin-left -150px
      margin-top -150px
      z-index 11
      color #999
    .prompt-mask
      position fixed
      background-color $mask
      top 0
      left 0
      right 0
      bottom 0
      z-index 10
</style>
