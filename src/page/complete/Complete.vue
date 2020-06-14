<template>
  <div class="complete">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont" @click="goBack"><span class="icon-back"></span></div>
      <div slot="center">Schedule complete!</div>
    </nav-bar>
    <my-scroll class="myscroll" ref="myscroll">
      <event-list>
        <event-item v-for="item in complete" :key="item.time" :event="item" @renew="renewEvent($event)" @remove="removeEvent($event)" @showDetail="showDetail($event)"></event-item>
      </event-list>
    </my-scroll>
    <div class="mask" v-show="maskState"></div>
    <confirm-prompt class="prompt" v-if="promptState" :content="'是否'+promptInfo+'？'" confirm="确认" cancel="取消" @cancel="pcancel" @confirm="pconfirm(currentEvent.date,currentEvent.time)"></confirm-prompt>
    <empty-list v-show="complete.length == 0" txt="下次一定好好来！"></empty-list>
    <my-cue class="mycue" :showTime="false" v-if="complete.length < 4 && complete.length > 0"><img slot="img" src="~assets/img/catcue.png" alt="..."></my-cue>
    <detail v-if="detailInfo.state" :content="detailInfo.content" @close="closeDetail"></detail>
  </div>  
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import MyScroll from "components/common/myscroll/MyScroll"
import ConfirmPrompt from "components/content/animate/ConfirmPrompt"
import EventItem from "components/content/list/EventItem"
import EventList from "components/content/list/EventList"
import EmptyList from "components/content/list/EmptyList"
import Detail from "components/content/blackboard/Detail"
import MyCue from "components/content/animate/MyCue"
import {mapGetters,mapActions} from "vuex"
export default {
  components:{
    NavBar,
    ConfirmPrompt,
    EmptyList,
    EventItem,
    EventList,
    MyScroll,
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
    ...mapActions(['RENEW_BY_TIME','REMOVE_BY_TIME']),
    goBack(){
      this.$router.goBack()
    },
    renewEvent(event){
      this.promptInfo = '恢复'
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
        case '恢复':{
          this.RENEW_BY_TIME({date,time})
          break
        }
        case '删除':{
          this.REMOVE_BY_TIME({date,time})
        }
        default:{
          console.log("...")
        }
      }
      this.promptState = false
      this.maskState = false
    }
  },
  computed:{
    ...mapGetters(['complete'])
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
  .complete
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
