<template>
  <div class="cancel">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont" @click="goBack"><span class="icon-back"></span></div>
      <div slot="center">Cancel plan!</div>
    </nav-bar>
    <my-scroll class="myscroll" ref="myscroll">
      <event-list>
        <event-item v-for="item in cancel" :key="item.time+item.date" :event="item" @itemState="renewScroll" @renew="renewEvent($event)" @remove="removeEvent($event)"></event-item>
      </event-list>
    </my-scroll>
    <div class="mask" v-show="maskState"></div>
    <confirm-prompt class="prompt" v-if="promptState" :content="'是否'+promptInfo+'？'" confirm="确认" cancel="取消" @cancel="pcancel" @confirm="pconfirm(currentEvent.date,currentEvent.time)"></confirm-prompt>
    <empty-list v-show="cancel.length == 0" txt="就这样吧^-^"></empty-list>
    <my-cue class="mycue" :showTime="false" v-if="cancel.length < 4 && cancel.length > 0"><img slot="img" src="~assets/img/catcue.png" alt="..."></my-cue>
  </div>  
</template>

<script>
import MyScroll from "components/common/myscroll/MyScroll"
import NavBar from "components/common/navbar/NavBar"
import ConfirmPrompt from "components/content/animate/ConfirmPrompt"
import EventItem from "components/content/list/EventItem"
import EventList from "components/content/list/EventList"
import EmptyList from "components/content/list/EmptyList"
import MyCue from "components/content/animate/MyCue"
import {mapGetters,mapActions} from "vuex"
export default {
  components:{
    NavBar,
    MyScroll,
    EventItem,
    EventList,
    ConfirmPrompt,
    EmptyList,
    MyCue
  },
  data(){
    return {
      maskState:false,
      promptState:false,
      promptInfo:'',
      currentEvent:()=>{}
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
    },
    renewScroll(){
      this.$refs.myscroll.myRefresh()
    }
  },
  computed:{
    ...mapGetters(['cancel'])
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
  .cancel
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
