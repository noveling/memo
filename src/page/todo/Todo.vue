<template>
  <div class="todo">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont" @click="goBack"><span class="icon-back"></span></div>
      <div slot="center">Make a plan!</div>
    </nav-bar>
    <my-scroll class="myscroll" ref="myscroll">
      <event-list>
        <event-item v-for="item in todo" :key="item.time+item.date" :event="item" @itemState="renewScroll" @renew="renewEvent($event)" @remove="removeEvent($event)" @showDetail="showDetail($event)">
          <div class="tool-box" slot="tool">
            <div class=" iconfont complete" @click="completeEvent(item)"><span class="icon-complete"></span></div>
            <div class="iconfont cancel" @click="cancelEvent(item)"><span class="icon-cancel_dafalut"></span></div>
            <div class="iconfont delete" @click="removeEvent(item)"><span class="icon-delete"></span></div>
          </div>
        </event-item>
      </event-list>
    </my-scroll>
    <div class="mask" v-show="maskState"></div>
    <confirm-prompt class="prompt" v-if="promptState" :content="'是否'+promptInfo+'？'" confirm="确认" cancel="取消" @cancel="pcancel" @confirm="pconfirm(currentEvent.date,currentEvent.time)"></confirm-prompt>
    <empty-list v-show="todo.length == 0" txt="添加点内容吧..."></empty-list>
    <my-cue class="mycue" :showTime="false" v-if="todo.length < 3 && todo.length > 0"><img slot="img" src="~assets/img/catcue.png" alt="..."></my-cue>
    <detail v-if="detailInfo.state" :content="detailInfo.content" @close="closeDetail"></detail>
  </div>  
</template>

<script>
import MyScroll from "components/common/myscroll/MyScroll"
import NavBar from "components/common/navbar/NavBar"
import ConfirmPrompt from "components/content/animate/ConfirmPrompt"
import EventItem from "components/content/list/EventItem"
import EventList from "components/content/list/EventList"
import Detail from "components/content/blackboard/Detail"
import {mapGetters,mapActions} from "vuex"
import EmptyList from "components/content/list/EmptyList"
import MyCue from "components/content/animate/MyCue"
export default {
  components:{
    NavBar,
    MyScroll,
    EventItem,
    EventList,
    EmptyList,
    ConfirmPrompt,
    MyCue,
    Detail
  },
  data(){
    return {
      maskState:false,
      promptState:false,
      promptInfo:'',
      currentEvent:()=>{},
      detailInfo:{
        state:false,
        content:''
      }
    }
  },
  methods:{
    ...mapActions(['COMPLETE_BY_TIME','REMOVE_BY_TIME','CANCEL_BY_TIME']),
    goBack(){
      this.$router.goBack()
    },
    completeEvent(event){
      this.promptInfo = '完成'
      this.maskState = true
      this.promptState = true
      this.currentEvent = event
    },
    removeEvent(event){
      this.promptInfo = '删除'
      this.maskState = true
      this.promptState = true
      this.currentEvent = event
    },
    cancelEvent(event){
      this.promptInfo = '取消'
      this.maskState = true
      this.promptState = true
      this.currentEvent = event
    },
    showDetail(event){
      this.detailInfo.content = event.content
      this.detailInfo.state = !this.detailInfo.state
    },
    closeDetail(){
      this.detailInfo.state = !this.detailInfo.state
    },
    pcancel(){
      this.maskState = false
      this.promptState = false
    },
    pconfirm(date,time){
      switch(this.promptInfo){
        case '完成':{
          this.COMPLETE_BY_TIME({date,time})
          break
        }
        case '删除':{
          this.REMOVE_BY_TIME({date,time})
          break
        }
        case '取消':{
          this.CANCEL_BY_TIME({date,time})
          break
        }
        default:{
          console.log("...")
        }
      }
      this.promptState = false
      this.maskState = false
    },
    renewScroll(){
      this.$refs.myscroll.myRefresh()
    }
  },
  computed:{
    ...mapGetters(['todo'])
  }
}
</script>

<style lang="stylus" scoped>
  .mask
    position fixed 
    z-index 9
    top 0
    left 0
    right 0
    bottom 0
    background-color $mask
  .todo
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    z-index -1
    background-image $themebg1
    .myscroll
      margin-top 44px
      height calc(100vh - 44px)
      .tool-box
        display flex
        width 100%
        height 100%
        &>div
          flex 1
          flex-center()
    .nav-bar
      background-color $appColor
      color #ffffff
      font-size 17px
      box-shadow 2px 1px 3px rgba(0, 0, 0, 0.1)
      .iconfont
        font-size 20px
    .prompt
      position fixed
      font-size 16px
      top 50%
      left 50%
      margin-left -150px
      margin-top -50px
      z-index 11
      color #999
</style>
