<template>
  <div class="daily-list">
    <transition name="animate"><div class="iconfont menu-top" @click="topClick" v-if="topState"><span class="icon-cat"></span></div></transition>
    <div class="list" v-show="!topState">
      <home-ball class="ball todo" ref="ball1" :drift="{x:90,y:100}" txt="未完成" :count="todoCount" @click.native="leaveForTodo"></home-ball>
      <home-ball class="ball complete" ref="ball2" :drift="{x:-90,y:100}" txt="已完成" :count="completeCount" @click.native="leaveForComplete"></home-ball>
      <home-ball class="ball delete" ref="ball3" :drift="{x:0,y:-90}" txt="取消了" :count="cancelCount" @click.native="leaveForCancel"></home-ball>
    </div>
  </div>  
</template>

<script>
import HomeBall from "components/content/animate/HomeBall"
import {mapState,mapGetters} from "vuex"
export default {
  components:{
    HomeBall
  },
  data(){
    return {
      topState:true,
      hoverflag:false,
      timer:null
    }
  },
  computed:{
    ...mapState(['event']),
    ...mapGetters(['todoCount','completeCount','cancelCount'])
  },
  methods:{
    changeTopState(){
      this.topState = !this.topState
    },
    topClick(){
      this.$refs.ball1.stop().then(()=>{this.$refs.ball1.run()})
      this.$refs.ball2.stop().then(()=>{this.$refs.ball2.run()})
      this.$refs.ball3.stop().then(()=>{this.$refs.ball3.run()}).then(()=>{
        this.topState=false
      })
    },
    leaveForTodo(){
      this.$router.push('/todo')
    },
    leaveForComplete(){
      this.$router.push('/complete')
    },
    leaveForCancel(){
      this.$router.push('/cancel')
    }
  },
  mounted(){
    // 防抖
    this.$bus.$on("catClick",()=>{
      if(this.timer != null){
        clearTimeout(this.timer)
      }
      if(this.topState){
        this.timer = setTimeout(()=>{
          this.changeTopState()
          this.$refs.ball1.stop().then(()=>{this.$refs.ball1.run()})
          this.$refs.ball2.stop().then(()=>{this.$refs.ball2.run()})
          this.$refs.ball3.stop().then(()=>{this.$refs.ball3.run()})
        },300)
      }
      else{
        this.timer = setTimeout(()=>{
          this.$refs.ball1.fade()
          this.$refs.ball2.fade()
          this.$refs.ball3.fade().then(()=>{this.changeTopState()})
        },300)
      }
    })
  },
  beforeDestroy(){
    this.$bus.$off("catClick")
  }
}
</script>

<style lang="stylus" scoped>
  .daily-list
    width 350px
    height 350px
    .list 
      position relative
      width 100%
      height 100%
      .ball
        position absolute
        background-image linear-gradient(to bottom,#42ef7d,#f5efef)
        box-shadow 0 0 10px #f1f1f1
        color #ffffff
        font-size 18px
        font-weight 520
    .todo
      top 35px
      left 20px
    .complete
      top 35px
      left 230px
    .delete
      bottom 25px
      left 125px
    .menu-top       
      position absolute
      width 120px
      height 120px
      border-radius 50%
      background-image linear-gradient(to bottom,#e3eeff,#f4efef)
      top 43%
      left 50%
      transform translate(-50%,-50%)
      box-shadow 0 0 10px #f1f1f1
      flex-center()
      font-size 70px
      color #cbdacf 
  .animate-enter-active
    animation bounce .1s
  @keyframes bounce {
    0%{
      opacity 0
    }
    100%{
      opacity .9
    }
  }
</style>
