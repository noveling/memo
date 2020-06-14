<template>
  <div class="list">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont" @click="goBack"><span class="icon-back"></span></div>
      <div slot="center">我要做点啥!</div>
    </nav-bar>
    <my-scroll class="myscroll" ref="myscroll">
      <div class="content-wrap">
        <div class="content" v-if="this.event.length>0">
          <div class="header">日常清单</div>
          <div class="list-item" v-for="(item,index) in event" :key="index" :class="{finished:item.state==2,todo:item.state==1,cancel:item.state==0}">
            <div class="txt">{{item.content}}</div>
            <div class="state">{{item.state|diaryState}}</div>
          </div>
        </div>
        <div v-else><empty-list :showImg="false"></empty-list></div>
      </div>
    </my-scroll>
    <my-cue class="mycue" :showTime="false" @click.native="goHome" v-show="event.length < 4"><img slot="img" src="~assets/img/catcue.png" alt="..."></my-cue>
  </div>  
</template>

<script>
import {mapState} from "vuex"
import NavBar from "components/common/navbar/NavBar"
import MyCue from "components/content/animate/MyCue"
import MyScroll from "components/common/myscroll/MyScroll"
import EmptyList from "components/content/list/EmptyList"
export default {
  components:{
    NavBar,
    MyCue,
    MyScroll,
    EmptyList
  },
  computed:{
    ...mapState(['event'])
  },
  methods:{
    goBack(){
      this.$router.goBack()
    },
    goHome(){
      this.$router.replace('/home')
    }
  },
  filters:{
    diaryState(val){
      let option = ['取消了','待完成','完成了']
      return option[val]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-image $themebg1
    font-size 15px
    z-index -1
    .myscroll
      margin-top 44px
      height calc(100vh - 44px)
    .nav-bar
      background-color $appColor
      color #ffffff
      box-shadow 2px 1px 3px rgba(0, 0, 0, 0.1)
      .iconfont
        font-size 20px
    .header
      height 50px
      flex-center()
      font-size 16px
      color #ccc
    .content-wrap
      padding 10px
    .content
      background-color #ffffff
      border-radius 12px
      .list-item
        display flex
        height 45px
        width 100%
        color $appColor
        border-top 1px solid #cccccc36
        .txt
          width 285px
          line-height 45px
          text-align center
          padding 0 5px
          border-right 1px solid #cccccc36
          text-ellipsis()
          letter-spacing 2px
        .state
          flex 1
          flex-center()
      .cancel
        color #aaa
        .txt
          text-decoration line-through
      .todo
        color #fbca0d
    .mycue
      z-index 9
</style>
